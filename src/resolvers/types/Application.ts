import User from '../../models/User';
import { MongooseApplication } from '../../models/Job';

export default {
  from: async (application: MongooseApplication) => {
    // No batching here so how it's not production application
    const user = await User.findOne({ _id: application.from });

    return user?.getPublicUser();
  },
};
