import { Request, Response } from "express";
import { registerUserLogic, loginUserLogic } from "../services/userService";

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

export { registerUser, loginUser };
