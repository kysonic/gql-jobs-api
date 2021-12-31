import { ObjectId } from 'mongodb';
import { UserInputError } from 'apollo-server-core';
import { MutationSubmitApplicationArgs } from '../../../types/schema';
import { Context } from '../../../types/shared';
import checkAuthorization from '../../../middlewares/checkAuthorization';
import Job from '../../../models/Job';

export default async (
  parent: undefined,
  { jobId, message }: MutationSubmitApplicationArgs,
  { req, res }: Context,
) => {
  const user = await checkAuthorization(req, res);

  if (!jobId) {
    throw new UserInputError('Job ID is not provided');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new UserInputError('Job not found');
  }

  if ((job.author as ObjectId).equals(user._id)) {
    throw new UserInputError('No sense to submit to own job');
  }

  const alreadySubmitted = job.applications.find((application) =>
    (application.from as ObjectId).equals(user._id),
  );

  if (alreadySubmitted) {
    throw new UserInputError('You already submitted application for this job');
  }

  job.applications.push({
    message,
    from: user._id,
  });

  await job.save();

  return {
    code: '200',
    success: true,
    message: 'Application submitted successfully',
  };
};
