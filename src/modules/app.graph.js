import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import * as authGraphController from "./auth/auth.graph.controller.js";
import * as bookGraphController from "./book/book.graph.controller.js";
import * as userGraphController from "./user/user.graph.controller.js";
import * as libraryGraphController from "./library/library.graph.controller.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Root query type",
    fields: {
      healthCheck: {
        type: GraphQLString,
        resolve: () => "GraphQL Server is running!",
      },
      ...bookGraphController.query,
      ...libraryGraphController.query,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "LibraryMutation",
    description: "Main application mutation",
    fields: {
      ...authGraphController.mutation,
      ...bookGraphController.mutation,
      ...userGraphController.mutation,
    },
  }),
});
