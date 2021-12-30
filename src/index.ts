import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import dotenv from 'dotenv';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
} from 'apollo-server-core';
import { connectDB } from './db/connect';
import resolvers from './resolvers';
import { getTypeDefs } from './typedefs';

dotenv.config();

async function start() {
  try {
    const app = express();
    app.use(cookieParser(process.env.JWT_SECRET));
    app.use(express.static('./public'));
    app.use(graphqlUploadExpress());

    const httpServer = http.createServer(app);
    const typeDefs = await getTypeDefs();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            'request.credentials': 'include',
          },
        }),
        ApolloServerPluginDrainHttpServer({ httpServer }),
      ],
      context: ({ req, res }) => ({
        req,
        res,
      }),
      // No data sources, so how it's not production application
    });

    await connectDB(process.env.MONGO_URI);

    await server.start();

    server.applyMiddleware({
      app,
      path: '/',
    });

    await new Promise<void>((resolve) =>
      // eslint-disable-next-line no-promise-executor-return
      httpServer.listen({ port: 4000 }, resolve),
    );
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  } catch (err) {
    console.error('Cannot run server', err);
  }
}

start();
