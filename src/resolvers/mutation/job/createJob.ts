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
  const j = await Job.create({ ...job, author: user._id });

  return {
    code: '200',
    success: true,
    message: 'Job created successfully',
    job: j,
  };
};
