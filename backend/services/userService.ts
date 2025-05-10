import User from "../models/User";
import bcrypt from "bcryptjs";

const registerUser = async (email: string, password: string) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  return newUser;
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return user;
};

export { registerUser, loginUser };
