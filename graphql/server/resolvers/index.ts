import { Resolvers } from '../types';

import { Query } from './query';
import { Mutation } from './mutation';
import { User } from './user';
import { Idea } from './idea';
import { Feature } from './feature';
import { Save } from './save';
import { Like } from './like';

const resolvers: Resolvers = {
  Query,
  Mutation,
  User,
  Idea,
  Feature,
  Save,
  Like,
};

export default resolvers;
