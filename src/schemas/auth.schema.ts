import { z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: ranjan.kasti@cleaning.com
 *         password:
 *           type: string
 *           default: admin@123456
 *     CreateSessionResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */
export const loginSchema = z.object({
  body: z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ForgotPasswordInput:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           default: ranjan.kasti@amniltech.com
 *     ForgotPasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().min(1, 'Email is required').email('Not a valid email'),
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ResetPasswordInput:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         token:
 *           type: string
 *     ResetPasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */
export const resetPasswordSchema = z.object({
  body: z
    .object({
      password: z
        .string()
        .min(8, 'Password should have at least 8 character')
        .max(50, 'Password length must be less than 50')
        .refine((value) => /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)(?=.*[a-z]).{8,}$/.test(value), 'Password is weak'),
      confirmPassword: z.string().min(1, 'Confirm Password is required'),
      token: z.string().min(1, 'Token is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ChangePasswordInput:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         oldPassword:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *     ChangePasswordResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */
export const changePasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z.string(),
      password: z
        .string()
        .min(8, 'Password should have at least 8 character')
        .max(50, 'Password length must be less than 50')
        .refine((value) => /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)(?=.*[a-z]).{8,}$/.test(value), 'Password is weak'),
      confirmPassword: z.string().min(1, 'Confirm Password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});
