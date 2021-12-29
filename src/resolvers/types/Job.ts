import User from '../../models/User';
import { Job } from '../../types/schema';

export default {
  author: async (job: Job) => {
    // No batching here so how it's not production application
    const user = await User.findOne(job.author);

    return user?.getPublicUser();
  },
};
