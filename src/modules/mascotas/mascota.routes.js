import express from 'express';
import * as mascotaMiddleware from './mascota.middleware.js';
import * as mascotaController from './mascota.controllers.js';
import * as authMiddleware from '../auth/auth.middleware.js';
import { upload } from '../../utils/multer.js';

const router = express.Router();

router.get('/buscar/:dni', mascotaController.findOneDni);
router.use(authMiddleware.protect);
router.get('/', mascotaController.findAll);
router.get('/pendientes', mascotaController.findAllPendientes);
router.get('/admin', mascotaController.findAllAdmin);
router.post('/', upload.single('imagen'), mascotaController.create);
router.post('/editar-estados-aprobacion', mascotaController.updateEstadoAprobacion);

router
  .use('/:id', mascotaMiddleware.validExistMascota)
  .route('/:id')
  .patch(upload.single('imagen'), mascotaController.update)
  .delete(mascotaController.deleteItem)
  .get(mascotaController.findOne);

const mascotaRouter = router;

export { mascotaRouter };
