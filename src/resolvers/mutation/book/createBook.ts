import { MutationCreateBookArgs } from '../../../types/schema';
import Book from '../../../models/Book';

export default async (parent: undefined, { book }: MutationCreateBookArgs) =>
  Book.create(book);
