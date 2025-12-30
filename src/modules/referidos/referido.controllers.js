import { catchAsync } from '../../utils/catchAsync.js';
import { DatosClientes } from '../checkout/datosClientes/datosClientes.model.js';
import { Pedido } from '../checkout/pedido/pedido.model.js';
import { ProductoPedido } from '../checkout/productosPedido/productosPedido.model.js';
import { Referido } from './referidos.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { user_id } = req.query;

  const referidos = await Referido.findAll({
    where: {
      user_id: sessionUser.rol === 'Admin' ? user_id : sessionUser.id,
    },
    include: [
      {
        model: Pedido,
        as: 'pedido',
        include: [
          { model: ProductoPedido, as: 'productos' },
          {
            model: DatosClientes,
            as: 'cliente',
          },
        ],
      },
    ],
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'success',
    results: referidos.length,
    referidos,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { referido } = req;

  return res.status(200).json({
    status: 'Success',
    referido,
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { referido } = req;
  const { estado } = req.body;

  await referido.update({ estado });

  return res.status(200).json({
    status: 'Success',
    referido,
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { referido } = req;

  await referido.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The referido with id: ${referido.id} has been deleted`,
  });
});
