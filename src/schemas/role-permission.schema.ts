import { z } from 'zod';

const isValidUUID = (value: string) => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(value);
};

const permission = z.object({
  id: z.string().refine(isValidUUID, 'Invalid UUID format'),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateRoleInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         isActive:
 *           type: boolean
 *         permission:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *             id:
 *              type: string
 */
export const createRoleSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Role name is required')
      .min(3, 'Role name should be at least 3 characters long')
      .max(100, 'Maximum character limit exceeded for role name')
      .refine((name) => /^[a-zA-Z\s]+$/.test(name), 'Role name should contain alphabets only'),
    isActive: z.boolean(),
    permission: z.array(permission).refine((arr) => arr.length > 0, {
      message: 'Role must contain atleast one permission',
    }),
  }),
});

export const updateRoleSchema = z.object({
  params: z.object({
    roleId: z.string().refine(isValidUUID, 'Invalid UUID format'),
  }),
  body: z.object({
    name: z
      .string()
      .min(1, 'Role name is required')
      .min(3, 'Role name should be at least 3 characters long')
      .max(100, 'Maximum character limit exceeded for role name')
      .refine((name) => /^[a-zA-Z\s]+$/.test(name), 'Role name should contain alphabets only'),
    isActive: z.boolean(),
    permission: z.array(permission).refine((arr) => arr.length > 0, {
      message: 'Role must contain atleast one permission',
    }),
  }),
});

export const updateRoleStatusSchema = z.object({
  params: z.object({
    roleId: z.string().refine(isValidUUID, 'Invalid UUID format'),
  }),
  body: z.object({
    isActive: z.boolean(),
  }),
});

export const deleteRoleSchema = z.object({
  params: z.object({
    roleId: z.string().refine(isValidUUID, 'Invalid UUID format'),
  }),
});
