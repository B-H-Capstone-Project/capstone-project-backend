import * as dotenv from "dotenv";
import { Request, RequestHandler, Response } from "express";
import { createUser, getUserByEmail } from "../services/user.service";
import { createAddress } from "../services/address.service";
import {createUsers} from "../controllers/user.controller";
import jwt, { Secret } from "jsonwebtoken";
import { createSemicolonClassElement, idText } from "typescript";
import { User } from "../types/user";
dotenv.config();

export const SECRET_KEY: Secret = "u%H^CaEvdqVe0rD^@2Sr3Ep7OMp*lBlH";
const jwtExpiresInDays = "2d";

type signinUser = {
  email: string;
  password: string;
};

type signUpUser = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  password: string;
  confirm_password: string;
  address_line: string;
  unit_number: number;
  postal_code: string;
  city: string;
  province: string; //not on signup form yet
  country: string;
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
      message: "Sign in Success",
      email,
    });
  } catch (error) {
    console.error(
      "[auth][signin][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when sign in user",
    });
  }
};

/* export const createJwtToken: string = (email: string) => {
  return jwt.sign({ email }, secret, { expiresIn: jwtExpiresInDays });
}; */

export const signUp: RequestHandler = async(req: Request, res: Response) => {
  try {
    let addressId:string = Date.now().toString();
  

    const values = [
      req.body.email,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      addressId,
    ]

    const addValues = [
      addressId,
      req.body.unit_number,
      req.body.address_line,
      req.body.postal_code,
      req.body.city,
      req.body.province,
      req.body.country,    
    ]
    
    const query: any= await getUserByEmail(values[0]);
    const userServer: User = query[0];
    
    if(!userServer){
      await createUsers(values, addValues);
    } else {
    return res.status(401).json({ message: "There is already a user with that email" });      

  }
    res.status(200).json({
      message: "Account Created",
    });
    // const token = createJwtToken(email);
  } catch (error) {
    console.error(
      "[auth][signup][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error while creating account",
    });
  }
};

export const createJwtToken: any = (email: string) => {
  return jwt.sign({ email }, SECRET_KEY, {expiresIn: jwtExpiresInDays });
};