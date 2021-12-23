declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      MAILGUN_APIKEY: string;
      MAILGUN_DOMAIN: string;
    }
  }
}

declare module '*.graphql' {
  import graphql = require('graphql');

  const Schema: graphql.DocumentNode;

  export = Schema;
}

export {};
