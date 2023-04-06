import { Request, RequestHandler, Response } from 'express';
import {
  getUser,
  getUserById,
  getUserEmployee,
  getUserCustomer,
  deleteUser,
  createUser,
  updateUser,
  getUserByEmail,
  updatePassword,
} from '../services/user.service';
import RowDataPacket from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';
import { TokenInterface, User } from '../types/user';
import * as bcrypt from 'bcrypt';
import { sendEmail } from '../auth/emailVerification';
import { SECRET_KEY } from './auth.controller';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUser();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const getUsersById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const user = <RowDataPacket>(await getUserById(userId))[0];

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const getUsersEmployee: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUserEmployee();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const getUsersCustomer: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUserCustomer();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};
export const deleteUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const user = await deleteUser(userId);

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const updateUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const values = [
      hashedPassword,
      req.body.first_name,
      req.body.last_name,
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

    const update = await updateUser(values, userId);

    //used to see if user was updated.
    const userUpdated = await getUserById(values[0]);
    res.status(200).json({
      update,
      userUpdated,
    });
  } catch (error) {
    console.error('[teams.controller][getTeams][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching teams',
    });
  }
};

export const requestResetPassword: RequestHandler = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const user = <RowDataPacket>(await getUserByEmail(email))[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const resetPwdToken = jwt.sign({ id: email }, SECRET_KEY, { expiresIn: '30m' });

    const url = `http://localhost:3000/reset-password/${resetPwdToken}`;

    await sendEmail(
      user.email,
      'Boss and Hoss: Reset your password',
      `Please click this email to Reset your email: <a href="${url}">${url}</a>`
    );

    res.status(200).json({
      message: 'Reset email has sent ',
    });
  } catch (error) {
    console.error(
      '[user.controller][requestResetPassword][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when ask email for resetting password',
    });
  }
};

export const resetPassword: RequestHandler = async (req: Request, res: Response, next) => {
  try {
    const newPwd = req.body.password;
    jwt.verify(req.params.token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired.' });
        } else {
          return res.status(401).json({ message: 'Invalid token.' });
        }
      } else if (decoded) {
        const { id } = decoded as TokenInterface;
        await updatePassword(newPwd, id);
        res.status(200).json({
          message: 'Reset Password Success',
        });
      } else {
        res.redirect('http://localhost:3000/forgot-password');
      }
    });
  } catch (error) {
    console.error(
      '[user.controller][resetPassword][Error] ',
      typeof error === 'object' ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: 'There was an error when reset password',
    });
  }
};
