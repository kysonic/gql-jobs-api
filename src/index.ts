import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { connectDB } from './db/connect';
import resolvers from './resolvers';
import { getTypeDefs } from './typedefs';

dotenv.config();

// Apollo server plugins
const plugins = [ApolloServerPluginLandingPageGraphQLPlayground()];

async function start() {
  try {
    const typeDefs = await getTypeDefs();
    const server = new ApolloServer({ typeDefs, resolvers, plugins });

    await connectDB(process.env.MONGO_URI);
    const { url } = await server.listen();
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.error('Cannot run server', err);
  }
}

start();
