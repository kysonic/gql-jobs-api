import authOperations from './auth';
import jobOperations from './job';
import fileOperations from './file';

export default {
  ...authOperations,
  ...jobOperations,
  ...fileOperations,
};
