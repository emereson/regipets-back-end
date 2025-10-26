import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { User } from '../user/user.model.js';
import { Raza } from './raza.model.js';

export const validExistRata = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const raza = await Raza.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: 'usuario',
      },
    ],
  });

  if (!raza) {
    return next(new AppError(`raza con el : ${id} no encontrado `, 404));
  }

  req.raza = raza;
  next();
});
