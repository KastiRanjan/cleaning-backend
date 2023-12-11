import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { appointmentService } from '../../services/appointment.service';
import { assigneeService } from '../../services/asignee.service';

export const assigneeController = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const asiggnee = await assigneeService.post(req);
      return res.customSuccess(200, asiggnee);
    } catch (err) {
      const customError = new CustomError(400, 'General', 'Error', err?.message);
      return next(customError);
    }
  },
};
