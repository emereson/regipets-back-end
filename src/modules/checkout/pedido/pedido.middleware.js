import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { DatosClientes } from '../datosClientes/datosClientes.model.js';
import { ProductoPedido } from '../productosPedido/productosPedido.model.js';
import { Pedido } from './pedido.model.js';

export const validateExistPedido = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const pedido = await Pedido.findOne({
    where: {
      id,
    },
    include: [
      { model: ProductoPedido, as: 'productos' },
      {
        model: DatosClientes,
        as: 'cliente',
      },
    ],
  });

  if (!pedido) {
    return next(new AppError(`pedido con el : ${id} no encontrado `, 404));
  }

  req.pedido = pedido;
  next();
});
