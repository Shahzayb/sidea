import { UserResolvers } from '../types';
import validator from 'validator';
import { UserInputError } from 'apollo-server-micro';
import { FindManyIdeaArgs, Idea } from '@prisma/client';

export const User: UserResolvers = {
  email(parent, _, { user }) {
    if (!user || parent.id !== user.id) {
      return null;
    }
    return parent.email;
  },
  async ideas(user, input, { prisma }) {
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

    const findManyIdeaArgs: FindManyIdeaArgs = {
      where: {
        userId: user.id,
        id: {
          lt: input.after_id ? validator.toInt(input.after_id) : undefined,
        },
      },
      orderBy: {
        id: 'desc',
      },
      // take is limit
      take: input.limit,
    };

    const ideas = await prisma.idea.findMany(findManyIdeaArgs);

    const response = {
      entry: ideas,
      page: {
        cursor: ideas.length ? ideas[ideas.length - 1].id : input.after_id,
        hasNextPage: ideas.length === input.limit,
      },
    };

    return response;
  },
  async savedIdeas(user, input, { prisma }) {
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

    const QUERY = `SELECT sidea.idea.* 
          FROM sidea.save INNER JOIN sidea.idea ON sidea.save.ideaId = sidea.idea.id 
          WHERE sidea.save.userId = ${user.id} ${
      input.after_id
        ? `AND sidea.idea.id < ${validator.toInt(input.after_id)}`
        : ''
    } 
          ORDER BY sidea.idea.id DESC 
          LIMIT ${input.limit}`;

    const ideas = await prisma.queryRaw<Idea[]>(QUERY);

    const response = {
      entry: ideas,
      page: {
        cursor: ideas.length ? ideas[ideas.length - 1].id : input.after_id,
        hasNextPage: ideas.length === input.limit,
      },
    };

    return response;
  },
  async likedIdeas(user, input, { prisma }) {
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

    const QUERY = `SELECT sidea.idea.* 
          FROM sidea.like INNER JOIN sidea.idea ON sidea.like.ideaId = sidea.idea.id 
          WHERE sidea.like.userId = ${user.id} ${
      input.after_id
        ? `AND sidea.idea.id < ${validator.toInt(input.after_id)}`
        : ''
    } 
          ORDER BY sidea.idea.id DESC 
          LIMIT ${input.limit}`;

    const ideas = await prisma.queryRaw<Idea[]>(QUERY);

    const response = {
      entry: ideas,
      page: {
        cursor: ideas.length ? ideas[ideas.length - 1].id : input.after_id,
        hasNextPage: ideas.length === input.limit,
      },
    };

    return response;
  },
};
