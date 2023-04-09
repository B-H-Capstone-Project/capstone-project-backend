import * as dotenv from 'dotenv';
import { Request, RequestHandler, Response } from 'express';
import { createUser, getUserByEmail, getUserById, verifySignup } from '../services/user.service';
import { createReservation } from '../services/reservation.service';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { TokenInterface, User } from '../types/user';
import * as bcrypt from 'bcrypt';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';
import { sendEmail } from '../auth/emailVerification';
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
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
};

/* // Google 

export const googleSignin:RequestHandler = async (req: Request, res: Response) => {
  try {
    let token = req.body.token;
    console.log(token);
  
    // Google Auth
    const {OAuth2Client} = require('google-auth-library');
    const CLIENT_ID = process.env.CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
  
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID, 
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      console.log(payload);
    }
  
    verify().then(() => {
  
    }).catch(console.error);
  } catch (error) {

  }
} */

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

    if (!userServer.is_verified) {
      return res.status(401).json({ message: 'Not verified account' });
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
    if (req.body.role == null || undefined) {
      req.body.role = 3;
    }
    if (req.body.is_active == null || undefined) {
      req.body.is_active = 1;
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
      req.body.is_active,
    ];

    const userServer = <RowDataPacket>(await getUserByEmail(values[0]))[0];

    const verifyEmailToken = jwt.sign({ id: req.body.email.toLowerCase() }, SECRET_KEY, { expiresIn: '30m' });

    const url = `${process.env.BASE_URL}/auth/verify/${verifyEmailToken}`;
    await sendEmail(
      req.body.email.toLowerCase(),
      'Please verify your email for Boss and Hoss',
      `Please click this email to confirm your email: <a href="${url}">${url}</a>`
    );

    if (!userServer) {
      await createUser(values);
    } else {
      return res.status(401).json({ message: 'There is already a user with that email' });
    }

    res.status(200).json({
      message: 'Email has sent ',
    });
  } catch (error) {
    console.error('[auth][signup][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error while creating account',
    });
  }
};

export const verifyUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    jwt.verify(req.params.token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired.' });
        } else {
          return res.status(401).json({ message: 'Invalid token.' });
        }
      } else if (decoded) {
        const { id } = decoded as TokenInterface;
        await verifySignup(id);
      } else {
        console.log('invalid token');
      }
    });

    res.redirect('http://localhost:3000/signin');
  } catch (error) {
    console.error('[auth][verifyUser][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error while verify User with token',
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
