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
import { createJwtToken } from '../../../utils/jwt';
import { MutationResolvers } from '../types';

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
    // create user
    const user = await prisma.user.create({
      data: {
        ...input,
        avatar,
      },
    });
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
        curFeature.body = curFeature.body.trim();
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

        // validate feature body
        if (
          !validator.isLength(curFeature.body, {
            max: 300,
          })
        ) {
          errors.push({
            param: 'features',
            msg: 'body of feature is too long. max character limit is 300',
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
          body: feature.body,
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

    return idea;
  },
  async createFeature(_, { input }, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const errors: { param: keyof typeof input; msg: string }[] = [];

    input.title = input.title.trim();
    input.body = input.body.trim();
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

    // validate feature body
    if (
      !validator.isLength(input.body, {
        max: 300,
      })
    ) {
      errors.push({
        param: 'body',
        msg: 'body of feature is too long. max character limit is 300',
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
        body: input.body,
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
        max: 300,
      })
    ) {
      errors.push({
        param: 'body',
        msg: 'body is too long. max character limit is 300',
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
      data: {},
    };

    if (input.title) {
      update.data.title = input.title;
    }
    // body can be empty
    if (input.body || input.body === '') {
      update.data.body = input.body;
    }

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

    return idea!;
  },
  async saveIdea(_, { id }, { prisma, user }) {
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
      const ideaCount = await prisma.idea.count({
        where: {
          id: ideaId,
        },
      });
      if (!ideaCount) {
        errors.push({
          param: 'id',
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
            param: 'id',
            msg: 'idea is already saved by you.',
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
            id: validator.toInt(id),
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
  async deleteSavedIdea(_, { id }, { prisma, user }) {
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
      const saveId = validator.toInt(id);
      const save = await prisma.save.findOne({
        where: {
          id: saveId,
        },
        select: {
          userId: true,
        },
      });
      if (!save) {
        errors.push({
          param: 'id',
          msg: 'saved idea does not exists.',
        });
      } else if (save.userId !== user.id) {
        errors.push({
          param: 'id',
          msg: 'you are not authorized to delete this saved idea.',
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
        id: validator.toInt(id),
      },
    });

    return save;
  },
  async likeIdea(_, { id }, { prisma, user }) {
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
      const ideaCount = await prisma.idea.count({
        where: {
          id: ideaId,
        },
      });
      if (!ideaCount) {
        errors.push({
          param: 'id',
          msg: 'idea does not exists.',
        });
      } else {
        // check if idea is already saved
        const saveCount = await prisma.like.count({
          where: {
            ideaId,
            userId: user.id,
          },
        });

        if (saveCount > 0) {
          errors.push({
            param: 'id',
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
            id: validator.toInt(id),
          },
        },
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return like;
  },
  async unlikeIdea(_, { id }, { prisma, user }) {
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
      const likeId = validator.toInt(id);
      const likeCount = await prisma.like.count({
        where: {
          id: likeId,
        },
      });
      if (!likeCount) {
        errors.push({
          param: 'id',
          msg: `like with id "${id}" does not exist.`,
        });
      }
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const like = await prisma.like.findOne({
      where: {
        id: validator.toInt(id),
      },
    });

    await prisma.like.delete({
      where: {
        id: validator.toInt(id),
      },
    });

    return like!;
  },
};
