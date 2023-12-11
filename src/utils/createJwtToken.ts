import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { TJwtPayload } from '../types/JwtPayload';

export const createJwtToken = (payload: TJwtPayload): string => {
  return jwt.sign(payload, payload.secret ?? process.env.JWT_SECRET!, {
    expiresIn: payload.expiresAt ?? process.env.JWT_EXPIRATION,
  });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };
};
