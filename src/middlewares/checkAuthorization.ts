import { Request, Response } from 'express';
import { AuthenticationError } from 'apollo-server-core';
import { isTokenValid, createJWTTokensAndCookies } from '../utils/jwt';
import Token from '../models/Token';
import { PublicUser } from '../types/schema';

export default async (req: Request, res: Response): Promise<PublicUser> => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return payload.user;
    }
    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken) {
      throw new AuthenticationError('Authentication Invalid');
    }

    createJWTTokensAndCookies({
      res,
      user: payload.user,
      token: existingToken.refreshToken,
    });

    req.user = payload.user;
    return payload.user;
  } catch (error) {
    throw new AuthenticationError('Authentication Invalid');
  }
};
