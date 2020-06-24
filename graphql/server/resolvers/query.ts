import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import validator from 'validator';
import { Interval, QueryResolvers } from '../types';
import { Idea } from '@prisma/client';

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

    return ideas;
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

    // interval
    const QUERY = `
        select Idea.id, Idea.title, Idea.body, Idea.userId, Idea.createdAt, count(sidea.Like.id) as likeCount 
        from Idea left join sidea.Like on Idea.id = sidea.Like.ideaId
        group by Idea.id, Idea.title, Idea.body, Idea.userId, Idea.createdAt
        ${
          input.interval !== Interval.AllTime
            ? `having Idea.createdAt > DATE_SUB(NOW(), INTERVAL 1 ${input.interval})`
            : ''
        }
        order by likeCount desc
        limit ${input.skip}, ${input.limit}
        `;

    const ideas = await prisma.queryRaw<Idea[]>(QUERY);

    return ideas;
  },
};
