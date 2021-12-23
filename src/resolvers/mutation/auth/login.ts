import { UserInputError, AuthenticationError } from 'apollo-server';
import { MutationLoginArgs } from '../../../types/schema';
import User from '../../../models/User';

export default async (
  parent: undefined,
  { email, password }: MutationLoginArgs,
) => {
  if (!email || !password) {
    throw new UserInputError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AuthenticationError('Invalid Credentials');
  }
  if (!user.system.isEmailApproved) {
    throw new AuthenticationError('Please verify your email');
  }

  return {
    code: '200',
    success: true,
    message: 'You logged in successfully!',
    user,
    token: '12312312',
  };
};
