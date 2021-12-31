import authOperations from './auth';
import jobOperations from './job';
import fileOperations from './file';
import applicationOperations from './application';

export default {
  ...authOperations,
  ...jobOperations,
  ...fileOperations,
  ...applicationOperations,
};
