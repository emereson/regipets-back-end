import { Op } from 'sequelize';
import { catchAsync } from '../../utils/catchAsync.js';
import { Mascota } from './mascota.model.js';
import { AppError } from '../../utils/AppError.js';
import { Departamentos } from '../ubigeos/departamentos/departamentos.model.js';
import { Provincias } from '../ubigeos/provincias/provincias.model.js';
import { Distritos } from '../ubigeos/distritos/distritos.model.js';
import { User } from '../user/user.model.js';
import { Raza } from '../razas/raza.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { dniNombre } = req.query;

  let whereFilter = {};
  let limitValue = undefined;

  if (dniNombre && dniNombre.trim().length > 0) {
    whereFilter = {
      [Op.or]: [
        { dni: { [Op.like]: `%${dniNombre}%` } },
        { nombre: { [Op.like]: `%${dniNombre}%` } },
        { apellido: { [Op.like]: `%${dniNombre}%` } },
      ],
    };
  } else {
    limitValue = 10;
  }

  const mascotas = await Mascota.findAll({
    where: {
      usuario_id: sessionUser.id,
      ...whereFilter,
    },
    order: [['id', 'DESC']],
    limit: limitValue,
  });

  return res.status(200).json({
    status: 'success',
    results: mascotas.length,
    mascotas,
  });
});

export const findAllAdmin = catchAsync(async (req, res, next) => {
  const {
    dniNombre,
    nombreDueno,
    departamento,
    provincia,
    distrito,
    especie,
    raza,
    fechaDesde,
    fechaHasta,
    page = 1,
    limit = 100,
  } = req.query;

  const whereFilter = {};
  const userFilter = {};

  if (nombreDueno && nombreDueno.trim().length > 0) {
    userFilter[Op.or] = [
      { nombre: { [Op.like]: `%${nombreDueno}%` } },
      { apellido: { [Op.like]: `%${nombreDueno}%` } },
    ];
  }
  // 🔍 Filtro por texto (dni, nombre o apellido)
  if (dniNombre && dniNombre.trim().length > 0) {
    whereFilter[Op.or] = [
      { dni: { [Op.like]: `%${dniNombre}%` } },
      { nombre: { [Op.like]: `%${dniNombre}%` } },
      { apellido: { [Op.like]: `%${dniNombre}%` } },
    ];
  }

  // 📍 Filtros por ubicación
  if (departamento) whereFilter.departamento_id = departamento;
  if (provincia) whereFilter.provincia_id = provincia;
  if (distrito) whereFilter.distrito_id = distrito;

  // 🐾 Filtros por tipo de mascota
  if (especie) whereFilter.especie_id = especie;
  if (raza && raza !== 'undefined') {
    whereFilter.mascota_raza_id = raza;
  }

  // 📅 Filtro por rango de fechas
  if (fechaDesde && fechaHasta) {
    whereFilter.created_at = {
      [Op.between]: [new Date(fechaDesde), new Date(fechaHasta)],
    };
  } else if (fechaDesde) {
    whereFilter.created_at = { [Op.gte]: new Date(fechaDesde) };
  } else if (fechaHasta) {
    whereFilter.created_at = { [Op.lte]: new Date(fechaHasta) };
  }

  // 🔢 Paginación
  const offset = (page - 1) * limit;

  console.log(whereFilter);

  const mascotas = await Mascota.findAndCountAll({
    where: whereFilter,
    include: [
      {
        model: User,
        as: 'usuario',
        where: userFilter,
      },
      { model: Raza, as: 'raza' },
      { model: Departamentos, as: 'departamento' },
      { model: Provincias, as: 'provincia' },
      { model: Distritos, as: 'distrito' },
    ],
    order: [['id', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  const totalPages = Math.ceil(mascotas.count / limit);

  return res.status(200).json({
    status: 'success',
    results: mascotas.rows.length,
    total: mascotas.count,
    currentPage: parseInt(page),
    totalPages,
    mascotas: mascotas.rows,
  });
});

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
      new AppError(`La mascota con el dni o chip:${dni}, no se encuentra registrada `, 404)
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
