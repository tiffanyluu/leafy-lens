import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  err: Error | unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(err);

  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "An unexpected error occurred." });
};

export default errorHandler;
