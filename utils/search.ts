import algoliasearch from 'algoliasearch';
import { algoliaAppId, algoliaAdminApiKey } from '../env';
import { User, Idea } from '@prisma/client';

const client = algoliasearch(algoliaAppId, algoliaAdminApiKey);

export const usersIndex = client.initIndex('users');
export const ideasIndex = client.initIndex('ideas');

usersIndex.setSettings({
  searchableAttributes: ['unordered(name)', 'username'],
  attributesToRetrieve: ['id', 'name', 'username', 'avatar'],
});

ideasIndex.setSettings({
  searchableAttributes: ['unordered(title), tags', 'unordered(body)'],
  customRanking: ['desc(likesCount)'],
  attributesToRetrieve: [
    'id',
    'title',
    'body',
    'tags',
    'likesCount',
    'userId',
    'createdAt',
  ],
});

export const addUser = (user: User) => {
  return usersIndex.saveObject({
    objectID: user.id,
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    username: user.username,
  });
};

export const addIdea = (idea: Idea & { tags: string[] }) => {
  return ideasIndex.saveObject({
    objectID: idea.id,
    id: idea.id,
    title: idea.title,
    body: idea.body,
    tags: idea.tags,
    likesCount: 0,
    userId: idea.userId,
    createdAt: idea.createdAt.toISOString(),
  });
};

export const updateIdea = (
  idea: Partial<Idea> & Pick<Idea, 'id'> & { tags?: string[] }
) => {
  return ideasIndex.partialUpdateObject({
    objectID: idea.id,
    id: idea.id,
    title: idea.title,
    body: idea.body,
    tags: idea.tags,
  });
};

export const deleteIdea = (id: string) => {
  return ideasIndex.deleteObject(id);
};

export const likeIdea = async (id: string) => {
  const object: any = await ideasIndex.getObject(id, {
    attributesToRetrieve: ['likesCount'],
  });

  await ideasIndex.partialUpdateObject({
    objectID: id,
    likesCount: object.likesCount + 1,
  });
};

export const unlikeIdea = async (id: string) => {
  const object: any = await ideasIndex.getObject(id, {
    attributesToRetrieve: ['likesCount'],
  });

  await ideasIndex.partialUpdateObject({
    objectID: id,
    likesCount: object.likesCount - 1,
  });
};
