import { CustomError } from '../utils/response/custom-error/CustomError';

const validateFormData = (schema) => {
  return (req, res, next) => {
    try {
      const validatedFormData = schema.parse(req.body);
      req.validatedFormData = validatedFormData;
      next();
    } catch (error) {
      const customErrors = error.errors.map((validationError) => ({
        message: validationError.message,
        path: validationError.path,
      }));
      const customError = new CustomError(400, 'Validation', 'Validation error', customErrors);
      return next(customError);
    }
  };
};

export default validateFormData;
