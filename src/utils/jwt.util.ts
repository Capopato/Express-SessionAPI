import jwt from "jsonwebtoken";
import config from "../config/config";
import { userModel } from "../models/user.model";

export const signJWTAccessToken = (user: userModel) => {
  // Payload needs to be an object otherwise it's treated as a string
  return jwt.sign({ user }, config.privateKey, {
    expiresIn: config.accessTokenLT,
    algorithm: "RS256",
  });
};

export const signJWTRefreshToken = (user: userModel) => {
  // Payload needs to be an object otherwise it's treated as a string
  return jwt.sign({ user }, config.privateKey, {
    expiresIn: config.refreshTokenLT,
    algorithm: "RS256",
  });
};

export const verifyJWT = (token: string) => {
  try {
    const valid = jwt.verify(token, config.publicKey);
    return {
      valid: true,
      expired: false,
      decoded: valid,
    };
  } catch (error) {
    console.log(error);
    return {
      valid: false,
      expired: true,
      decoded: null,
    };
  }
};
