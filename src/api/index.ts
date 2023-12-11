import { Router } from 'express';

import auth from './auth.routes';
import service from './service.routes';
import serviceCategory from './service-category.routes';
import appointment from './appointment.routes';
import assignee from './assignee.routes';

const router = Router();

router.use('/api', auth);
router.use('/api', service);
router.use('/api', serviceCategory);
router.use('/api', appointment);
router.use('/api', assignee);

export default router;
