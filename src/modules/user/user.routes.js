import express from 'express';
import * as userMiddleware from './user.middleware.js';
import * as userController from './user.controllers.js';
import * as authMiddleware from '../auth/auth.middleware.js';

const router = express.Router();

router.get('/', userController.findAll);
router.post('/login', userController.login);

router.use(authMiddleware.protect);
router.post('/signup', userController.signup);

// router
//   .use("/:id", mascotaMiddleware.validExistMascota)
//   .route("/:id")
//   //   .patch(pedidoController.update)
//   //   .delete(pedidoController.deleteItem)
//   .get(mascotaController.findOne);

const userRouter = router;

export { userRouter };
