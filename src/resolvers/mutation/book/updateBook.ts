import { MutationUpdateBookArgs } from '../../../types/schema';
import Book from '../../../models/Book';

export default async (
  parent: undefined,
  { id, book }: MutationUpdateBookArgs,
) =>
  Book.findByIdAndUpdate({ _id: id }, book, { new: true, runValidators: true });
