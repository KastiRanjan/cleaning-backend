import { Router } from 'express';

import 'dotenv/config';
import { serviceController } from '../controllers/cms/service.controller';
const router = Router();

const basePath = process.env.SWAGGER_CMS || '/framework/cms/';

/**
 * @openapi
 * '/api/service':
 *  post:
 *    tags:
 *    - Service
 *    summary: Create new service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
 *    responses:
 *      200:
 *        description: Service created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *      401:
 *        description: Unauthorized
 */
router.post('/service', serviceController.post);

export default router;
