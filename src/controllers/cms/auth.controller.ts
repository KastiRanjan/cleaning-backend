import { NextFunction, Request, Response } from 'express';
import { authService } from '../../services/auth.service';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await authService.login(req);
      return res.customSuccess(200, { token: `${token}` });
    } catch (err) {
      console.log(err);
      const customError = new CustomError(400, 'General', 'Error', err?.message);
      return next(customError);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userProfile = await authService.getUser(req);
      return res.customSuccess(200, userProfile);
    } catch (err) {
      const customError = new CustomError(400, 'General', 'Error', err?.message);
      return next(customError);
    }
  },

  // async logout(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await logoutService(req);
  //     // Handle success and send the token
  //     res.customSuccess(200, 'Logout Sucessful');
  //   } catch (err) {
  //     const customError = new CustomError(400, 'General', 'Error', [err?.message]);
  //     return next(customError);
  //   }
  // }

  // async forgotPassword(req: Request, res: Response, next: NextFunction) {
  //   const { email, tenantId } = req.body;

  //   try {
  //     const resetLink = await forgotPassword({ email, tenantId });
  //     res.customSuccess(200, 'Reset link send successfully.', resetLink);
  //   } catch (err: any) {
  //     const customError = new CustomError(400, 'General', 'Error', [err.message]);
  //     return next(customError);
  //   }
  // }

  // async resetPassword(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await resetPassword(req.body);
  //     res.customSuccess(200, 'Password successfully changed.', 'success');
  //   } catch (err) {
  //     const customError = new CustomError(400, 'General', 'Error', [err?.message]);
  //     return next(customError);
  //   }
  // }

  // async setupPassword(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await setupPassword(req.body);
  //     res.customSuccess(200, 'Password successfully setup.', 'success');
  //   } catch (err) {
  //     const customError = new CustomError(400, 'General', 'Error', [err?.message]);
  //     return next(customError);
  //   }
  // }

  // async changePassword(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const user = await changePassword(req);
  //     if (!user) {
  //       const customError = new CustomError(404, 'General', 'Not Found', [`User  not found.`]);
  //       return next(customError);
  //     }
  //     res.customSuccess(200, 'Password successfully changed.');
  //   } catch (err) {
  //     const customError = new CustomError(400, 'Raw', 'Error', [err.message], err);
  //     return next(customError);
  //   }
  // }

  // async myProfile(req: Request, res: Response, next: NextFunction) {
  //   const { id, name } = req.jwtPayload;

  //   try {
  //     const user = await getUserById(id);
  //     const grantedPermissios = await getUserRolesPermissions(id);

  //     if (!user) {
  //       const customError = new CustomError(404, 'General', 'Not Found', [`User ${name} not found.`]);
  //       return next(customError);
  //     }
  //     delete user.password;
  //     delete user.roles;
  //     user['grantedPermission'] = grantedPermissios;

  //     delete user.roles;
  //     user['grantedPermission'] = grantedPermissios;

  //     res.customSuccess(200, 'Retrive profile successfully.', user);
  //   } catch (err) {
  //     const customError = new CustomError(400, 'Raw', 'Error', [err.message], err);
  //     return next(customError);
  //   }
  // }

  // async resendEmail(req: Request, res: Response) {
  //   const { userId, tenantId } = req.body;
  //   const userQuery = await db.getRepository(User).findOne({ where: { id: userId } });
  //   await sendSetupPasswordEmailService({
  //     user: userQuery,
  //     username: userQuery.username,
  //     email: userQuery.email,
  //   });

  //   res.customSuccess(200, 'Setup password email resent successfully.');
  // }
};
