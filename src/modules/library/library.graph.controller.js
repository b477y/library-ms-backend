import { GraphQLList } from "graphql";
import { libraryType } from "./types/library.types.js";
import { getLibraries } from "./services/library/library.query.service.js";

export const query = {
  getLibraries: {
    type: new GraphQLList(libraryType),
    resolve: async () => {
      return await getLibraries();
    },
  },
};
