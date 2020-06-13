import { FeatureResolvers } from '../types';

export const Feature: FeatureResolvers = {
  async idea(feature, _, { prisma }) {
    const idea = await prisma.idea.findOne({
      where: {
        id: feature.ideaId,
      },
    });
    // come back to null issue later
    return idea!;
  },
  async user(feature, _, { prisma }) {
    const user = await prisma.user.findOne({
      where: {
        id: feature.userId,
      },
    });

    return user!;
  },
};
