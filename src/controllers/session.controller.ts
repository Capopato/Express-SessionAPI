import { Request, Response, NextFunction } from "express";
import User, { userModel } from "../models/user.model";
import mongoose from "mongoose";
import { signJWT } from "../utils/jwt.util";
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

  const accessToken = signJWT(user);
  const refreshToken = signJWT(user);

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
    return res.status(400).send("Headers not found.");
  } else {
  }

  /**
   * router.get('/logout', function (req, res) {
  req.logOut();
  res.status(200).clearCookie('connect.sid', {
    path: '/'
  });
   */
  next();
};
