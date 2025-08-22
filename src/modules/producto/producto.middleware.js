import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Producto } from './producto.model.js';

export const validExistProducto = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const producto = await Producto.findOne({
    where: {
      id,
    },
  });

  if (!producto) {
    return next(new AppError(`producto con el : ${id} no encontrado `, 404));
  }

  req.producto = producto;
  next();
});
