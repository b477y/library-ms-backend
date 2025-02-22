import {
  compareHash,
  generateHash,
} from "../../../utils/security/hash.security.js";
import { encrypt } from "../../../utils/security/crypto.security.js";
import * as dbService from "../../../db/db.service.js";
import { userModel } from "../../../db/models/User.model.js";
import {
  generateToken,
  tokenTypes,
} from "../../../utils/security/token.security.js";

export const signUp = async (parent, args) => {
  const { name, email, password, phone } = args;

  const existingUser = await dbService.findOne({
    model: userModel,
    filter: { email },
  });

  if (existingUser) {
    return { message: "Email already exists", statusCode: 400 };
  }

  const hashedPassword = generateHash({ plaintext: password });

  const encryptedPhone = encrypt({ plainText: phone });

  const newUser = await dbService.create({
    model: userModel,
    data: { name, email, password: hashedPassword, phone: encryptedPhone },
  });

  return {
    message: "User registered successfully",
    statusCode: 201,
    data: newUser,
  };
};

export const login = async (parent, args) => {
  const { email, password } = args;

  const existingUser = await dbService.findOne({
    model: userModel,
    filter: { email },
  });

  if (!existingUser || existingUser.deletedAt) {
    return { message: "User not found", statusCode: 404 };
  }

  const isPasswordValid = compareHash({
    plaintext: password,
    encryptedText: existingUser.password,
  });

  if (!isPasswordValid) {
    return { message: "Invalid credentials", statusCode: 401 };
  }

  const token = generateToken({
    payload: { id: existingUser._id, email: existingUser.email },
    secretKey: process.env.USER_ACCESS_TOKEN_SK,
    tokenType: tokenTypes.access,
    expiresIn: "7d",
  });

  return {
    message: "User logged in successfully",
    statusCode: 200,
    data: {
      token,
    },
  };
};
