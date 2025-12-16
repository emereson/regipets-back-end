import express from 'express';
import * as razaController from './raza.controllers.js';
import * as razaMiddleware from './raza.middleware.js';
import * as authMiddleware from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware.protect);
router.get('/especie/:id', razaController.findAll);
router.post('/', razaController.create);

router
  .use('/:id', razaMiddleware.validExistRata)
  .route('/:id')
  .patch(razaController.update)
  .delete(razaController.deleteItem)
  .get(razaController.findOne);

export { router as razaRouter };
