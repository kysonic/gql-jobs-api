import { Context } from '../../../types/shared';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  _: undefined,
  { req, res }: Context,
) => {
  const user = await checkAuthorization(req, res);

  return user;
};
