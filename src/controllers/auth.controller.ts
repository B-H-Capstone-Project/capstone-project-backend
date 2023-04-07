import * as dotenv from 'dotenv';
import { Request, RequestHandler, Response } from 'express';
import { createUser, getUserByEmail, getUserById, newGoogleUser } from '../services/user.service';
import { createReservation } from '../services/reservation.service';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../types/user';
import * as bcrypt from 'bcrypt';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';
dotenv.config();

export const SECRET_KEY: Secret = 'u%H^CaEvdqVe0rD^@2Sr3Ep7OMp*lBlH';
const jwtExpiresInDays = '2d';
const { JWT } = require('google-auth-library');

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
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
  province: string;
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

export const googleSignIn: RequestHandler = async (req: Request, res: Response) => {
  try {
    //use userserver to chcek if a user already exists, if not, create it with default address values and null password
    const email = req.body.email;
    const userValues = [
      email.toLowerCase(),
      req.body.given_name,
      req.body.family_name,
      "N/A",
      "NoPhoneNum",
      "123 ABC Street",
      "123",
      "Calgary",
      "AB",
      "T2E1T3",
      "Canada",
      req.body.picture,
      1,
    ]
    let userServer = <RowDataPacket>(await getUserByEmail(email))[0];
    console.log(userServer);

    if (!userServer) {
      await newGoogleUser(userValues);
      userServer = <RowDataPacket>(await getUserByEmail(email))[0];
    }
    console.log(userServer.id)
    const token = createJwtToken(userServer.id, userServer.role);
    res.status(200).json({
      message: 'Sign in Success',
      token,
    });

  } catch (error) {
    console.error('[auth][googleSignIn][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when sign in user',
    });
  }
};

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (req.body.role == null || undefined) {
      req.body.role = 3
      console.log(req.body.role);

    }
    if (req.body.is_active == null || undefined) {
      req.body.is_active = 1
      console.log(req.body.is_active);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const values = [
      req.body.email.toLowerCase(),
      req.body.first_name,
      req.body.last_name,
      hashedPassword,
      req.body.phone_number,
      req.body.address_line1,
      req.body.address_line2,
      req.body.city,
      req.body.province,
      req.body.postal_code,
      req.body.country,
      req.body.role,
      req.body.is_active
    ];

    console.log(values);

    const userServer = <RowDataPacket>(await getUserByEmail(values[0]))[0];

    if (!userServer) {
      await createUser(values);
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
