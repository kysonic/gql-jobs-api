import fsp from 'fs/promises';
import { UserInputError } from 'apollo-server-core';
import { MutationDeleteFileArgs } from '../../../types/schema';
import { Context } from '../../../types/shared';
import checkAuthorization from '../../../middlewares/checkAuthorization';

export default async (
  parent: undefined,
  { filePath }: MutationDeleteFileArgs,
  { req, res }: Context,
) => {
  const user = await checkAuthorization(req, res);

  if (!filePath.includes(user._id)) {
    throw new UserInputError('This is not your file man...');
  }

  await fsp.unlink(`./public/${filePath}`);

  return {
    code: '200',
    success: true,
    message: 'File deleted successfully!',
  };
};
