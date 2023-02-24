import * as dotenv from 'dotenv';
import { Request, RequestHandler, Response } from 'express';
import { getUserByEmail, getUserById } from '../services/user.service';
import { createAccount } from '../controllers/user.controller';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../types/user';
import * as bcrypt from 'bcrypt';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';
dotenv.config();

export const SECRET_KEY: Secret = 'u%H^CaEvdqVe0rD^@2Sr3Ep7OMp*lBlH';
const jwtExpiresInDays = '2d';

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

  try {
    const { email, password }: signinUser = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email or Password not present',
      });
    }

    const userServer = <RowDataPacket>(await getUserByEmail(email))[0];
    if (!userServer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    bcrypt.compare(password, userServer.password).then((result) => {
      if (result) {
        const token = createJwtToken(userServer.id, userServer.role);
        res.status(200).json({
          message: 'Sign in Success',
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    });
  } catch (error) {
    console.error('[auth][signin][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when sign in user',
    });
  }
};

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  try {
    let addressId: string = Date.now().toString();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const values = [
      req.body.email,
      hashedPassword,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      addressId,
    ];

    const addValues = [
      addressId,
      req.body.unit_number,
      req.body.address_line,
      req.body.postal_code,
      req.body.city,
      req.body.province,
      req.body.country,
    ];

    const userServer = <RowDataPacket>(await getUserByEmail(values[0]))[0];

    if (!userServer) {
      await createAccount(values, addValues);
    } else {
      return res.status(401).json({ message: 'There is already a user with that email' });
    }
    res.status(200).json({
      message: 'Account Created',
    });
  } catch (error) {
    console.error('[auth][signup][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error while creating account',
    });
  }
};

export const createJwtToken: any = (id: string, role: number) => {
  return jwt.sign({ id, role }, SECRET_KEY, { expiresIn: jwtExpiresInDays });
};

export const me: RequestHandler = async (req: any, res: Response) => {
  const query: any = await getUserById(req.userId);
  const user: User = query[0];
  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }
  res.status(200).json({
    token: req.token,
    id: user.id,
  });
};
