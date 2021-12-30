import fs from 'fs';
import fsp from 'fs/promises';
import { FileUpload } from 'graphql-upload';
// eslint-disable-next-line import/no-unresolved
import { finished } from 'stream/promises';
import { Context } from '../../../types/shared';
import { Counter } from '../../../utils/streams';
import checkAuthorization from '../../../middlewares/checkAuthorization';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default async (
  parent: undefined,
  { file }: { file: FileUpload },
  { req, res }: Context,
) => {
  const user = await checkAuthorization(req, res);
  const { createReadStream, filename, mimetype, encoding } = await file;

  const counter = new Counter(MAX_FILE_SIZE);
  const readStream = createReadStream();

  const folder = `./public/uploads/${user._id}`;
  await fsp.mkdir(folder, { recursive: true });
  const path = `uploads/${user._id}/${filename}`;
  const out = fs.createWriteStream(`./public/${path}`);
  readStream.pipe(counter).pipe(out);

  await finished(counter); // Without it the error would be handled by node
  await finished(out);

  return {
    code: '200',
    success: true,
    message: 'File uploaded successfully!',
    file: { filename, mimetype, encoding, path },
  };
};
