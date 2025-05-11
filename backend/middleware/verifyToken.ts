import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend Express Request interface to include user property
declare module "express" {
  interface Request {
    user?: jwt.JwtPayload | string;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const jwtToken = token.split(" ")[1];
    if (!jwtToken) {
      res.status(401).json({ error: "Access denied" });
      return;
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

export default verifyToken;
