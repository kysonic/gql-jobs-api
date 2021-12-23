import bookOperations from './book';
import authOperations from './auth';

export default {
  ...bookOperations,
  ...authOperations,
};
