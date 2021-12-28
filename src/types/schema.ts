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
};

export enum BenefitEnum {
  Coffee = 'COFFEE',
  FreeParking = 'FREE_PARKING',
  GiftCards = 'GIFT_CARDS',
  Gym = 'GYM',
  MedicalInsurance = 'MEDICAL_INSURANCE'
}

export type ForgotPasswordPayload = MutationResponse & {
  __typename?: 'ForgotPasswordPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Job = {
  __typename?: 'Job';
  _id: Scalars['ID'];
  author: User;
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
  createJob: Job;
  forgotPassword: ForgotPasswordPayload;
  login: LoginPayload;
  logout: LogoutPayload;
  resetPassword: ResetPasswordPayload;
  signup: SignupPayload;
  verifyEmail: VerifyEmailPayload;
};


export type MutationCreateJobArgs = {
  job: JobInput;
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
  getAllJobs: Array<Job>;
  myUser: PublicUser;
};


export type QueryGetAllJobsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
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
