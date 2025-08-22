import express from 'express';
import * as pedidoController from './pedido.controllers.js';
import * as pedidoMiddleware from './pedido.middleware.js';

const router = express.Router();

router.get('/', pedidoController.findOne);
router.post('/', pedidoController.create);
router.get('/webhook', pedidoController.webhook);

router
  .use('/:id', pedidoMiddleware.validateExistPedido)
  .route('/:id')
  .patch(pedidoController.update)
  .delete(pedidoController.deleteItem)
  .get(pedidoController.findOne);

const pedidoRouter = router;

export { pedidoRouter };
