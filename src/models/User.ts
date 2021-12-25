import { Schema, model } from 'mongoose';
import { omit } from 'lodash';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { User, UserProfile, UserSystem, PublicUser } from '../types/schema';

export type MongooseUser = Omit<User, 'system'> & {
  comparePassword: (password: string) => boolean;
  getPublicUser: () => PublicUser;
  system: Omit<UserSystem, 'passwordTokenExpirationDate'> & {
    passwordTokenExpirationDate: Date | null;
  };
};

const STRONG_PASSWORD_OPTIONS = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
};

const UserSystemSchema = new Schema<UserSystem>({
  isEmailApproved: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  passwordToken: String,
  passwordTokenExpirationDate: Date,
});

const UserProfileSchema = new Schema<UserProfile>({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 40,
  },
  birthDate: Date,
});

const UserSchema = new Schema<MongooseUser>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email...'],
    validate: {
      validator: validator.isEmail,
      message: 'Email is not valid...',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password...'],
    validate: {
      validator: (value: string) =>
        validator.isStrongPassword(value, STRONG_PASSWORD_OPTIONS),
      message:
        'Password is weak. It should contains at least 6 symbols, 1 lowercase, 1 uppercase, 1 number',
    },
  },
  system: UserSystemSchema,
  profile: UserProfileSchema,
});

UserSchema.pre('save', async function UserPreSave() {
  if (!this.isModified('password')) {
    return undefined;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function UserComparePassword(
  password: string,
) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.getPublicUser = function GetPublicUser() {
  return omit(this.toObject(), ['password', 'system']);
};

export default model<MongooseUser>('User', UserSchema);
