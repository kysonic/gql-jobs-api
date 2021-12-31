import { ObjectId } from 'mongodb';
import { Schema, Types, model } from 'mongoose';
import {
  Job,
  SkillEnum,
  LevelEnum,
  JobSalary,
  BenefitEnum,
  PublicUser,
} from '../types/schema';

const JobSalary = new Schema<JobSalary>({
  from: Number,
  to: Number,
});

export type MongooseApplication = {
  from: PublicUser | ObjectId | string;
  message?: string | null;
};

const Application = new Schema<MongooseApplication>({
  from: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: String,
});

type MongooseJob = Omit<Job, 'applications' | 'author'> & {
  author: PublicUser | ObjectId | string;
  applications: Array<MongooseApplication>;
};

const JobSchema = new Schema<MongooseJob>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: false,
      minlength: 5,
      maxlength: 500,
    },
    skills: {
      type: [String],
      enum: Object.values(SkillEnum),
    },
    level: {
      type: String,
      enum: Object.values(LevelEnum),
    },
    salary: JobSalary,
    benefits: {
      type: [String],
      enum: Object.values(BenefitEnum),
    },
    requiredExperience: {
      type: Number,
      min: 0,
      max: 15,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cover: String,
    applications: {
      type: [Application],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default model<MongooseJob>('Job', JobSchema);
