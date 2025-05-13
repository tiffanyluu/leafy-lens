import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

declare module "express" {
  interface Request {
    userId?: string;
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

    if (typeof decoded === "object" && "_id" in decoded) {
      req.userId = (decoded as JwtPayload)._id as string;
      next();
    } else {
      res.status(401).json({ error: "Invalid token payload" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

export default verifyToken;
