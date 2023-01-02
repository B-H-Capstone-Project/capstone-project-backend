import { Request, Response } from "express";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: any
) => {
  console.log(err);
  res.status(500).json({ msg: "there was an error" });
};

export default errorHandlerMiddleware;
