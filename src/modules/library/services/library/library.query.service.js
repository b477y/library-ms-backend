import { libraryModel } from "../../../../db/models/Library.model.js";
import * as dbService from "../../../../db/db.service.js";

export const getLibraries = async () => {
  return await dbService.find({
    model: libraryModel,
  });
};
