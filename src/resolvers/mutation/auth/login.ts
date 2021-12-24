import { Request, Response } from 'express';
import crypto from 'crypto';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { MutationLoginArgs } from '../../../types/schema';
import User, { MongooseUser } from '../../../models/User';
import Token from '../../../models/Token';
import { createJWTTokensAndCookies } from '../../../utils/jwt';

const loginResponse = (user: MongooseUser) => ({
  code: '200',
  success: true,
  message: 'You logged in successfully!',
  user: user.getPublicUser(),
});

export default async (
  parent: undefined,
  { email, password }: MutationLoginArgs,
  { req, res }: { req: Request; res: Response },
) => {
  if (!email || !password) {
    throw new UserInputError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AuthenticationError('Invalid Credentials');
  }
  if (!user.system.isEmailApproved) {
    throw new AuthenticationError('Please verify your email');
  }

  const existedToken = await Token.findOne({ user: user._id });

  if (existedToken) {
    createJWTTokensAndCookies({
      res,
      user: user.getPublicUser(),
      token: existedToken.refreshToken,
    });

    return loginResponse(user);
  }

  const refreshToken = crypto.randomBytes(40).toString('hex');

  await Token.create({
    refreshToken,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    user: user._id,
  });

  createJWTTokensAndCookies({
    res,
    user: user.getPublicUser(),
    token: refreshToken,
  });

  return loginResponse(user);
};
