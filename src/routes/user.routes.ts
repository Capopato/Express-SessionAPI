import express from "express";
import { deleteAllusers, deleteUser, readAllusers, readUser, updateUser } from "../controllers/user.controller";
import { validateUserUpdate } from "../validation/user.validate";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

const userRoutes = express.Router();

userRoutes.put("/update/:userId", deserializeUser, validateUserUpdate, updateUser);
userRoutes.get("/read/:userId", deserializeUser, readUser);
userRoutes.get("/read-all", deserializeUser, readAllusers);
userRoutes.delete("/delete/:userId", deserializeUser, deleteUser);
userRoutes.delete("/delete-all", deserializeUser, deleteAllusers);

export default userRoutes;
