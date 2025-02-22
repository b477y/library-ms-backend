import * as dbService from "../../../db/db.service.js";
import { userModel } from "../../../db/models/User.model.js";

export const deleteUser = async (parent, args) => {
  const { userId } = args;

  const user = await dbService.findOne({
    model: userModel,
    filter: { _id: userId, deletedAt: { $exists: false } },
  });

  if (!user) {
    return { message: "User not found or already deleted", statusCode: 404 };
  }

  await dbService.updateOne({
    model: userModel,
    filter: { _id: userId },
    data: { deletedAt: new Date() },
  });

  return {
    message: "User soft deleted successfully",
    statusCode: 200,
  };
};
