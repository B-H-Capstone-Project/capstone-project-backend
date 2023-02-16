import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { getUserById } from '../services/user.service';
import { User } from '../types/user';

const AUTH_ERROR = { message: 'Authentication Error' };

export const SECRET_KEY: Secret = 'u%H^CaEvdqVe0rD^@2Sr3Ep7OMp*lBlH';
//

/**
 * 모든 요청에 대해서 header에 authorization이 있는지,
 * 있다면 우리가 검증할 수 있는 jwt를 가진 요청인지 확인
 * jwt에서 검증이 되었다고 하더라도 디비에 유저가 있는지
 *
 * 로그인 한 유저만 접근 가능하게 하는 함수
 * function that will allow some routers only authorized(signin user only)
 *
 *
 */
export const isAuth = async (req: any, res: Response, next: any) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, async (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }

    const query: any = await getUserById(decoded.id);
    const user: User = query[0];

    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    req.userId = user.id; //add req custom data
    req.token = token;
    next();
  });
};
