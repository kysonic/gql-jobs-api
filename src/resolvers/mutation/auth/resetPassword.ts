import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { MutationResetPasswordArgs } from '../../../types/schema';
import User from '../../../models/User';
import { createMD5 } from '../../../utils/crypto';

export default async (
  parent: undefined,
  { email, token, newPassword }: MutationResetPasswordArgs,
) => {
  if (!email) {
    throw new UserInputError('Please provide valid email');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('Cannot find user with this email');
  }

  if (
    user.system.passwordToken !== createMD5(token) ||
    (user.system.passwordTokenExpirationDate &&
      user.system.passwordTokenExpirationDate < new Date())
  ) {
    throw new AuthenticationError('Token is not valid');
  }

  user.password = newPassword;
  user.system.passwordToken = '';
  user.system.passwordTokenExpirationDate = null;
  await user.save();

  return {
    code: '200',
    success: true,
    message: 'Your password has been changed successfully. Please login again.',
  };
};
