import { Op } from 'sequelize';
import { catchAsync } from '../../utils/catchAsync.js';
import { Mascota } from './mascota.model.js';
import { AppError } from '../../utils/AppError.js';
import { User } from '../user/user.model.js';

// export const findAll = catchAsync(async (req, res, next) => {
//   const pedidos = await Pedido.findAll({
//     include: [{ model: Producto, as: "productos" }],
//     order: [["fecha", "DESC"]],
//   });

//   return res.status(200).json({
//     status: "Success",
//     results: pedidos.length,
//     pedidos,
//   });ssa
// });

export const findOne = catchAsync(async (req, res, next) => {
  const { mascota } = req;

  return res.status(200).json({
    status: 'Success',
    mascota,
  });
});

export const findOneDni = catchAsync(async (req, res, next) => {
  const { dni } = req.params;

  const mascota = await Mascota.findOne({
    where: {
      [Op.or]: [{ dni: dni }, { cod_microchip: dni }],
    },
  });

  if (!mascota) {
    return next(
      new AppError(
        `La mascota con el dni o chip:${dni}, no se encuentra registrada `,
        404
      )
    );
  }

  return res.status(200).json({
    status: 'Success',
    mascota,
  });
});

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
