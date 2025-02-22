import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { bookType } from "../../book/types/book.types.js";
import { bookModel } from "../../../db/models/Book.model.js";
import * as dbService from "../../../db/db.service.js";

export const libraryType = new GraphQLObjectType({
  name: "Library",
  description: "Represents a library",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (library) => library._id.toString(),
    },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    books: {
      type: new GraphQLList(bookType),
      resolve: async (library) => {
        return await dbService.find({
          model: bookModel,
          filter: { _id: { $in: library.books } },
        });
      },
    },
  }),
});
