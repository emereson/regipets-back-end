import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Especie } from './especie.model.js';

export const validExistEspecie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const especie = await Especie.findOne({
    where: {
      id,
    },
  });

  if (!especie) {
    return next(new AppError(`especie con el : ${id} no encontrado `, 404));
  }

  req.especie = especie;
  next();
});
