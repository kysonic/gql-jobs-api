import { AuthenticationError } from 'apollo-server-express';
import { MutationVerifyEmailArgs } from '../../../types/schema';
import User from '../../../models/User';

export default async (
  parent: undefined,
  { email, token }: MutationVerifyEmailArgs,
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('Verification Failed');
  }

  if (user.system.verificationToken !== token) {
    throw new AuthenticationError('Verification Failed');
  }

  user.system.isEmailApproved = true;
  user.system.verificationToken = '';

  await user.save();

  return {
    code: '200',
    success: true,
    message: 'Email is verified. Now you can log in.',
  };
};
