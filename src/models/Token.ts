import { Schema, Types, model } from 'mongoose';
import { MongooseUser } from './User';

type MongooseToken = {
  refreshToken: string;
  ip: string;
  userAgent: string;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
  user: MongooseUser;
};

const TokenSchema = new Schema<MongooseToken>(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default model<MongooseToken>('Token', TokenSchema);
