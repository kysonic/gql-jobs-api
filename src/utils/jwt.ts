import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PublicUser } from '../types/schema';

export const createJWT = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET);

export const isTokenValid = (token: string): JwtPayload =>
  jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

const COOKIE_SHARED_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  signed: true,
};

const REMOVE_COOKIE_SHARED_OPTIONS = {
  httpOnly: true,
  expires: new Date(Date.now()),
};

export type CreateTokensAndCookiesArgs = {
  res: Response;
  user: PublicUser;
  token: string;
};

export const createJWTTokensAndCookies = ({
  res,
  user,
  token,
}: CreateTokensAndCookiesArgs): void => {
  const accessTokenJWT = createJWT({ user });
  const refreshTokenJWT = createJWT({ user, token });

  res.cookie('accessToken', accessTokenJWT, {
    ...COOKIE_SHARED_OPTIONS,
    expires: new Date(Date.now() + process.env.ACCESS_TOKEN_TTL),
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    ...COOKIE_SHARED_OPTIONS,
    expires: new Date(Date.now() + process.env.REFRESH_TOKEN_TTL),
  });
};

export const removeJWTCookies = (res: Response) => {
  res.cookie('accessToken', 'logout', REMOVE_COOKIE_SHARED_OPTIONS);

  res.cookie('refreshToken', 'logout', REMOVE_COOKIE_SHARED_OPTIONS);
};
