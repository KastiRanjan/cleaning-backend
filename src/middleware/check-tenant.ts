import { NextFunction, Request, Response } from 'express';

import { getTenantByIdentifier } from '../services/tenant.service';
import { CustomError } from '../utils/response/custom-error/CustomError';

export const checkTenant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parts = req.hostname.split('.');
    const subdomain = parts.length > 1 ? parts[0] : null;
    const tenant = subdomain ? await getTenantByIdentifier(subdomain) : await getTenantByIdentifier('cms-dev');
    req.body.tenantId = tenant.id as string;
    next();
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Invalid Tenant', ['Incorrect email or password'], err);
    return next(customError);
  }
};
