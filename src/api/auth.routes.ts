import { Router } from 'express';

import 'dotenv/config';
import { authController } from '../controllers/cms/auth.controller';
import validation from '../helper/validate';
import { checkJwt } from '../middleware/check-jwt';
import { loginSchema } from '../schemas/auth.schema';
const router = Router();

/**
 * @openapi
 * '/api/login':
 *  post:
 *    tags:
 *    - Auth
 *    summary: Create a session
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
 *    responses:
 *      200:
 *        description: Session created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *      401:
 *        description: Unauthorized
 */
router.post('/login', [validation(loginSchema)], authController.login);

/**
 * @openapi
 * '/api/logout':
 *  post:
 *    tags:
 *    - Auth
 *    summary: Close session
 *    responses:
 *      200:
 *        description: Session destroyed
 *      401:
 *        description: Unauthorized
 */
// router.post('/logout', [checkJwt], authController.logout);

/**
 * @openapi
 * '/api/user_get_info':
 *  get:
 *    tags:
 *    - Auth
 *    summary: User info
 *    responses:
 *      200:
 *        description: User info
 *      401:
 *        description: Unauthorized
 */
router.get('/user_get_info', [checkJwt], authController.getUser);

export default router;
