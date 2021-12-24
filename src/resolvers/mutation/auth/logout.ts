import { Request, Response } from 'express';
import { removeJWTCookies } from '../../../utils/jwt';
import Token from '../../../models/Token';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  _: undefined,
  { req, res }: { req: Request; res: Response },
) => {
  await checkAuthorization(req, res);
  await Token.findOneAndDelete({ user: req.user?._id });

  removeJWTCookies(res);

  return {
    code: '200',
    success: true,
    message: 'Logged out successfully',
  };
};
