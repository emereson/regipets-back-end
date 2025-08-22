import express from 'express';
import * as productoMiddleware from './producto.middleware.js';
import * as productoController from './producto.controllers.js';

const router = express.Router();

router.post('/', productoController.create);
router.get('/', productoController.findOne);

router
  .use('/:id', productoMiddleware.validExistProducto)
  .route('/:id')
  .patch(productoController.update)
  .delete(productoController.deleteItem)
  .get(productoController.findOne);

const productoRouter = router;

export { productoRouter };
