import * as dotenv from "dotenv";
import { Request, RequestHandler, Response } from "express";
import { getUserByEmail } from "../services/user.service";
import jwt, { Secret } from "jsonwebtoken";
dotenv.config();

// const secret: Secret = process.env.KEY;
// const jwtExpiresInDays = "2d";

type signinUser = {
  email: string;
  password: string;
};

export const signin: RequestHandler = async (req: Request, res: Response) => {
  //
  try {
    const { email, password }: signinUser = req.body;
    const query: any = await getUserByEmail(email);
    const userServer = query[0];
    if (!userServer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (password !== userServer.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Signin Success",
      email,
    });
    // const token = createJwtToken(email);
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

/* export const createJwtToken: string = (email: string) => {
  return jwt.sign({ email }, secret, { expiresIn: jwtExpiresInDays });
}; */
