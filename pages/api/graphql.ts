import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers/index';

const prisma = new PrismaClient();

prisma.user
  .findMany()
  .then(console.log)
  .catch(console.log)
  .finally(() => {
    prisma.disconnect();
  });

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
