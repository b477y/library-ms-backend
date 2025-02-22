import * as dbService from "../../../db/db.service.js";
import { bookModel } from "../../../db/models/Book.model.js";
import { borrowedBookModel } from "../../../db/models/BorrowedBook.model.js";

export const addBook = async (parent, args) => {
  const { title, author, publishedYear, genre, availableCopies } = args;

  const newBook = await dbService.create({
    model: bookModel,
    data: { title, author, publishedYear, genre, availableCopies },
  });

  return {
    message: "Book added successfully",
    statusCode: 201,
    data: newBook,
  };
};

export const borrowBook = async (parent, args) => {
  const { userId, bookId } = args;

  const book = await dbService.findOne({
    model: bookModel,
    filter: { _id: bookId },
  });

  if (!book) {
    return { message: "Book not found", statusCode: 404, data: null };
  }

  if (book.availableCopies <= 0) {
    return { message: "No copies available", statusCode: 400, data: null };
  }

  const borrowedAt = new Date();
  const dueDate = new Date();
  dueDate.setDate(borrowedAt.getDate() + 2);

  const borrowedBook = await dbService.create({
    model: borrowedBookModel,
    data: { userId, bookId, borrowedAt, dueDate, returned: false },
  });

  await dbService.findByIdAndUpdate({
    model: bookModel,
    id: bookId,
    data: { availableCopies: book.availableCopies - 1 },
  });

  return {
    message: "Book borrowed successfully",
    statusCode: 201,
    data: borrowedBook,
  };
};

export const markBookAsAvailable = async (parent, args) => {
  const { bookId } = args;

  const book = await dbService.findOne({
    model: bookModel,
    filter: { _id: bookId },
  });

  if (!book) {
    return { message: "Book not found", statusCode: 404 };
  }

  const borrowedRecord = await dbService.findOne({
    model: borrowedBookModel,
    filter: { bookId, returned: false },
  });

  if (!borrowedRecord) {
    return { message: "No active borrow record found", statusCode: 400 };
  }

  await dbService.updateOne({
    model: borrowedBookModel,
    filter: { bookId, returned: false },
    data: { returned: true },
  });

  await dbService.updateOne({
    model: bookModel,
    filter: { _id: bookId },
    data: { availableCopies: book.availableCopies + 1 },
  });

  return {
    message: "Book marked as available successfully",
    statusCode: 200,
    data: { bookId, availableCopies: book.availableCopies + 1 },
  };
};