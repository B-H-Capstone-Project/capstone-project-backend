import * as dotenv from "dotenv";
import { Request, RequestHandler, Response } from "express";
import { getUserByEmail } from "../services/user.service";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/user";
dotenv.config();

export const SECRET_KEY: Secret = "u%H^CaEvdqVe0rD^@2Sr3Ep7OMp*lBlH";
const jwtExpiresInDays = "2d";

type signinUser = {
  email: string;
  password: string;
};

export const signin: RequestHandler = async (req: Request, res: Response) => {
  //
  try {
    const { email, password }: signinUser = req.body;
    const query: any = await getUserByEmail(email);
    const userServer: User = query[0];
    if (!userServer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (password !== userServer.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = createJwtToken(email);
    res.status(200).json({
      message: "Signin Success",
      token,
      email,
    });
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

export const createJwtToken: any = (email: string) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: jwtExpiresInDays });
};
