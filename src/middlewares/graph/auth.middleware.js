import * as dbService from "../../db/db.service.js";
import { userModel } from "../../db/models/User.model.js";
import {
  verifyToken,
  tokenTypes,
} from "../../utils/security/token.security.js";

export const authentication = async ({
  authorization = "",
  tokenType = tokenTypes.access,
} = {}) => {
  if (typeof authorization !== "string") {
    throw new Error("Invalid authorization format", { cause: 401 });
  }

  if (!authorization) {
    throw new Error("Invalid authorization format", { cause: 401 });
  }
  const access_signature = process.env.USER_ACCESS_TOKEN_SK;
  const refresh_signature = process.env.USER_REFRESH_TOKEN_SK;

  let decoded = verifyToken({
    authorization,
    secretKey:
      tokenType === tokenTypes.access ? access_signature : refresh_signature,
  });

  if (!decoded?.id) {
    throw new Error("In-valid token payload", { cause: 401 });
  }

  const user = await dbService.findOne({
    model: userModel,
    filter: { _id: decoded.id, deletedAt: { $exists: false } },
  });

  if (!user) {
    throw new Error("Not registered account", { cause: 404 });
  }

  if (user.isDeleted.getTime() >= decoded.iat * 1000) {
    throw new Error("In-valid login credentials", { cause: 400 });
  }

  return user;
};
