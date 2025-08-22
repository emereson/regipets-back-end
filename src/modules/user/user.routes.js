import express from 'express';
import * as userMiddleware from './user.middleware.js';
import * as userController from './user.controllers.js';
// import * as authMiddleware from "../user/auth.middleware.js";

const router = express.Router();

router.get('/', userController.findAll);
// router.use(authMiddleware.protect);
// router.post('/', pedidoController.create);

// router
//   .use("/:id", mascotaMiddleware.validExistMascota)
//   .route("/:id")
//   //   .patch(pedidoController.update)
//   //   .delete(pedidoController.deleteItem)
//   .get(mascotaController.findOne);

const userRouter = router;

export { userRouter };
