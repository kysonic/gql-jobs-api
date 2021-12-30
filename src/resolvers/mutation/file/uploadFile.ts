import fs from 'fs';
// eslint-disable-next-line import/no-unresolved
import { finished } from 'stream/promises';

export default async (parent: undefined, { file }: any) => {
  const { createReadStream, filename, mimetype, encoding } = await file;

  const readStream = createReadStream();

  const out = fs.createWriteStream(`./public/uploads/${filename}`);
  readStream.pipe(out);
  await finished(out);

  return { filename, mimetype, encoding };
};
