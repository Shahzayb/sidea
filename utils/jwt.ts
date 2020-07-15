import jwt from 'jsonwebtoken';
import { jwtSecret } from '../env';
import prisma from '../prisma/index';

export const createJwtToken = (data: { id: number }) => {
  return jwt.sign(data, jwtSecret);
};

export type JWTTokenPayload = { id: number };

export const getUserFromToken = async (token: string) => {
  try {
    const slimToken = token.replace('Bearer ', '');
    const verifiedToken = jwt.verify(slimToken, jwtSecret) as JWTTokenPayload;
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

type User = {
  password: string;
  id: number;
  createdAt: string;
};

// `secret` is password hash concatenated with user's
// createdAt value, so if someone malicious gets the
// token they still need a timestamp to hack it:
export const createTokenForResetPassword = ({
  password,
  id,
  createdAt,
}: User) => {
  const secret = password + '-' + createdAt;
  const token = jwt.sign({ id }, secret, {
    expiresIn: 3600, // 1 hour
  });

  return token;
};
