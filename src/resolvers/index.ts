import { GraphQLUpload } from 'graphql-upload';
import Query from './query';
import Mutation from './mutation';
import Job from './types/Job';
import Application from './types/Application';

export default {
  Query,
  Mutation,
  Job,
  Application,
  Upload: GraphQLUpload,
};
