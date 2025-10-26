import bcrypt from 'bcryptjs';
import { catchAsync } from '../../utils/catchAsync.js';
import { User } from './user.model.js';
import { generateJWT } from '../../utils/jwt.js';

export const findAll = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  return res.status(200).json({
    status: 'Success',
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

export const signup = catchAsync(async (req, res, next) => {
  const { nombre, dni, correo, celular, password, role } = req.body;

  const pulgarCorreo = correo.trim().toLowerCase().replace(/\s+/g, '');

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    nombre,
    dni,
    email: pulgarCorreo,
    celular,
    role,
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'the user has been created successfully!',
    token,
    user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { correo, password } = req.body;

  const pulgarCorreo = correo.trim().toLowerCase().replace(/\s+/g, '');

  const user = await User.findOne({
    where: {
      email: pulgarCorreo,
      // status: 'active',
    },
  });
  if (!user) {
    return next(new AppError('El usuario no se encuentra registrado', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Contraseña incorrecta', 401));
  }

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

// async function cambiarPassword() {
//   const usuarios = await User.findAll();
//   const salt = await bcrypt.genSalt(12);
//   const encryptedPassword = await bcrypt.hash('123123123', salt);

//   await Promise.all(
//     usuarios.map((user) => user.update({ password: encryptedPassword }))
//   );

//   console.log('Todas las contraseñas fueron actualizadas');
// }

// cambiarPassword();
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
