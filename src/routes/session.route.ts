import express from "express";
import { login, logout, signUp } from "../controllers/session.controller";
import { validateUser } from "../utils/validate.util";

const sessionRoutes = express.Router();

sessionRoutes.post("/signUp", validateUser, signUp);
sessionRoutes.post("/login", login);
sessionRoutes.post("/logout", logout);

export default sessionRoutes;
