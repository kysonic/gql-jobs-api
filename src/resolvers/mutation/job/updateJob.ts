import { UserInputError } from 'apollo-server-core';
import { MutationUpdateJobArgs } from '../../../types/schema';
import Job from '../../../models/Job';
import { Context } from '../../../types/shared';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  { id, job }: MutationUpdateJobArgs,
  { req, res }: Context,
) => {
  const user = await checkAuthorization(req, res);

  const j = await Job.findOneAndUpdate(
    {
      _id: id,
      author: user._id,
    },
    job,
    { new: true, runValidators: true },
  );

  if (!j) {
    throw new UserInputError(
      'Job not found, or you do not have permissions to update it. Only author can',
    );
  }

  return {
    code: '200',
    success: true,
    message: 'Job updated successfully',
    job: j,
  };
};
