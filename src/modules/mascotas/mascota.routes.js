import express from "express";
import * as mascotaMiddleware from "./mascota.middleware.js";
import * as mascotaController from "./mascota.controllers.js";
// import * as authMiddleware from "../user/auth.middleware.js";

const router = express.Router();

router.get("/buscar/:dni", mascotaController.findOneDni);
// router.use(authMiddleware.protect);
// router.post('/', pedidoController.create);

router
  .use("/:id", mascotaMiddleware.validExistMascota)
  .route("/:id")
  //   .patch(pedidoController.update)
  //   .delete(pedidoController.deleteItem)
  .get(mascotaController.findOne);

const mascotaRouter = router;

export { mascotaRouter };
