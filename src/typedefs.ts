import { loadTypedefs } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import path from 'path';

export const getTypeDefs = async () => {
  const sources = await loadTypedefs(
    path.join(__dirname, './schema/schema.graphql'),
    {
      loaders: [new GraphQLFileLoader()],
    },
  );

  return sources.map((source) => source.document!);
};
