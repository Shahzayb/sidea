import { ApolloServer } from 'apollo-server-micro';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { User as PrismaUser } from '@prisma/client';
import typeDefs from '../../graphql/schema';
import resolvers from '../../graphql/resolvers/index';
import prisma from '../../prisma/index';
import { getUserFromToken } from '../../utils/jwt';

export interface Context {
  prisma: typeof prisma;
  user: PrismaUser | null;
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }: { req: MicroRequest }): Promise<Context> {
    const token: string = req.headers.authorization || '';

    const user = await getUserFromToken(token);

    return { prisma, user };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
