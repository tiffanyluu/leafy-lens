import { Router } from "express";
import {
  registerUser,
  loginUser,
  validateEmail,
  validatePassword,
} from "../controllers/userController";
import validateRequest from "../middleware/validateRequest";
const userRouter = Router();

userRouter.post(
  "/register",
  validateEmail,
  validatePassword,
  validateRequest,
  registerUser
);

userRouter.post(
  "/login",
  validateEmail,
  validatePassword,
  validateRequest,
  loginUser
);

export default userRouter;
