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

export type Book = {
  __typename?: 'Book';
  _id?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type BookInput = {
  author: Scalars['String'];
  title: Scalars['String'];
};

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
  createBook: Book;
  deleteBook: Scalars['String'];
  login: LoginPayload;
  logout: LogoutPayload;
  signup: SignupPayload;
  updateBook: Book;
  verifyEmail: VerifyEmailPayload;
};


export type MutationCreateBookArgs = {
  book: BookInput;
};


export type MutationDeleteBookArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  data: UserProfileInput;
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateBookArgs = {
  book: BookInput;
  id: Scalars['String'];
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
  books?: Maybe<Array<Maybe<Book>>>;
  fullUser?: Maybe<User>;
  myUser: PublicUser;
};


export type QueryBooksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SignupPayload = MutationResponse & {
  __typename?: 'SignupPayload';
  code: Scalars['String'];
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
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type UserProfileInput = {
  birthDate?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UserSystem = {
  __typename?: 'UserSystem';
  isEmailApproved: Scalars['Boolean'];
  verificationToken?: Maybe<Scalars['String']>;
};

export type VerifyEmailPayload = MutationResponse & {
  __typename?: 'VerifyEmailPayload';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};
