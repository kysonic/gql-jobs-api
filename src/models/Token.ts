import { Schema, Types, model } from 'mongoose';
import { MongooseUser } from './User';

type MongooseToken = {
  refreshToken: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: string;
  user: MongooseUser;
};

const TokenSchema = new Schema<MongooseToken>(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      // Token would be removed automatically as well as JWT from cookies
      expires: process.env.REFRESH_TOKEN_TTL,
    },
  },
  { timestamps: true },
);

export default model<MongooseToken>('Token', TokenSchema);
