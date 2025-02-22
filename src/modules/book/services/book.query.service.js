import { Types } from "mongoose";
import * as dbService from "../../../db/db.service.js";
import { bookModel } from "../../../db/models/Book.model.js";
import { borrowedBookModel } from "../../../db/models/BorrowedBook.model.js";

export const getAllBooks = async () => {
  const books = await dbService.find({ model: bookModel });

  return books;
};

export const getBookById = async (parent, args) => {
  const { id } = args;

  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid book ID");
  }

  const book = await dbService.findOne({
    model: bookModel,
    filter: { _id: id },
  });

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

export const getOverdueBooks = async () => {
  const overdueBorrowedBooks = await borrowedBookModel.find();

  const overdueBooks = overdueBorrowedBooks.filter((book) => {
    return (
      new Date(book.dueDate).toISOString() < new Date().toISOString() &&
      (!book.returned || book.returned === false)
    );
  });

  if (overdueBorrowedBooks.length === 0) {
    return [];
  }

  const bookIds = overdueBorrowedBooks.map(
    (borrowedBook) => borrowedBook.bookId
  );

  const books = await dbService.find({
    model: bookModel,
    filter: { _id: { $in: bookIds } },
  });

  return books;
};
