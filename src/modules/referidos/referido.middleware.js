import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Referido } from './referidos.model.js';

export const validExistReferido = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const referido = await Referido.findOne({
    where: {
      id,
    },
  });

  if (!referido) {
    return next(new AppError(`referido con el : ${id} no encontrado `, 404));
  }

  req.referido = referido;
  next();
});
