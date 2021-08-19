import { Router } from 'express';
import OrderController from './app/controller/OrderController.js';

const router = Router();

router.get('/orders', OrderController.index);
router.get('/orders/:id', OrderController.show);
router.post('/orders/', OrderController.store);
router.put('/orders/:id', OrderController.update);
router.patch('/orders/:id', OrderController.updateDelivery);
router.delete('/orders/:id', OrderController.delete);

router.get('/orders/clients/:cliente', OrderController.showClient);
router.get('/orders/products/:product', OrderController.showProduct);

router.get('/products', OrderController.productOrder);

export default router;
