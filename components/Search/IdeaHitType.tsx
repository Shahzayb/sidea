import { Idea } from '../../graphql/client/types';
import { Hit } from 'react-instantsearch-core';

export type IdeaHit = Hit<
  Pick<Idea, 'id' | 'title' | 'body' | 'tags' | 'createdAt'> & {
    userId: string;
  }
>;
