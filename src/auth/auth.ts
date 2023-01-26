// import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request, RequestHandler, Response } from "express";
import { getUserById } from "../services/user.service";
dotenv.config();

const secret = process.env.KEY;

type signinUser = {
  email: string;
  password: string;
};

export const signin: RequestHandler = async (req: Request, res: Response) => {
  //
  try {
    const { email, password }: signinUser = req.body;

    const userServer = await getUserById(email);

    if (email === userServer.email && password === userServer.password) {
      res.status(200).json({
        email,
        password,
      });
    }
  } catch (error) {
    console.error(
      "[auth][signin][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when signin user",
    });
  }
};
