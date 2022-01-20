import fs from 'fs/promises';
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

export const saveTypeDefsToFile = async () => {
  const typeDefs = await getTypeDefs();
  await fs.writeFile('./src/typedefs.json', JSON.stringify(typeDefs));
  console.log('Typedefs rebuilt');
};

saveTypeDefsToFile();
