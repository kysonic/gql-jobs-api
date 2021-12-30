import { GraphQLUpload } from 'graphql-upload';
import Query from './query';
import Mutation from './mutation';
import Job from './types/Job';

export default {
  Query,
  Mutation,
  Job,
  Upload: GraphQLUpload,
};
