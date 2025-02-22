import { GraphQLNonNull, GraphQLString } from "graphql";
import { signUp, login } from "./services/auth.mutation.service.js";
import { registerResponse, loginResponse } from "./types/auth.types.js";

export const mutation = {
  register: {
    type: registerResponse,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      try {
        return await signUp(null, args);
      } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 };
      }
    },
  },

  login: {
    type: loginResponse,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args) => {
      try {
        return await login(null, args);
      } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 };
      }
    },
  },
};
