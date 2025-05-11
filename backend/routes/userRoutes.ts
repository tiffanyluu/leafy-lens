import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
