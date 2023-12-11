import { NextFunction, Request, Response } from 'express';
import { servicesCateogoryService } from '../../services/services.-category.service';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const serviceCategoryController = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await servicesCateogoryService;
      return res.customSuccess(200, category);
    } catch (err) {
      const customError = new CustomError(400, 'General', 'Error', err?.message);
      return next(customError);
    }
  },
};
