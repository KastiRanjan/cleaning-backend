import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { CustomError } from '../utils/response/custom-error/CustomError';

const validation = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    // const customErrors = error.errors.map((validationError) => ({
    //   message: validationError.message,
    //   path: validationError.path,
    // }));
    const customErrors = error.errors.map((validationError) => validationError.message);
    const customError = new CustomError(400, 'Validation', 'Validation error', customErrors);
    return next(customError);
  }
};

export default validation;
