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
          gt: input.after_id ? validator.toInt(input.after_id) : undefined,
        },
      },
      orderBy: {
        id: 'asc',
      },
      // take is limit
      take: input.limit,
    };

    const ideas = await prisma.idea.findMany(findManyIdeaArgs);

    return ideas;
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

    const QUERY = `SELECT Idea.* 
          FROM Save INNER JOIN Idea ON Save.ideaId = Idea.id 
          WHERE Save.userId = ${user.id} ${
      input.after_id ? `AND Idea.id > ${validator.toInt(input.after_id)}` : ''
    } 
          ORDER BY Idea.id ASC 
          LIMIT ${input.limit}`;

    const ideas = await prisma.queryRaw<Idea[]>(QUERY);

    return ideas;
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

    const QUERY = `SELECT Idea.* 
          FROM sidea.Like INNER JOIN Idea ON sidea.Like.ideaId = Idea.id 
          WHERE sidea.Like.userId = ${user.id} ${
      input.after_id ? `AND Idea.id > ${validator.toInt(input.after_id)}` : ''
    } 
          ORDER BY Idea.id ASC 
          LIMIT ${input.limit}`;

    const ideas = await prisma.queryRaw<Idea[]>(QUERY);

    return ideas;
  },
};
