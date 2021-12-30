import fs from 'fs';
// eslint-disable-next-line import/no-unresolved
import { finished } from 'stream/promises';

export default async (parent: undefined, { file }: any) => {
  const { createReadStream, filename, mimetype, encoding } = await file;

  // Invoking the `createReadStream` will return a Readable Stream.
  // See https://nodejs.org/api/stream.html#stream_readable_streams
  const readStream = createReadStream();

  // This is purely for demonstration purposes and will overwrite the
  // local-file-output.txt in the current working directory on EACH upload.
  const out = fs.createWriteStream(`./public/uploads/${filename}`);
  readStream.pipe(out);
  await finished(out);

  return { filename, mimetype, encoding };
};
