import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers/index';

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { prisma };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
