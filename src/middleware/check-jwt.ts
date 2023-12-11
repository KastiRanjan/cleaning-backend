import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { TJwtPayload } from '../types/JwtPayload';
import { CustomError } from '../utils/response/custom-error/CustomError';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new CustomError(401, 'General', 'Authorization header not provided', 'Unauthorized');
    return next(customError);
  }

  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };

    req.jwtPayload = jwtPayload as TJwtPayload;
    req.authToken = token;
    return next();
  } catch (err) {
    console.log(err);
    const customError = new CustomError(401, 'Raw', 'JWT error', err.message, err);
    return next(customError);
  }
};
