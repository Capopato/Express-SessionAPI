import { Request, Response, NextFunction } from "express";
import User, { userModel } from "../models/user.model";
import mongoose from "mongoose";
import { signJWTAccessToken, signJWTRefreshToken } from "../utils/jwt.util";
import config from "../config/config";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = new User({
      id: new mongoose.Types.ObjectId(),
      username,
      password,
    });

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const password = req.body.password;

  const userObject = await User.find({ username: username });
  if (!userObject) {
    return res.status(404).send(`${username} not found`);
  }

  const user: userModel = userObject[0];
  const valid = await user.comparePasswords(password);

  if (!valid) {
    return res.status(403).send("Passwords do not match.");
  }

  const accessToken = signJWTAccessToken(user);
  const refreshToken = signJWTRefreshToken(user);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      expires: config.cookieAccessTokenLT,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      expires: config.cookieRefreshTokenLT,
    })
    .status(200)
    .json({ accessToken, refreshToken });
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers.cookie;

  if (!headers) {
    return res.status(400).send("Headers not found and no session in place.");
  }

  const cookies = headers.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    // The word accessToken/refreshToken is split from the actual token by '='
    const cookie = cookies[i].split("=");
    if (cookie[0].includes("accessToken")) {
      res.clearCookie("accessToken");
    }
    if (cookie[0].includes("refreshToken") || cookie[0].includes("newAccessToken")) {
      res.clearCookie("refreshToken");
      res.clearCookie("newAccessToken");
    }
  }
  res.status(200).send("You are logged out.");
};
