import { MutationDeleteBookArgs } from '../../../types/schema';
import Book from '../../../models/Book';

export default async (parent: undefined, { id }: MutationDeleteBookArgs) => {
  await Book.findByIdAndDelete(id);
  return 'ok';
};
