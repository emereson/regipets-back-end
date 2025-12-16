import express from 'express';
import * as convenioController from './convenio.controllers.js';
import * as convenioMiddleware from './convenio.middleware.js';
import * as authMiddleware from '../auth/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware.protect);
router.get('/', convenioController.findAll);
router.post('/', convenioController.create);

router
  .use('/:id', convenioMiddleware.validExistConvenio)
  .route('/:id')
  .patch(convenioController.update)
  .delete(convenioController.deleteItem)
  .get(convenioController.findOne);

export { router as convenioRouter };
