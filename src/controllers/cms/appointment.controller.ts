import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { appointmentService } from '../../services/appointment.service';

export const appointmentController = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const appointment = await appointmentService.post(req);
      return res.customSuccess(200, appointment);
    } catch (err) {
      const customError = new CustomError(400, 'General', 'Error', err?.message);
      return next(customError);
    }
  },
};
