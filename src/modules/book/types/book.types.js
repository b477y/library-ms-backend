import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} from "graphql";

export const bookResponse = new GraphQLObjectType({
  name: "BookResponseMutation",
  fields: () => ({
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: {
      type: new GraphQLObjectType({
        name: "BookData",
        fields: () => ({
          id: { type: GraphQLID },
          title: { type: GraphQLString },
          author: { type: GraphQLID },
          publishedYear: { type: GraphQLInt },
          genre: { type: GraphQLString },
          availableCopies: { type: GraphQLInt },
          message: { type: GraphQLString },
          statusCode: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

export const borrowResponse = new GraphQLObjectType({
  name: "BorrowResponse",
  fields: () => ({
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: {
      type: new GraphQLObjectType({
        name: "BorrowedBook",
        fields: () => ({
          id: { type: GraphQLID },
          userId: { type: GraphQLID },
          bookId: { type: GraphQLID },
          borrowedAt: { type: GraphQLString },
          dueDate: { type: GraphQLString },
          returned: { type: GraphQLBoolean },
        }),
      }),
    },
  }),
});

export const bookAvailabilityResponse = new GraphQLObjectType({
  name: "BookAvailabilityResponse",
  fields: () => ({
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: {
      type: new GraphQLObjectType({
        name: "BookAvailabilityData",
        fields: () => ({
          bookId: { type: GraphQLID },
          availableCopies: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

export const bookResponseType = new GraphQLObjectType({
  name: "BookResponseQuery",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    publishedYear: { type: GraphQLInt },
    genre: { type: GraphQLString },
    availableCopies: { type: GraphQLInt },
  }),
});

export const bookType = new GraphQLObjectType({
  name: "Book",
  description: "Represents a book in the library",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    publishedYear: { type: GraphQLInt },
    genre: { type: GraphQLString },
    availableCopies: { type: GraphQLInt },
  }),
});