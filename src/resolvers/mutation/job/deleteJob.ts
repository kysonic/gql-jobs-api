import { UserInputError } from 'apollo-server-core';
import { MutationDeleteJobArgs } from '../../../types/schema';
import Job from '../../../models/Job';
import { Context } from '../../../types/shared';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  { id }: MutationDeleteJobArgs,
  { req, res }: Context,
) => {
  const user = await checkAuthorization(req, res);

  const j = await Job.findOneAndDelete({
    _id: id,
    author: user._id,
  });

  if (!j) {
    throw new UserInputError(
      'Job not found, or you do not have permissions to delete it. Only author can',
    );
  }

  return {
    code: '200',
    success: true,
    message: 'Job deleted successfully',
  };
};
