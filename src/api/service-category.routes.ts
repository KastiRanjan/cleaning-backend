import { Router } from 'express';

import 'dotenv/config';
import { serviceCategoryController } from '../controllers/cms/service.-category.controller';
const router = Router();

/**
 * @openapi
 * '/api/service-category':
 *  post:
 *    tags:
 *    - Service
 *    summary: Create new service category
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
 *    responses:
 *      200:
 *        description: Service category created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *      401:
 *        description: Unauthorized
 */
router.post('/service-category', serviceCategoryController.post);

export default router;
