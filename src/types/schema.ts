export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum BenefitEnum {
  Coffee = 'COFFEE',
  FreeParking = 'FREE_PARKING',
  GiftCards = 'GIFT_CARDS',
  Gym = 'GYM',
  MedicalInsurance = 'MEDICAL_INSURANCE'
}

export type CreateJobPayload = MutationResponse & {
  __typename?: 'CreateJobPayload';
  code: Scalars['String'];
  job: Job;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DeleteFilePayload = MutationResponse & {
  __typename?: 'DeleteFilePayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DeleteJobPayload = MutationResponse & {
  __typename?: 'DeleteJobPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  path: Scalars['String'];
};

export type ForgotPasswordPayload = MutationResponse & {
  __typename?: 'ForgotPasswordPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Job = {
  __typename?: 'Job';
  _id: Scalars['ID'];
  author: PublicUser;
  benefits?: Maybe<Array<Maybe<BenefitEnum>>>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  level?: Maybe<LevelEnum>;
  requiredExperience?: Maybe<Scalars['Int']>;
  salary?: Maybe<JobSalary>;
  skills?: Maybe<Array<Maybe<SkillEnum>>>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type JobInput = {
  benefits?: InputMaybe<Array<InputMaybe<BenefitEnum>>>;
  cover?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<LevelEnum>;
  requiredExperience?: InputMaybe<Scalars['Int']>;
  salary?: InputMaybe<JobSalaryInput>;
  skills?: InputMaybe<Array<InputMaybe<SkillEnum>>>;
  title: Scalars['String'];
};

export type JobSalary = {
  __typename?: 'JobSalary';
  from?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Int']>;
};

export type JobSalaryInput = {
  from?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['Int']>;
};

export enum LevelEnum {
  Junior = 'JUNIOR',
  Middle = 'MIDDLE',
  Senior = 'SENIOR'
}

export type LoginPayload = MutationResponse & {
  __typename?: 'LoginPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  user: PublicUser;
};

export type LogoutPayload = MutationResponse & {
  __typename?: 'LogoutPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJob: CreateJobPayload;
  deleteFile: DeleteFilePayload;
  deleteJob: DeleteJobPayload;
  forgotPassword: ForgotPasswordPayload;
  login: LoginPayload;
  logout: LogoutPayload;
  resetPassword: ResetPasswordPayload;
  signup: SignupPayload;
  submitApplication: SubmitApplicationPayload;
  updateJob: UpdateJobPayload;
  uploadFile: UploadFilePayload;
  verifyEmail: VerifyEmailPayload;
};


export type MutationCreateJobArgs = {
  job: JobInput;
};


export type MutationDeleteFileArgs = {
  filePath: Scalars['String'];
};


export type MutationDeleteJobArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSignupArgs = {
  data: UserProfileInput;
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSubmitApplicationArgs = {
  jobId: Scalars['ID'];
};


export type MutationUpdateJobArgs = {
  id: Scalars['ID'];
  job: JobInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationVerifyEmailArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};

export type MutationResponse = {
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type PublicUser = {
  __typename?: 'PublicUser';
  _id: Scalars['ID'];
  email: Scalars['String'];
  profile?: Maybe<UserProfile>;
};

export type Query = {
  __typename?: 'Query';
  fullUser?: Maybe<User>;
  job: Job;
  jobs: Array<Job>;
  myUser: PublicUser;
};


export type QueryJobArgs = {
  id: Scalars['ID'];
};


export type QueryJobsArgs = {
  benefits?: InputMaybe<Array<InputMaybe<BenefitEnum>>>;
  level?: InputMaybe<LevelEnum>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  salary?: InputMaybe<JobSalaryInput>;
  skills?: InputMaybe<Array<InputMaybe<SkillEnum>>>;
  textSearch?: InputMaybe<Scalars['String']>;
};

export type ResetPasswordPayload = MutationResponse & {
  __typename?: 'ResetPasswordPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SignupPayload = MutationResponse & {
  __typename?: 'SignupPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export enum SkillEnum {
  Apollo = 'APOLLO',
  Js = 'JS',
  Mongodb = 'MONGODB',
  Node = 'NODE',
  Postgres = 'POSTGRES',
  Typescript = 'TYPESCRIPT'
}

export type SubmitApplicationPayload = MutationResponse & {
  __typename?: 'SubmitApplicationPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpdateJobPayload = MutationResponse & {
  __typename?: 'UpdateJobPayload';
  code: Scalars['String'];
  job: Job;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UploadFilePayload = MutationResponse & {
  __typename?: 'UploadFilePayload';
  code: Scalars['String'];
  file: File;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  profile?: Maybe<UserProfile>;
  system: UserSystem;
  updatedAt: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  birthDate?: Maybe<Scalars['String']>;
  experience?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  level?: Maybe<LevelEnum>;
  phone?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Maybe<SkillEnum>>>;
};

export type UserProfileInput = {
  birthDate?: InputMaybe<Scalars['String']>;
  experience?: InputMaybe<Scalars['Int']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<LevelEnum>;
  phone?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<InputMaybe<SkillEnum>>>;
};

export type UserSystem = {
  __typename?: 'UserSystem';
  isEmailApproved: Scalars['Boolean'];
  passwordToken?: Maybe<Scalars['String']>;
  passwordTokenExpirationDate?: Maybe<Scalars['String']>;
  verificationToken?: Maybe<Scalars['String']>;
};

export type VerifyEmailPayload = MutationResponse & {
  __typename?: 'VerifyEmailPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};
