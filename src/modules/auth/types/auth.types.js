import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

export const registerResponse = new GraphQLObjectType({
  name: "RegisterResponse",
  fields: {
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: {
      type: new GraphQLObjectType({
        name: "UserData",
        fields: {
          id: { type: GraphQLString },
          name: { type: GraphQLString },
          email: { type: GraphQLString },
        },
      }),
    },
  },
});

export const loginResponse = new GraphQLObjectType({
  name: "LoginResponse",
  fields: () => ({
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
    data: {
      type: new GraphQLObjectType({
        name: "LoginData",
        fields: () => ({
          token: { type: GraphQLString },
        }),
      }),
    },
  }),
});
