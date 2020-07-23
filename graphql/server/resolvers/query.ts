import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import validator from 'validator';
import { Interval, QueryResolvers } from '../types';
import { Idea, FindManyFeatureArgs } from '@prisma/client';

export const Query: QueryResolvers = {
  me(_, __, { user }) {
    if (!user) {
      throw new AuthenticationError('you are not logged in');
    }
    return user;
  },
  async user(_, { id }, { prisma }) {
    if (
      !validator.isInt(id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      return null;
    }

    const userId = validator.toInt(id);
    return prisma.user.findOne({
      where: {
        id: userId,
      },
    });
  },
  idea(_, { id }, { prisma }) {
    if (
      !validator.isInt(id, {
        allow_leading_zeroes: true,
      })
    ) {
      return null;
    }

    const ideaId = validator.toInt(id);

    return prisma.idea.findOne({
      where: {
        id: ideaId,
      },
    });
  },
  async newIdeas(_, input, { prisma }) {
    const errors: { param: keyof typeof input; msg: string }[] = [];

    // validate id
    if (
      input.after_id &&
      !validator.isInt(input.after_id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'after_id',
        msg: 'after_id is invalid.',
      });
    }
    if (input.limit <= 0) {
      errors.push({
        param: 'limit',
        msg: 'limit should be greater than 0.',
      });
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const ideas = await prisma.idea.findMany({
      where: {
        id: {
          lt: input.after_id ? validator.toInt(input.after_id) : undefined,
        },
      },
      take: input.limit,
      orderBy: {
        id: 'desc',
      },
    });

    const response = {
      entry: ideas,
      page: {
        cursor: ideas.length ? ideas[ideas.length - 1].id : input.after_id,
        hasNextPage: !!ideas.length,
      },
    };

    return response;
  },
  async features(_, input, { prisma }) {
    const errors: { param: keyof typeof input; msg: string }[] = [];

    input.after_feature_id = input.after_feature_id?.trim();
    input.idea_id = input.idea_id.trim();

    // check if idea_id is valid
    if (
      !validator.isInt(input.idea_id.trim(), {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'idea_id',
        msg: 'idea_id is invalid.',
      });
    } else {
      const ideaId = validator.toInt(input.idea_id);

      const ideaCount = await prisma.idea.count({
        where: {
          id: ideaId,
        },
      });

      if (!ideaCount) {
        errors.push({
          param: 'idea_id',
          msg: 'idea does not exist.',
        });
      }
    }

    // validate after_feature_id
    if (
      input.after_feature_id &&
      !validator.isInt(input.after_feature_id, {
        allow_leading_zeroes: true,
      })
    ) {
      errors.push({
        param: 'after_feature_id',
        msg: 'after_feature_id is invalid.',
      });
    }
    if (input.limit <= 0) {
      errors.push({
        param: 'limit',
        msg: 'limit should be greater than 0.',
      });
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const findManyFeatureArgs: FindManyFeatureArgs = {
      where: {
        ideaId: validator.toInt(input.idea_id),
        id: {
          gt: input.after_feature_id
            ? validator.toInt(input.after_feature_id)
            : undefined,
        },
      },
      orderBy: {
        id: 'asc',
      },
      // take is limit
      take: input.limit,
    };

    const features = await prisma.feature.findMany(findManyFeatureArgs);

    const response = {
      entry: features,
      page: {
        cursor: features.length
          ? features[features.length - 1].id
          : input.after_feature_id,
        hasNextPage: !!features.length,
      },
    };

    return response;
  },
  async topIdeas(_, input, { prisma }) {
    const errors: { param: keyof typeof input; msg: string }[] = [];

    // validate id
    if (input.skip < 0) {
      errors.push({
        param: 'skip',
        msg: 'skip is invalid. cannot be less than 0.',
      });
    }
    if (input.limit <= 0) {
      errors.push({
        param: 'limit',
        msg: 'limit should be greater than 0.',
      });
    }

    if (errors.length) {
      throw new UserInputError('invalid data', {
        errors,
      });
    }

    const QUERY = `
        select sidea.idea.id, sidea.idea.title, sidea.idea.body, sidea.idea.userId, sidea.idea.createdAt, count(sidea.like.id) as likeCount 
        from sidea.idea left join sidea.like on sidea.idea.id = sidea.like.ideaId
        group by sidea.idea.id, sidea.idea.title, sidea.idea.body, sidea.idea.userId, sidea.idea.createdAt
        ${
          input.interval !== Interval.AllTime
            ? `having sidea.idea.createdAt > DATE_SUB(NOW(), INTERVAL 1 ${input.interval})`
            : ''
        }
        order by likeCount desc, sidea.idea.id desc
        limit ${input.skip}, ${input.limit}
        `;

    const ideas = await prisma.queryRaw<Idea[]>(QUERY);

    const response = {
      entry: ideas,
      page: {
        cursor: input.skip + ideas.length,
        hasNextPage: !!ideas.length,
      },
    };

    return response;
  },
  async mySetting(_, __, { prisma, user }) {
    if (!user) {
      throw new AuthenticationError('login is required');
    }

    const setting = await prisma.setting.findOne({
      where: {
        userId: user.id,
      },
    });

    return setting!;
  },
};
