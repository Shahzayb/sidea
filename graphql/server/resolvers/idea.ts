import { IdeaResolvers } from '../types';
import validator from 'validator';
import { UserInputError } from 'apollo-server-micro';
import { FindManyFeatureArgs } from '@prisma/client';

export const Idea: IdeaResolvers = {
  async user(idea, _, { prisma }) {
    const user = await prisma.user.findOne({
      where: {
        id: idea.userId,
      },
    });

    // come back to null issue later
    return user!;
  },
  async tags(idea, _, { prisma }) {
    const tags = await prisma.tag.findMany({
      where: {
        ideaId: idea.id,
      },
    });

    return tags.map((tag) => tag.value);
  },
  async features(idea, input, { prisma }) {
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

    const findManyFeatureArgs: FindManyFeatureArgs = {
      where: {
        ideaId: idea.id,
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

    const features = await prisma.feature.findMany(findManyFeatureArgs);

    return features;
  },
  async likesCount(idea, _, { prisma }) {
    const count = await prisma.like.count({
      where: {
        ideaId: idea.id,
      },
    });

    return count;
  },
  async isLikedByMe(idea, _, { prisma, user }) {
    if (!user) {
      return false;
    }
    const count = await prisma.like.count({
      where: {
        ideaId: idea.id,
        userId: user.id,
      },
    });

    return count ? true : false;
  },
  async isSavedByMe(idea, _, { prisma, user }) {
    if (!user) {
      return false;
    }
    const count = await prisma.save.count({
      where: {
        ideaId: idea.id,
        userId: user.id,
      },
    });

    return count ? true : false;
  },
};
