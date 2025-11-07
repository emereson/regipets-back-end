import express from 'express';
import * as pedidoController from './pedido.controllers.js';
import * as pedidoMiddleware from './pedido.middleware.js';
import * as authMiddleware from '../../auth/auth.middleware.js';

const router = express.Router();
router.post('/webhook', pedidoController.webhook);
router.get('/:id', pedidoMiddleware.validateExistPedido, pedidoController.findOne);
router.post('/', pedidoController.create);

router.use(authMiddleware.protect);
router.get('/', pedidoController.findAll);

router
  .use('/:id', pedidoMiddleware.validateExistPedido)
  .route('/:id')
  .patch(pedidoController.update)
  .delete(pedidoController.deleteItem);

const pedidoRouter = router;

export { pedidoRouter };
