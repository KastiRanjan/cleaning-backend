import 'dotenv/config';
import { Router } from 'express';
import { assigneeController } from '../controllers/cms/assignee.controller';
const router = Router();

/**
 * @openapi
 * '/api/asiggnee':
 *  post:
 *    tags:
 *    -  Assignee
 *    summary: Add new assignee
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
 *    responses:
 *      200:
 *        description: Asignee added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *      401:
 *        description: Unauthorized
 */
router.post('/assignee', assigneeController.post);

export default router;
