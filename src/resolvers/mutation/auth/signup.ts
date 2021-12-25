import { UserInputError } from 'apollo-server-express';
import crypto from 'crypto';
import { MutationSignupArgs } from '../../../types/schema';
import User from '../../../models/User';
import { approveEmail } from '../../../services/mailgun';

export default async (
  parent: undefined,
  { email, password, data }: MutationSignupArgs,
) => {
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new UserInputError('Email already exists...');
  }

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    email,
    password,
    system: {
      isEmailApproved: false,
      verificationToken,
    },
    profile: data,
  });

  try {
    await approveEmail(
      email,
      `${process.env.APPROVE_EMAIL_URL}?token=${verificationToken}&email=${email}`,
    );
    console.log(
      `${process.env.APPROVE_EMAIL_URL}?token=${verificationToken}&email=${email}`,
    );
  } catch (err) {
    // Rollback user if email is not sent
    await User.findOneAndDelete(user._id);
    throw err;
  }

  return {
    code: '200',
    success: true,
    message: 'Registration is successful. Please check email to verify it.',
  };
};
