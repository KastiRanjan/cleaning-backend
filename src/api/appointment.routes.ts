import { Router } from 'express';

import 'dotenv/config';
import { appointmentController } from '../controllers/cms/appointment.controller';
const router = Router();

/**
 * @openapi
 * '/api/appointment':
 *  post:
 *    tags:
 *    -  Appointment
 *    summary: Create new appointment
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
 *    responses:
 *      200:
 *        description: Appointment created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *      401:
 *        description: Unauthorized
 */
router.post('/appointment', appointmentController.post);

export default router;
