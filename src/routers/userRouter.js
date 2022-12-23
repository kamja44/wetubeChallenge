import express from "express";
import { edit, Remove } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", Remove);

export default userRouter;
