import { Router } from 'express';
import OrderController from './app/controller/OrderController.js';

const router = Router();

router.get('/orders', OrderController.index);
router.get('/orders/:id', OrderController.show);
router.post('/orders/', OrderController.store);

export default router;
