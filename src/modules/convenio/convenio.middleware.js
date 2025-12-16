import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Convenio } from './convenio.model.js';

export const validExistConvenio = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const convenio = await Convenio.findOne({
    where: {
      id,
    },
  });

  if (!convenio) {
    return next(new AppError(`convenio con el : ${id} no encontrado `, 404));
  }

  req.convenio = convenio;
  next();
});
