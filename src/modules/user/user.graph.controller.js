import { GraphQLNonNull, GraphQLID } from "graphql";
import { deleteUser } from "./services/user.mutation.service.js";
import { deleteUserResponse } from "./types/user.types.js";

export const mutation = {
  deleteUser: {
    type: deleteUserResponse,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (parent, args) => {
      try {
        return await deleteUser(null, args);
      } catch (error) {
        return { message: error.message, statusCode: error.statusCode || 500 };
      }
    },
  },
};
