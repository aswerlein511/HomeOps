import { Router } from 'express';

import { PcHealthController } from '../controllers/PcHealthController';

const router = Router();

const controller = new PcHealthController();

router.get('/', controller.getPcHealth.bind(controller));

export default router;
