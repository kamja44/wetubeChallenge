import express from "express";
import { edit, Remove, logout, see } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", Remove);
userRouter.get(":id", see);

export default userRouter;
