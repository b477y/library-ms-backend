import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} from "graphql";
import {
  addBook,
  borrowBook,
  markBookAsAvailable,
} from "./services/book.mutation.service.js";
import {
  bookAvailabilityResponse,
  bookResponse,
  bookType,
} from "./types/book.types.js";
import { borrowResponse } from "./types/book.types.js";
import {
  getAllBooks,
  getBookById,
  getOverdueBooks,
} from "./services/book.query.service.js";
import { bookResponseType } from "./types/book.types.js";

export const query = {
  getAllBooks: {
    type: new GraphQLList(bookResponseType),
    resolve: async () => {
      return await getAllBooks();
    },
  },
  getBookById: {
    type: bookType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      return await getBookById(parent, args);
    },
  },
  getOverdueBooks: {
    type: new GraphQLList(bookType),
    description: "Retrieve books that are overdue and not returned",
    resolve: async () => await getOverdueBooks(), // Calls the function to fetch overdue books
  },
};

export const mutation = {
  addBook: {
    type: bookResponse,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      author: { type: new GraphQLNonNull(GraphQLString) },
      publishedYear: { type: new GraphQLNonNull(GraphQLInt) },
      genre: { type: new GraphQLNonNull(GraphQLString) },
      availableCopies: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (parent, args) => {
      try {
        return await addBook(null, args);
      } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 };
      }
    },
  },
  borrowBook: {
    type: borrowResponse,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      bookId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      try {
        return await borrowBook(null, args);
      } catch (error) {
        return {
          message: error.message,
          statusCode: error.statusCode || 500,
          data: null,
        };
      }
    },
  },
  markBookAsAvailable: {
    type: bookAvailabilityResponse,
    args: {
      bookId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      try {
        return await markBookAsAvailable(null, args);
      } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 };
      }
    },
  },
};
