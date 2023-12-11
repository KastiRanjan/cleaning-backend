import { NextFunction, Request, Response } from 'express';
import {
  deleteRole,
  getActiveRoles,
  getPermissions,
  getRole,
  getRoleById,
  getRoles,
  saveRolePermission,
  updateRole,
  updateRoleStatus,
} from '../../services/role-permission.service';
import { CustomError } from '../../utils/response/custom-error/CustomError';
import { createdMessage, updatedMessage, updatedStatusMessage } from '../../helper/message';

export const permissionListHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permissions = await getPermissions();
    res.customSuccess(200, 'List of permissions.', permissions);
  } catch (err) {
    const customError = new CustomError(400, 'General', `Can't retrieve list of permissions.`, null, err);
    return next(customError);
  }
};

export const roleListHandler = async (req: Request, res: Response, next: NextFunction) => {
  const param = req.query;
  try {
    const roles = await getRoles(param);
    res.customSuccess(200, 'List of roles.', roles);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of roles.`, [err?.message], err);
    return next(customError);
  }
};

export const activeRoleListHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await getActiveRoles();
    res.customSuccess(200, 'List of roles.', roles);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of roles.`, null, err);
    return next(customError);
  }
};

export const roleCreateHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, permission, isActive } = req.body;
  const { id } = req.jwtPayload;

  try {
    const role = await getRole(name);

    if (role) {
      const customError = new CustomError(400, 'General', 'Role already exists', [`role '${name}' already exists`]);
      return next(customError);
    }

    try {
      const savedRole = await saveRolePermission({ name, permission, isActive, id });

      return res.customSuccess(200, createdMessage('Role'), savedRole);
    } catch (err) {
      const customError = new CustomError(400, 'General', `Role '${name}' can't be created`, [err.message]);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err.message);
    return next(customError);
  }
};

export const roleUpdateHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, permission, isActive } = req.body;
  const { roleId } = req.params;
  const { id } = req.jwtPayload;

  try {
    const updatedRole = await updateRole({ roleId, name, permission, isActive, id });

    return res.customSuccess(200, updatedMessage('Role'), updatedRole);
  } catch (err) {
    const cleanedString =
      err.detail && err.detail.replace('Key', '').replace('name', '').replace(/[()]/g, '').replace(/=/g, ' ');
    const customError = new CustomError(400, 'General', 'Error', [cleanedString ?? err?.message]);
    return next(customError);
  }
};

export const getRoleByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { roleId } = req.params;

  try {
    const role = await getRoleById(roleId);

    return res.customSuccess(200, 'Role retrive successfully.', role);
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Error', err?.message);
    return next(customError);
  }
};

export const roleStatusUpdateHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { isActive } = req.body;
  const { roleId } = req.params;
  const { id } = req.jwtPayload;

  try {
    const updatedRole = await updateRoleStatus({ roleId, isActive, id });
    // const roleStatus = updatedRole.isActive ? 'active' : 'inactive';
    return res.customSuccess(200, updatedStatusMessage('Role'), updatedRole);
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Error', err?.message);
    return next(customError);
  }
};

export const roleDeleteHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { roleId } = req.params;

  try {
    const deletedRole = await deleteRole(roleId);

    return res.customSuccess(200, 'Role deleted successfully.', 'Role delete');
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Error', err?.message);
    return next(customError);
  }
};
