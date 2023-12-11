import { NextFunction, Request, Response } from 'express';
import { authService } from '../../services/auth.service';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const serviceController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await authService.login(req);
      return res.customSuccess(200, token);
    } catch (err) {
      console.log(err);
      const customError = new CustomError(400, 'General', 'Error', err?.message);
      return next(customError);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await authService.login(req);
      return res.customSuccess(200, token);
    } catch (err) {
      console.log(err);
      const customError = new CustomError(400, 'General', 'Error', err?.message);
      return next(customError);
    }
  },
};
