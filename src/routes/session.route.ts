import express from "express";
import { login, logout, signUp } from "../controllers/session.controller";
import { validateUser } from "../validation/user.validate";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

const sessionRoutes = express.Router();

sessionRoutes.post("/signUp", validateUser, signUp);
sessionRoutes.post("/login", login);
sessionRoutes.get("/logout", deserializeUser, logout);

export default sessionRoutes;
