import { z } from 'zod';
const isValidUUID = (value: string) => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(value);
};

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - phoneNumber
 *         - userStatusId
 *         - roleId
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         roleId:
 *           type: array
 *           items:
 *            type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Full name is required',
      })
      .refine((value) => /\w+\s+\w+/.test(value), {
        message: 'Full name must contain at least two words',
      })
      .refine((value) => value.length <= 100, {
        message: 'Full name must not exceed 100 characters',
      })
      .refine((value) => /^[A-Za-z\s.]+$/.test(value), {
        message: 'Full name must contain only letters and full stops',
      })
      .refine((value) => value.split(' ')[0].replace('.', '').length >= 3, {
        message: 'The first word of the full name must have at least three alphabets',
      }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email()
      .refine((value) => value.length <= 80, {
        message: 'Maximum character limit exceeded for email address',
      }),
    phoneNumber: z
      .string()
      .refine((value) => /^[0-9+,-]*$/.test(value), {
        message: 'Phone number must contain only numbers, plus, minus, and comma',
      })
      .refine((value) => value.length <= 20, {
        message: 'Phone number must not exceed 20 characters',
      })
      .refine((value) => value.length >= 7, {
        message: 'Phone number must have at least 7 characters',
      })
      .optional(),
    roleId: z
      .array(
        z.string().min(1, 'roleId is required').refine(isValidUUID, {
          message: 'Invalid UUID format for roleId',
        }),
      )
      .min(1, { message: 'At least one roleId is required' }),
  }),
});

