import User from '../../models/User';
import { Application } from '../../types/schema';

export default {
  from: async (application: Application) => {
    // No batching here so how it's not production application
    const user = await User.findOne(application.from as any);

    return user?.getPublicUser();
  },
};
