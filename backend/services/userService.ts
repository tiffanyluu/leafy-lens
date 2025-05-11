import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ _id }, secret, { expiresIn: "1d" });
};

const registerUserLogic = async (email: string, password: string) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });
  const token = createToken(newUser._id.toString());
  return {
    email: newUser.email,
    token,
  };
};

const loginUserLogic = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = createToken(user._id.toString());

  return {
    email: user.email,
    token,
  };
};

export { registerUserLogic, loginUserLogic };