export const createContactUsSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Full name is required',
      })
      .refine((value) => /\w+\s+\w+/.test(value), {
        message: 'Full name must contain at least two words',
      })
      .refine((value) => value.length <= 100, {
        message: 'Full name must not exceed 100 characters',
      })
      .refine((value) => /^[A-Za-z\s.]+$/.test(value), {
        message: 'Full name must contain only letters and full stops',
      })
      .refine((value) => value.split(' ')[0].replace('.', '').length >= 3, {
        message: 'The first word of the full name must have at least three alphabets',
      }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email()
      .refine((value) => value.length <= 80, {
        message: 'Maximum character limit exceeded for email address',
      }),
    phoneNumber: z
      .string()
      .refine((value) => /^[0-9+,-]*$/.test(value), {
        message: 'Phone number must contain only numbers, plus, minus, and comma',
      })
      .refine((value) => value.length <= 20, {
        message: 'Phone number must not exceed 20 characters',
      })
      .refine((value) => value.length >= 7, {
        message: 'Phone number must have at least 7 characters',
      })
      .optional(),
    message: z.string().optional(),
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTenantUserInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - roleId
 *         - tenantId
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         tenantId:
 *           type: string
 *         roleId:
 *           type: array
 *           items:
 *            type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

export const createTenantUserSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Full name is required',
      })
      .refine((value) => /\w+\s+\w+/.test(value), {
        message: 'Full name must contain at least two words',
      })
      .refine((value) => value.length <= 100, {
        message: 'Full name must not exceed 100 characters',
      })
      .refine((value) => /^[A-Za-z\s.]+$/.test(value), {
        message: 'Full name must contain only letters and full stops',
      })
      .refine((value) => value.split(' ')[0].replace('.', '').length >= 3, {
        message: 'The first word of the full name must have at least three alphabets',
      }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email()
      .refine((value) => value.length <= 80, {
        message: 'Maximum character limit exceeded for email address',
      }),
    phoneNumber: z
      .string()
      .refine((value) => /^[0-9+,-]*$/.test(value), {
        message: 'Phone number must contain only numbers, plus, minus, and comma',
      })
      .refine((value) => value.length <= 20, {
        message: 'Phone number must not exceed 20 characters',
      })
      .refine((value) => value.length >= 7, {
        message: 'Phone number must have at least 7 characters',
      })
      .optional(),
    roleId: z
      .array(
        z.string().min(1, 'roleId is required').refine(isValidUUID, {
          message: 'Invalid UUID format for roleId',
        }),
      )
      .min(1, { message: 'At least one roleId is required' }),
    tenantId: z.string().min(1, 'tenant id is required').refine(isValidUUID, {
      message: 'Invalid UUID format for tenantId',
    }),
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *      GetTenantUserList:
 *       type: object
 *       required:
 *         - tenantId
 *       properties:
 *         tenantId:
 *           type: string
 *      CreateUserResponse:
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */
export const GetTenantUserList = z.object({
  body: z.object({
    tenantId: z.string().min(1, 'tenantId is required').refine(isValidUUID, {
      message: 'Invalid UUID format',
    }),
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateByHostUser:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         userStatusId:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         roleId:
 *           type: array
 *           items:
 *            type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

export const updateUserByHostSchema = z.object({
  params: z.object({
    userId: z.string().refine(isValidUUID, 'Invalid UUID format'),
  }),
  body: z.object({
    username: z
      .string({
        required_error: 'Full name is required',
      })
      .refine((value) => /\w+\s+\w+/.test(value), {
        message: 'Full name must contain at least two words',
      })
      .refine((value) => value.length <= 100, {
        message: 'Full name must not exceed 100 characters',
      })
      .refine((value) => /^[A-Za-z\s.]+$/.test(value), {
        message: 'Full name must contain only letters and full stops',
      })
      .refine((value) => value.split(' ')[0].replace('.', '').length >= 3, {
        message: 'The first word of the full name must have at least three alphabets',
      })
      .optional(),
    userStatusId: z
      .string()
      .min(1, 'userStatusId is required')
      .refine(isValidUUID, {
        message: 'Invalid UUID format',
      })
      .optional(),
    phoneNumber: z
      .string()
      .refine((value) => /^[0-9+,-]+$/.test(value), {
        message: 'Phone number must contain only numbers, plus, minus, and comma',
      })
      .refine((value) => value.length <= 20, {
        message: 'Phone number must not exceed 20 characters',
      })
      .refine((value) => value.length >= 7, {
        message: 'Phone number must have at least 7 characters',
      })
      .optional(),
    roleId: z
      .array(
        z.string().min(1, 'roleId is required').refine(isValidUUID, {
          message: 'Invalid UUID format for roleId',
        }),
      )
      .min(1, { message: 'At least one roleId is required' })
      .optional(),
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateStatusByHostUser:
 *       type: object
 *       required:
 *         - userStatusId
 *       properties:
 *         userStatusId:
 *           type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserProfile:
 *       type: object
 *       required:
 *         - userStatusId
 *       properties:
 *         username:
 *           type: string
 *         phoneNumber:
 *           type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCustomerUserInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCustomerContactInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - phoneNumber
 *         - userStatusId
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         message:
 *           type: string
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

export const CreateCustomerUserInput = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Full name is required',
      })
      .refine((value) => /\w+\s+\w+/.test(value), {
        message: 'Full name must contain at least two words',
      })
      .refine((value) => value.length <= 100, {
        message: 'Full name must not exceed 100 characters',
      })
      .refine((value) => /^[A-Za-z\s.]+$/.test(value), {
        message: 'Full name must contain only letters and full stops',
      })
      .refine((value) => value.split(' ')[0].replace('.', '').length >= 3, {
        message: 'The first word of the full name must have at least three alphabets',
      }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email()
      .refine((value) => value.length <= 80, {
        message: 'Maximum character limit exceeded for email address',
      }),
    phoneNumber: z
      .string()
      .refine((value) => /^[0-9+,-]*$/.test(value), {
        message: 'Phone number must contain only numbers, plus, minus, and comma',
      })
      .refine((value) => value.length <= 20, {
        message: 'Phone number must not exceed 20 characters',
      })
      .refine((value) => value.length >= 7, {
        message: 'Phone number must have at least 7 characters',
      })
      .optional(),
    password: z
      .string()
      .min(8, 'Password should have at least 8 character')
      .max(50, 'Password length must be less than 50')
      .refine((value) => /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)(?=.*[a-z]).{8,}$/.test(value), 'Password is weak'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  }),
});
