import { Request, Response } from "express";
import { registerUserLogic, loginUserLogic } from "../services/userService";
import { body } from "express-validator";

const validateEmail = [
  body("email")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Email must be between 1 and 100 characters.")
    .bail()
    .isEmail()
    .withMessage(`Email format not correct`),
];

const validatePassword = [
  body("password")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Password must be between 5 and 100 characters."),
];

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await registerUserLogic(email, password);
    res.status(201).json({ user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserLogic(email, password);
    res.status(200).json({ user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};

export { registerUser, loginUser, validateEmail, validatePassword };
