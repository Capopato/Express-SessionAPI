import { JwtPayload } from "jsonwebtoken";
import { signJWTAccessToken, verifyJWT } from "./jwt.util";
import User, { userModel } from "../models/user.model";

export const reissueToken = async (refreshToken: string) => {
  const valid = verifyJWT(refreshToken) as JwtPayload;

  if (!valid.decoded) {
    return "";
  }

  const username = valid.decoded.user.username;
  const userObject = await User.find({ username: username });
  const user: userModel = userObject[0];

  if (!user) {
    return "";
  }

  const newAccessToken = signJWTAccessToken(user);
  return newAccessToken;
};
