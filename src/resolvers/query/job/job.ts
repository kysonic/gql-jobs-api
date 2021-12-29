import { UserInputError } from 'apollo-server-core';
import Job from '../../../models/Job';
import { Context } from '../../../types/shared';
import { QueryJobArgs } from '../../../types/schema';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  { id }: QueryJobArgs,
  { req, res }: Context,
) => {
  await checkAuthorization(req, res);

  const job = await Job.findOne({ _id: id });

  if (!job) {
    throw new UserInputError('Job with provided id not found');
  }

  return job;
};
