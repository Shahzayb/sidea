import {
  User,
  TagCreateWithoutIdeaInput,
  IdeaCreateInput,
  IdeaUpdateArgs,
  FeatureUpdateArgs,
} from '@prisma/client';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import jwt from 'jsonwebtoken';

import {
  createJwtToken,
  createTokenForResetPassword,
  JWTTokenPayload,
} from '../../../utils/jwt';
import { MutationResolvers } from '../types';
import { sendForgotPasswordEmail } from '../../../utils/email';
import * as search from '../../../utils/search';

export const Mutation: MutationResolvers = {
  async login(_, { input: { username, password } }, { prisma }) {
    username = username.trim();
    // a username cannot be an email address
    let user: User | null = null;
    if (validator.isEmail(username)) {
      user = await prisma.user.findOne({
        where: {
          email: validator.normalizeEmail(username) as string,
        },
      });
    } else {
      user = await prisma.user.findOne({
        where: {
          username: username,
        },
      });
    }
    if (!user) {
      throw new AuthenticationError('invalid username or password');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new AuthenticationError('invalid username or password');
    }

    const token = createJwtToken({ id: user.id });

    return {
      token,
      user,
    };
  },
  async signup(_, { input }, { prisma }) {
    const errors: { param: keyof typeof input; msg: string }[] = [];
    // trim all input
    input.email = input.email.trim();
    input.name = input.name.trim();
    input.username = input.username.trim();

    // check if name is valid
    if (!input.name) {
      errors.push({
        param: 'name',
        msg: 'name is required',
      });
    }

    // check if password is valid
    if (!input.password) {
      errors.push({
        param: 'password',
        msg: 'password is required',
      });
    } else if (input.password.length < 8) {
      errors.push({
        param: 'password',
        msg: 'password is too short. should be at least 8 character',
      });
    } else {
      // hash the password
      input.password = await bcrypt.hash(input.password, 8);
    }

    // check if email is valid
    if (!input.email) {
      errors.push({
        param: 'email',
        msg: 'email is required',
      });
    } else if (!validator.isEmail(input.email)) {
      errors.push({
        param: 'email',
        msg: 'email is invalid',
      });
    } else {
      // normalize email & check if this email is unique
      input.email = validator.normalizeEmail(input.email) as string;
      const count = await prisma.user.count({
        where: {
          email: input.email,
        },
      });
      if (count !== 0) {
        errors.push({
          param: 'email',
          msg: 'email is already taken',
        });
      }
    }

    // check if username is valid
    if (!input.username) {
      errors.push({
        param: 'username',
        msg: 'username is required',
      });
    }
    // check if username is not email
    else if (validator.isEmail(input.username)) {
      errors.push({
        param: 'username',
        msg: 'username cannot be an email address',
      });
    }
    // check if username does not contains any spaces ^[0-9a-zA-Z]*$
    else if (!validator.isAlphanumeric(input.username)) {
      errors.push({
        param: 'username',
        msg: 'username can only be alpha numeric',
      });
    }
    // check if username is unique
    else {
      const count = await prisma.user.count({
        where: {
          username: input.username,
        },
      });
      if (count !== 0) {
        errors.push({
          param: 'username',
          msg: 'username is already taken',
        });
      }
    }

    // check input length
    if (
      !validator.isLength(input.email, {
        max: 255,
      })
    ) {
      errors.push({
        param: 'email',
        msg: 'email is too long. max character limit is 255',
      });
    }
    if (
      !validator.isLength(input.name, {
        max: 255,
      })
    ) {
      errors.push({
        param: 'name',
        msg: 'name is too long. max character limit is 255',
      });
    }
    if (
      !validator.isLength(input.username, {
        max: 255,
      })
    ) {
      errors.push({
        param: 'username',
        msg: 'username is too long. max character limit is 255',
      });
    }

    if (errors.length !== 0) {
      throw new UserInputError('input is invalid', { errors });
    }

    // generate avatar
    const avatar = gravatar.url(input.email);
    // create user & setting
    const setting = await prisma.setting.create({
      data: {
        User: {
          create: {
            ...input,
            avatar,
          },
        },
      },
      include: {
        User: true,
      },
    });

    const user = setting.User;

    try {
      await search.addUser(user);
    } catch {}

    // create jwt token
    const token = createJwtToken({ id: user.id });

    return {
      token,
      user,
    };
  },
  async createIdea(_, { input }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: keyof typeof input; msg: string }[] = [];
    // validate title
    input.title = input.title.trim();
    if (!input.title) {
      errors.push({
        param: 'title',
        msg: 'title is required',
      });
    } else if (
      !validator.isLength(input.title, {
        max: 300,
      })
    ) {
      errors.push({
        param: 'title',
        msg: 'title is too long. max character limit is 300',
      });
    }
    // validate body
    input.body = input.body.trim();
    if (!input.body) {
      errors.push({
        param: 'body',
        msg: 'body is required',
      });
    } else if (
      !validator.isLength(input.body, {
        max: 40_000,
      })
    ) {
      errors.push({
        param: 'body',
        msg: 'body is too long. max character limit is 40,000',
      });
    }
    // validate & transform tags
    const tags: TagCreateWithoutIdeaInput[] = [];
    if (input.tags) {
      if (input.tags.length > 30) {
        errors.push({
          param: 'tags',
          msg: 'too much tags. tags cannot be more than 30.',
        });
      } else {
        for (let i = 0; i < input.tags.length; i++) {
          const curTag = input.tags[i].trim();
          const tagsExp = RegExp('^[0-9a-zA-Z-_.]+$');

          if (!curTag) {
            errors.push({
              param: 'tags',
              msg: 'tags cannot be empty',
            });
            break;
          } else if (!tagsExp.test(curTag)) {
            errors.push({
              param: 'tags',
              msg:
                'tags can only contains "letters", "numbers", ".", "-", and "_"',
            });
            break;
          } else if (
            !validator.isLength(curTag, {
              max: 30,
            })
          ) {
            errors.push({
              param: 'tags',
              msg: `tag "${curTag}" is too long. max character limit is 30.`,
            });
            break;
          } else {
            input.tags[i] = curTag;
            tags.push({
              value: curTag,
            });
          }
        }
      }
    }
    // validate features
    if (input.features) {
      for (let i = 0; i < input.features.length; i++) {
        const curFeature = input.features[i];
        curFeature.title = curFeature.title.trim();

        // validate feature title
        if (!curFeature.title) {
          errors.push({
            param: 'features',
            msg: 'title of feature is required',
          });
          break;
        } else if (
          !validator.isLength(curFeature.title, {
            max: 300,
          })
        ) {
          errors.push({
            param: 'features',
            msg: 'title of feature is too long. max character limit is 300',
          });
          break;
        }
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid input', {
        errors,
      });
    }

    const data: IdeaCreateInput = {
      User: {
        connect: {
          id: user.id,
        },
      },
      title: input.title,
      body: input.body,
      Tag: {
        create: tags,
      },
    };
    if (input.features) {
      const features = input.features.map((feature) => {
        return {
          title: feature.title,
          User: {
            connect: {
              id: user.id,
            },
          },
        };
      });
      data.Feature = {
        create: features,
      };
    }

    const idea = await prisma.idea.create({
      data,
    });

    try {
      await search.addIdea({ ...idea, tags: input.tags || [] });
    } catch (e) {
      console.log('addIdea error', e);
    }

    return idea;
  },
  async createFeature(_, { input }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: keyof typeof input; msg: string }[] = [];

    input.title = input.title.trim();

    input.ideaId = input.ideaId.trim();
    const ideaId = validator.toInt(input.ideaId);

    // check if ideaId is valid
    if (
      !validator.isInt(input.ideaId.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'ideaId',
        msg: 'ideaId is invalid.',
      });
    } else {
      const ideaId = validator.toInt(input.ideaId);

      const ideaCount = await prisma.idea.count({
        where: {
          id: ideaId,
        },
      });

      if (!ideaCount) {
        errors.push({
          param: 'ideaId',
          msg: 'idea does not exist.',
        });
      }
    }

    // validate feature title
    if (!input.title) {
      errors.push({
        param: 'title',
        msg: 'title of feature is required',
      });
    } else if (
      !validator.isLength(input.title, {
        max: 300,
      })
    ) {
      errors.push({
        param: 'title',
        msg: 'title of feature is too long. max character limit is 300',
      });
    }

    if (errors.length) {
      throw new UserInputError('invalid input', {
        errors,
      });
    }

    const feature = await prisma.feature.create({
      data: {
        Idea: {
          connect: {
            id: ideaId,
          },
        },
        title: input.title,
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return feature;
  },
  async updateIdea(_, { input }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: keyof typeof input; msg: string }[] = [];

    // validate id
    input.id = input.id.trim();
    if (
      !validator.isInt(input.id, {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'id',
        msg: 'idea id is invalid',
      });
    } else {
      const ideaId = validator.toInt(input.id);

      const idea = await prisma.idea.findOne({
        where: {
          id: ideaId,
        },
      });

      if (!idea) {
        errors.push({
          param: 'id',
          msg: 'idea does not exists.',
        });
      } else if (idea.userId !== user.id) {
        errors.push({
          param: 'id',
          msg: 'cannot update this idea.',
        });
      }
    }

    // validate title
    input.title = input.title?.trim();

    if (
      !validator.isLength(input.title || '', {
        max: 300,
      })
    ) {
      errors.push({
        param: 'title',
        msg: 'title is too long. max character limit is 300',
      });
    }
    // validate body
    input.body = input.body?.trim();

    if (
      !validator.isLength(input.body || '', {
        max: 40_000,
      })
    ) {
      errors.push({
        param: 'body',
        msg: 'body is too long. max character limit is 40,000',
      });
    }
    // validate & transform tags
    const tags: TagCreateWithoutIdeaInput[] = [];
    if (input.tags) {
      if (input.tags.length > 30) {
        errors.push({
          param: 'tags',
          msg: 'too much tags. tags cannot be more than 30.',
        });
      } else {
        for (let i = 0; i < input.tags.length; i++) {
          const curTag = input.tags[i].trim();
          const tagsExp = RegExp('^[0-9a-zA-Z-_.]+$');

          if (!curTag) {
            errors.push({
              param: 'tags',
              msg: 'tags cannot be empty',
            });
            break;
          } else if (!tagsExp.test(curTag)) {
            errors.push({
              param: 'tags',
              msg:
                'tags can only contains "letters", "numbers", ".", "-", and "_"',
            });
            break;
          } else if (
            !validator.isLength(curTag, {
              max: 30,
            })
          ) {
            errors.push({
              param: 'tags',
              msg: `tag "${curTag}" is too long. max character limit is 30.`,
            });
            break;
          } else {
            input.tags[i] = curTag;
            tags.push({
              value: curTag,
            });
          }
        }
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid input', {
        errors,
      });
    }

    if (input.tags) {
      await prisma.tag.deleteMany({
        where: {
          ideaId: validator.toInt(input.id),
        },
      });
    }

    const update: IdeaUpdateArgs = {
      where: {
        id: validator.toInt(input.id),
      },
      data: {},
    };

    if (input.title) {
      update.data.title = input.title;
    }
    if (input.body) {
      update.data.body = input.body;
    }
    if (input.tags) {
      update.data.Tag = {
        create: tags,
      };
    }

    const idea = await prisma.idea.update(update);

    try {
      await search.updateIdea({
        id: idea.id,
        title: input.title,
        body: input.body,
        tags: input.tags ?? undefined,
      });
    } catch {}

    return idea;
  },
  async updateFeature(_, { input }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: keyof typeof input; msg: string }[] = [];

    // validate id
    input.id = input.id.trim();
    if (
      !validator.isInt(input.id, {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'id',
        msg: 'feature id is invalid',
      });
    } else {
      const featureId = validator.toInt(input.id);

      const feature = await prisma.feature.findOne({
        where: {
          id: featureId,
        },
        select: {
          userId: true,
        },
      });

      if (!feature) {
        errors.push({
          param: 'id',
          msg: 'feature does not exists.',
        });
      } else if (feature.userId !== user.id) {
        errors.push({
          param: 'id',
          msg: 'cannot update this feature.',
        });
      }
    }

    // validate title
    input.title = input.title.trim();
    if (!input.title) {
      errors.push({
        param: 'title',
        msg: 'title of feature is required',
      });
    } else if (
      !validator.isLength(input.title, {
        max: 300,
      })
    ) {
      errors.push({
        param: 'title',
        msg: 'title is too long. max character limit is 300',
      });
    }

    if (errors.length) {
      throw new UserInputError('invalid input', {
        errors,
      });
    }

    const update: FeatureUpdateArgs = {
      where: {
        id: validator.toInt(input.id),
      },
      data: {
        title: input.title,
      },
    };

    const feature = await prisma.feature.update(update);

    return feature;
  },
  async deleteFeature(_, { id }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: 'id'; msg: string }[] = [];

    // validate id
    if (
      !validator.isInt(id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'id',
        msg: 'id is invalid',
      });
    } else {
      const featureId = validator.toInt(id);
      const feature = await prisma.feature.findOne({
        where: {
          id: featureId,
        },
        select: {
          userId: true,
        },
      });
      if (!feature) {
        errors.push({
          param: 'id',
          msg: 'feature does not exists.',
        });
      } else if (feature.userId !== user.id) {
        errors.push({
          param: 'id',
          msg: 'you are not authorized to delete the feature.',
        });
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const feature = await prisma.feature.delete({
      where: {
        id: validator.toInt(id),
      },
    });

    return feature;
  },
  async deleteIdea(_, { id }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: 'id'; msg: string }[] = [];

    // validate id
    if (
      !validator.isInt(id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'id',
        msg: 'id is invalid',
      });
    } else {
      const ideaId = validator.toInt(id);
      const idea = await prisma.idea.findOne({
        where: {
          id: ideaId,
        },
        select: {
          userId: true,
        },
      });
      if (!idea) {
        errors.push({
          param: 'id',
          msg: 'idea does not exists.',
        });
      } else if (idea.userId !== user.id) {
        errors.push({
          param: 'id',
          msg: 'you are not authorized to delete this idea.',
        });
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const idea = await prisma.idea.findOne({
      where: {
        id: validator.toInt(id),
      },
    });

    await prisma.executeRaw`DELETE FROM Idea where id = ${validator.toInt(id)}`;

    try {
      await search.deleteIdea(id);
    } catch {}

    return idea!;
  },
  async saveIdea(_, { idea_id }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: 'idea_id'; msg: string }[] = [];

    // validate id
    if (
      !validator.isInt(idea_id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'idea_id',
        msg: 'idea_id is invalid',
      });
    } else {
      const ideaId = validator.toInt(idea_id);
      const ideaCount = await prisma.idea.count({
        where: {
          id: ideaId,
        },
      });
      if (!ideaCount) {
        errors.push({
          param: 'idea_id',
          msg: 'idea does not exists.',
        });
      } else {
        // check if idea is already saved
        const saveCount = await prisma.save.count({
          where: {
            ideaId,
            userId: user.id,
          },
        });

        if (saveCount > 0) {
          errors.push({
            param: 'idea_id',
            msg: `idea:${ideaId} is already saved by user:${user.id}.`,
          });
        }
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const save = await prisma.save.create({
      data: {
        Idea: {
          connect: {
            id: validator.toInt(idea_id),
          },
        },
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return save;
  },
  async unsaveIdea(_, { idea_id }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: 'idea_id'; msg: string }[] = [];

    // validate id
    if (
      !validator.isInt(idea_id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'idea_id',
        msg: 'idea_id is invalid',
      });
    } else {
      const ideaId = validator.toInt(idea_id);
      const save = await prisma.save.count({
        where: {
          ideaId,
          userId: user.id,
        },
      });
      if (!save) {
        errors.push({
          param: 'idea_id',
          msg: `user:${user.id} did not saved idea:${ideaId}.`,
        });
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const save = await prisma.save.delete({
      where: {
        ideaId: validator.toInt(idea_id),
        userId: user.id,
      },
    });

    return save;
  },
  async likeIdea(_, { idea_id }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: 'idea_id'; msg: string }[] = [];

    // validate id
    if (
      !validator.isInt(idea_id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'idea_id',
        msg: 'idea_id is invalid',
      });
    } else {
      const ideaId = validator.toInt(idea_id);
      const ideaCount = await prisma.idea.count({
        where: {
          id: ideaId,
        },
      });
      if (!ideaCount) {
        errors.push({
          param: 'idea_id',
          msg: 'idea does not exists.',
        });
      } else {
        // check if idea is already liked
        const likeCount = await prisma.like.count({
          where: {
            ideaId,
            userId: user.id,
          },
        });

        if (likeCount > 0) {
          errors.push({
            param: 'idea_id',
            msg: 'idea is already liked by you.',
          });
        }
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const like = await prisma.like.create({
      data: {
        Idea: {
          connect: {
            id: validator.toInt(idea_id),
          },
        },
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    try {
      await search.likeIdea(idea_id.trim());
    } catch {}

    return like;
  },
  async unlikeIdea(_, { idea_id }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: 'idea_id'; msg: string }[] = [];

    // validate id
    if (
      !validator.isInt(idea_id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'idea_id',
        msg: 'idea_id is invalid',
      });
    } else {
      const ideaId = validator.toInt(idea_id);
      const likeCount = await prisma.like.count({
        where: {
          userId: user.id,
          ideaId: ideaId,
        },
      });
      if (likeCount <= 0) {
        errors.push({
          param: 'idea_id',
          msg: `"user:${user.id}" didn't liked "idea:${ideaId}.`,
        });
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const like = await prisma.like.delete({
      where: {
        userId: user.id,
        ideaId: validator.toInt(idea_id),
      },
    });

    try {
      await search.unlikeIdea(idea_id.trim());
    } catch {}

    return like!;
  },
  async updateThemeMode(_, { input }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const setting = await prisma.setting.update({
      data: {
        themeMode: input.themeMode,
      },
      where: {
        userId: user.id,
      },
    });

    return setting;
  },
  async forgotPassword(_, { input }, { prisma }) {
    input.email = validator.normalizeEmail(input.email.trim()) as string;

    const user = await prisma.user.findOne({
      where: {
        email: input.email,
      },
      select: {
        id: true,
        username: true,
        password: true,
        createdAt: true,
      },
    });

    const errors: { param: keyof typeof input; msg: string }[] = [];

    // check if email is valid
    if (!input.email) {
      errors.push({
        param: 'email',
        msg: 'email is required',
      });
    } else if (!validator.isEmail(input.email)) {
      errors.push({
        param: 'email',
        msg: 'email is invalid',
      });
    } else if (!user) {
      errors.push({
        param: 'email',
        msg: 'email is not linked with any account',
      });
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const token = createTokenForResetPassword({
      id: user!.id,
      createdAt: user!.createdAt.toISOString(),
      password: user!.password,
    });

    sendForgotPasswordEmail({
      id: user!.id,
      email: input.email,
      token,
      username: user!.username,
    }).catch(() => {});

    return { __typename: 'ForgotPasswordResponse' };
  },
  async resetPassword(_, { input }, { prisma }) {
    input.token = input.token.trim();
    input.userId = input.userId.trim();
    const userId = validator.toInt(input.userId);

    const errors: { param: keyof typeof input; msg: string }[] = [];

    // validate userId
    if (
      !validator.isInt(input.userId, {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'userId',
        msg: 'userId is invalid',
      });
    } else {
      const userCount = await prisma.user.count({
        where: {
          id: userId,
        },
      });
      if (userCount <= 0) {
        errors.push({
          param: 'userId',
          msg: `"user:${userId}" does not exist`,
        });
      }
    }

    // check if password is valid
    if (!input.newPassword) {
      errors.push({
        param: 'newPassword',
        msg: 'newPassword is required',
      });
    } else if (input.newPassword.length < 8) {
      errors.push({
        param: 'newPassword',
        msg: 'newPassword is too short. should be at least 8 character',
      });
    } else {
      // hash the password
      input.newPassword = await bcrypt.hash(input.newPassword, 8);
    }

    // validate token
    if (!input.token) {
      errors.push({
        param: 'token',
        msg: 'token is required',
      });
    } else if (!validator.isJWT(input.token)) {
      errors.push({
        param: 'token',
        msg: 'token is not JWT',
      });
    } else if (Number.isFinite(userId)) {
      const user = await prisma.user.findOne({
        where: {
          id: userId,
        },
        select: {
          password: true,
          createdAt: true,
        },
      });
      if (user) {
        try {
          const secretKey = user.password + '-' + user.createdAt.toISOString();
          const payload = jwt.verify(input.token, secretKey) as JWTTokenPayload;
          if (payload.id !== userId) {
            errors.push({
              param: 'token',
              msg: 'token is invalid',
            });
          }
        } catch {
          errors.push({
            param: 'token',
            msg: 'token is invalid',
          });
        }
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: input.newPassword,
      },
    });

    const token = createJwtToken({ id: user.id });

    return { user, token };
  },
};
