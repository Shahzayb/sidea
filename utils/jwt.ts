import jwt from 'jsonwebtoken';
import { jwtSecret } from '../env';
import prisma from '../prisma/index';

export const createJwtToken = (data: { id: number }) => {
  return jwt.sign(data, jwtSecret);
};

export const getUserFromToken = async (token: string) => {
  try {
    const slimToken = token.replace('Bearer ', '');
    const verifiedToken = jwt.verify(slimToken, jwtSecret) as { id: number };
    const user = await prisma.user.findOne({
      where: {
        id: verifiedToken.id,
      },
    });

    return user;
  } catch {
    return null;
  }
};
