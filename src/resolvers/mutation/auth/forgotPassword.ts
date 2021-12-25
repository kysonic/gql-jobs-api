import crypto from 'crypto';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { MutationForgotPasswordArgs } from '../../../types/schema';
import User from '../../../models/User';
import { forgotEmail } from '../../../services/mailgun';
import { createMD5 } from '../../../utils/crypto';

export default async (
  parent: undefined,
  { email }: MutationForgotPasswordArgs,
) => {
  if (!email) {
    throw new UserInputError('Please provide valid email');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError('Cannot find user with this email');
  }

  const passwordToken = crypto.randomBytes(70).toString('hex');

  await forgotEmail(
    email,
    `${process.env.RESET_EMAIL_URL}?email=${email}&token=${passwordToken}`,
  );

  console.log(
    `${process.env.RESET_EMAIL_URL}?email=${email}&token=${passwordToken}`,
  );

  const tenMinutes = 1000 * 60 * 10;

  user.system.passwordToken = createMD5(passwordToken);
  user.system.passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

  await user.save();

  return {
    code: '200',
    success: true,
    message: 'Please check your email for reset password link',
  };
};
