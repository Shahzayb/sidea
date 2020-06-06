import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import validator from 'validator';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import { createJwtToken } from '../../utils/jwt';
import { Resolvers } from '../types/index';
import { User } from '@prisma/client';

const resolvers: Resolvers = {
  Query: {
    me(_, __, { user }) {
      if (!user) {
        throw new AuthenticationError('your are not logged in');
      }
      return user;
    },
    async user(_, { id }, { prisma }) {
      if (
        !validator.isInt(id.trim(), {
          allow_leading_zeroes: true,
        })
      ) {
        return null;
      }

      const userId = validator.toInt(id);
      return prisma.user.findOne({
        where: {
          id: userId,
        },
      });
    },
  },
  Mutation: {
    async login(_, { input: { username, password } }, { prisma }) {
      username = username.trim();
      password = password.trim();
      // a username cannot be an email address
      let user: User | null = null;
      if (validator.isEmail(username)) {
        user = await prisma.user.findOne({
          where: {
            email: validator.normalizeEmail(username) as string,
          },
        });
      } else {
        user = await prisma.user.findOne({
          where: {
            username: username,
          },
        });
      }
      if (!user) {
        throw new AuthenticationError('invalid username or password');
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new AuthenticationError('invalid username or password');
      }

      const token = createJwtToken({ id: user.id });

      return {
        token,
        user,
      };
    },
    async signup(_, { input }, { prisma }) {
      const errors: { param: keyof typeof input; msg: string }[] = [];
      // trim all input
      input.email = input.email.trim();
      input.name = input.name.trim();
      input.username = input.username.trim();
      input.password = input.password.trim();

      // check if name is valid
      if (!input.name) {
        errors.push({
          param: 'name',
          msg: 'name is required',
        });
      }

      // check if password is valid
      if (!input.password) {
        errors.push({
          param: 'password',
          msg: 'password is required',
        });
      } else if (input.password.length < 8) {
        errors.push({
          param: 'password',
          msg: 'password is too short. should be at least 8 character',
        });
      } else {
        // hash the password
        input.password = await bcrypt.hash(input.password, 8);
      }

      // check if email is valid
      if (!input.email) {
        errors.push({
          param: 'email',
          msg: 'email is required',
        });
      } else if (!validator.isEmail(input.email)) {
        errors.push({
          param: 'email',
          msg: 'email is invalid',
        });
      } else {
        // normalize email & check if this email is unique
        input.email = validator.normalizeEmail(input.email) as string;
        const count = await prisma.user.count({
          where: {
            email: input.email,
          },
        });
        if (count !== 0) {
          errors.push({
            param: 'email',
            msg: 'email is already taken',
          });
        }
      }

      // check if username is valid
      if (!input.username) {
        errors.push({
          param: 'username',
          msg: 'username is required',
        });
      }
      // check if username is not email
      else if (validator.isEmail(input.username)) {
        errors.push({
          param: 'username',
          msg: 'username cannot be an email address',
        });
      }
      // check if username does not contains any spaces ^[0-9a-zA-Z]*$
      else if (!validator.isAlphanumeric(input.username)) {
        errors.push({
          param: 'username',
          msg: 'username can only be alpha numeric',
        });
      }
      // check if username is unique
      else {
        const count = await prisma.user.count({
          where: {
            username: input.username,
          },
        });
        if (count !== 0) {
          errors.push({
            param: 'username',
            msg: 'username is already taken',
          });
        }
      }

      // check input length
      if (
        !validator.isLength(input.email, {
          max: 255,
        })
      ) {
        errors.push({
          param: 'email',
          msg: 'email is too long. max character limit is 255',
        });
      }
      if (
        !validator.isLength(input.name, {
          max: 255,
        })
      ) {
        errors.push({
          param: 'name',
          msg: 'name is too long. max character limit is 255',
        });
      }
      if (
        !validator.isLength(input.username, {
          max: 255,
        })
      ) {
        errors.push({
          param: 'username',
          msg: 'username is too long. max character limit is 255',
        });
      }

      if (errors.length !== 0) {
        throw new UserInputError('input is invalid', { errors });
      }

      // generate avatar
      const avatar = gravatar.url(input.email);
      // create user
      const user = await prisma.user.create({
        data: {
          ...input,
          avatar,
        },
      });
      // create jwt token
      const token = createJwtToken({ id: user.id });

      return {
        token,
        user,
      };
    },
  },
  User: {
    email(parent, _, { user }, info) {
      if (!user || parent.id !== user.id) {
        return null;
      }
      return parent.email;
    },
  },
};

export default resolvers;
