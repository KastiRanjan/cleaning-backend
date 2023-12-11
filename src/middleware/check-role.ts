import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';
import { getUserRolesPermissions } from '../services/user/user-create.service';

export const checkPermission = (permission: string[], isSelfAllowed = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.jwtPayload;

    const rolePermission = await getUserRolesPermissions(id);

    if (!rolePermission.includes(permission[0])) {
      const customError = new CustomError(401, 'Unauthorized', 'Unauthorized - Insufficient user rights');
      return next(customError);
    }
    return next();
  };
};
