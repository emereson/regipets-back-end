import { Op } from "sequelize";
import { catchAsync } from "../../utils/catchAsync.js";
import { User } from "./user.model.js";

export const findAll = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  return res.status(200).json({
    status: "Success",
    results: users.length,
    users,
  });
});

// export const findOne = catchAsync(async (req, res, next) => {
//   const { mascota } = req;

//   return res.status(200).json({
//     status: "Success",
//     mascota,
//   });
// });

// export const create = catchAsync(async (req, res, next) => {
//   const { tienda, nro_pedido_tienda, fecha } = req.body;

//   const pedido = await Pedido.create({
//     tienda,
//     nro_pedido_tienda,
//     fecha,
//   });

//   res.status(201).json({
//     status: "success",
//     message: "the pedido has been created successfully!",
//     pedido,
//   });
// });

// export const update = catchAsync(async (req, res) => {
//   const { user } = req;
//   const { tienda, nro_pedido_tienda, fecha } = req.body;

//   await user.update({
//     tienda,
//     nro_pedido_tienda,
//     fecha,
//   });
// });

// export const deleteItem = catchAsync(async (req, res) => {
//   const { pedido } = req;

//   await pedido.destroy();

//   return res.status(200).json({
//     status: "success",
//     message: `The pedido with id: ${pedido.id} has been deleted`,
//   });
// });
