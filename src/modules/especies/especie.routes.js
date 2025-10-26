import express from 'express';
import * as especieController from './especie.controllers.js';
import * as expecieMiddleware from './especie.middleware.js';
import * as authMiddleware from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware.protect);
router.get('/', especieController.findAll);
router.post('/', especieController.create);

router
  .use('/:id', expecieMiddleware.validExistEspecie)
  .route('/:id')
  .patch(especieController.update)
  .delete(especieController.deleteItem)
  .get(especieController.findOne);

export { router as especieRouter };
