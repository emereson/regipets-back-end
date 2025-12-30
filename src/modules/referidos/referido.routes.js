import express from 'express';
import * as referidoController from './referido.controllers.js';
import * as referidoMiddleware from './referido.middleware.js';
import * as authMiddleware from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware.protect);
router.get('/', referidoController.findAll);

router
  .use('/:id', referidoMiddleware.validExistReferido)
  .route('/:id')
  .patch(referidoController.update)
  .delete(referidoController.deleteItem)
  .get(referidoController.findOne);

export { router as referidoRouter };
