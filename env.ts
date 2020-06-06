import env from 'env-var';

export const jwtSecret = env.get('JWT_SECRET').required().asString();
