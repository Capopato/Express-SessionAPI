import express from "express";
import { deleteAllusers, deleteUser, readAllusers, readUser, updateUser } from "../controllers/user.controller";
import { validateUserUpdate } from "../utils/validate.util";

const userRoutes = express.Router();

userRoutes.put("/update/:userId", validateUserUpdate, updateUser);
userRoutes.get("/read/:userId", readUser);
userRoutes.get("/read-all", readAllusers);
userRoutes.delete("/delete/:userId", deleteUser);
userRoutes.delete("/delete-all", deleteAllusers);

export default userRoutes;
