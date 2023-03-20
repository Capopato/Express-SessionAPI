import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateUserSchema.parse(req.body);
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(500).json(error.issues);
    }
  }
};

export const validateUserUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    validateUserUpdateSchema.parse(req.body);
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(500).json(error.issues);
    }
  }
};

const validateUserSchema = z
  .object({
    username: z.string().min(3).max(25),
    password: z.string().min(3).max(25),
    passwordCheck: z.string().min(3).max(25),
  })
  .refine((data) => data.password == data.passwordCheck, {
    message: "Passwords don't match",
    path: ["passwordCheck"],
  });

const validateUserUpdateSchema = z.object({
  username: z.string().min(3).max(25),
});

export type validateUserSchema = z.infer<typeof validateUserSchema>;
export type validateUserUpdateSchema = z.infer<typeof validateUserUpdateSchema>;
