import { Idea, Feature } from '@prisma/client';

export type Page = {
  cursor?: string | number | null | undefined;
  hasNextPage: boolean;
};

export type IdeaPageResponse = {
  page: Page;
  entry: Idea[];
};

export type FeaturePageResponse = {
  page: Page;
  entry: Feature[];
};
