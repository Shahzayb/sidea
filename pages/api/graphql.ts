import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import typeDefs from '../../graphql/schema';
import resolvers from '../../graphql/resolvers/index';

const prisma = new PrismaClient();

export interface Context {
  prisma: typeof prisma;
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context: (): Context => {
    return { prisma };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
