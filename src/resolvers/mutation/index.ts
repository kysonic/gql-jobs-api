import authOperations from './auth';
import jobOperations from './job';

export default {
  ...authOperations,
  ...jobOperations,
};
