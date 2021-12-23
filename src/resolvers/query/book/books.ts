import { QueryBooksArgs } from '../../../types/schema';
import Book from '../../../models/Book';

interface MongooseBookQuery {
  title?: {
    $regex: string;
    $options: string;
  };
}

export default async (
  parent: undefined,
  { title, page = 1, limit = 10, sort }: QueryBooksArgs,
) => {
  const query: MongooseBookQuery = {};

  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  let cursor = Book.find(query);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    cursor = cursor.sort(sortList);
  } else {
    cursor = cursor.sort('createdAt');
  }

  const skip = (page! - 1) * limit!;
  cursor = cursor.skip(skip).limit(limit!);

  return cursor;
};
