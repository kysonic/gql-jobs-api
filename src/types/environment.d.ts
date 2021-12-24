import { PublicUser } from './schema';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      MAILGUN_APIKEY: string;
      MAILGUN_DOMAIN: string;
      REFRESH_TOKEN_TTL: number;
      ACCESS_TOKEN_TTL: number;
      JWT_SECRET: string;
      PASSWORD_SALT: string;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user: PublicUser;
    }
  }
}

declare global {
  interface JwtPayload {
    user: PublicUser;
  }
}
declare module '*.graphql' {
  import graphql = require('graphql');

  const Schema: graphql.DocumentNode;

  export = Schema;
}

export {};
