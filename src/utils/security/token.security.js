import jwt from "jsonwebtoken";

export const tokenTypes = {
  access: "access",
  refresh: "refresh",
};

const generateToken = ({
  payload = {},
  secretKey = process.env.USER_ACCESS_TOKEN_SK,
  tokenType = tokenTypes.access,
  expiresIn = process.env.EXPIRES_IN,
} = {}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

export const verifyToken = ({ token = "", secretKey = "" } = {}) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};

export const decodeToken = async ({ authorization = "", next = {} } = {}) => {
  if (typeof authorization !== "string") {
    return next(new Error("Invalid authorization format", { cause: 401 }));
  }

  if (!authorization) {
    return next(new Error("Invalid authorization format", { cause: 401 }));
  }

  const access_signature = process.env.USER_ACCESS_TOKEN_SK;
  const refresh_signature = process.env.USER_REFRESH_TOKEN_SK;

  let decoded = verifyToken({
    authorization,
    secretKey:
      tokenType === tokenTypes.access ? access_signature : refresh_signature,
  });

  if (!decoded?.id) {
    return next(new Error("In-valid token payload", { cause: 401 }));
  }

  const user = await dbService.findOne({
    model: userModel,
    filter: { _id: decoded.id, deletedAt: { $exists: false } },
  });

  if (!user) {
    return next(new Error("Not registered account", { cause: 404 }));
  }

  if (user.isDeleted?.getTime() >= decoded.iat * 1000) {
    return next(new Error("In-valid login credentials", { cause: 400 }));
  }

  return user;
};
