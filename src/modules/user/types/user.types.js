import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

export const deleteUserResponse = new GraphQLObjectType({
  name: "DeleteUserResponse",
  fields: () => ({
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
  }),
});
