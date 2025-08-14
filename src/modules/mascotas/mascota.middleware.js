import { AppError } from "../../utils/AppError.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { User } from "../user/user.model.js";
import { Mascota } from "./mascota.model.js";

export const validExistMascota = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const mascota = await Mascota.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: "usuario",
      },
    ],
  });

  if (!mascota) {
    return next(new AppError(`mascota con el : ${id} no encontrado `, 404));
  }

  req.mascota = mascota;
  next();
});
