import { MutationCreateJobArgs } from '../../../types/schema';
import Job from '../../../models/Job';
import { Context } from '../../../types/shared';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  { job }: MutationCreateJobArgs,
  { req, res }: Context,
) => {
  const user = await checkAuthorization(req, res);
  return Job.create({ ...job, author: user._id });
};
