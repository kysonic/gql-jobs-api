import Job from '../../../models/Job';
import { Context } from '../../../types/shared';
import { QueryGetAllJobsArgs } from '../../../types/schema';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  { page = 1, limit = 10 }: QueryGetAllJobsArgs,
  { req, res }: Context,
) => {
  await checkAuthorization(req, res);

  const cursor = Job.find();

  if (page && limit) {
    const skip = (page - 1) * limit;

    cursor.skip(skip).limit(limit);
  }

  const jobs = await cursor.exec();

  return jobs;
};
