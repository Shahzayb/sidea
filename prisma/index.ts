import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  //   log: ['info', 'query', 'warn'],
  //   __internal: {
  //     debug: true,
  //   },
});

export default prisma;
