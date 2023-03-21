import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { validateUserUpdate } from "../validation/user.validate";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const update = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    user.set(update);
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readAllusers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await User.find();
    res.status(200).json({ all });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).send(`User: ${user.username} is deleted.`);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteAllusers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await User.deleteMany();
    res.status(200).send("All users are deleted.");
  } catch (error) {
    res.status(500).json({ error });
  }
};
