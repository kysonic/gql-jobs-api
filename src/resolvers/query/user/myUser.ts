import { Request, Response } from 'express';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  _: undefined,
  { req, res }: { req: Request; res: Response },
) => {
  const user = await checkAuthorization(req, res);

  return user;
};
