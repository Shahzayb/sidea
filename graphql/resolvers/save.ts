import { SaveResolvers } from '../types';

export const Save: SaveResolvers = {
  async idea(save, _, { prisma }) {
    const idea = await prisma.idea.findOne({
      where: {
        id: save.ideaId,
      },
    });

    return idea!;
  },
  async user(save, _, { prisma }) {
    const user = await prisma.user.findOne({
      where: {
        id: save.userId,
      },
    });

    return user!;
  },
};
