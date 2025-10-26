import express from 'express';
import * as mascotaMiddleware from './mascota.middleware.js';
import * as mascotaController from './mascota.controllers.js';
import * as authMiddleware from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/buscar/:dni', mascotaController.findOneDni);
router.use(authMiddleware.protect);
router.get('/', mascotaController.findAll);
router.get('/admin', mascotaController.findAllAdmin);

router
  .use('/:id', mascotaMiddleware.validExistMascota)
  .route('/:id')
  //   .patch(pedidoController.update)
  //   .delete(pedidoController.deleteItem)
  .get(mascotaController.findOne);

const mascotaRouter = router;

export { mascotaRouter };
