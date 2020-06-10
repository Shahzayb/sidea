import { LikeResolvers } from '../types';

export const Like: LikeResolvers = {
  async idea(like, _, { prisma }) {
    const idea = await prisma.idea.findOne({
      where: {
        id: like.ideaId,
      },
    });

    return idea!;
  },
  async user(like, _, { prisma }) {
    const user = await prisma.user.findOne({
      where: {
        id: like.userId,
      },
    });

    return user!;
  },
};
