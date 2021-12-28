import { Schema, Types, model } from 'mongoose';
import {
  Job,
  SkillEnum,
  LevelEnum,
  JobSalary,
  BenefitEnum,
} from '../types/schema';

const JobSalary = new Schema<JobSalary>({
  from: Number,
  to: Number,
});

const JobSchema = new Schema<Job>(
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
  },
  {
    timestamps: true,
  },
);

export default model<Job>('Job', JobSchema);
