import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";

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

export const login = (req: Request, res: Response, next: NextFunction) => {};

export const logout = (req: Request, res: Response, next: NextFunction) => {};
