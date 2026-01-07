import { Op, where } from 'sequelize';
import { catchAsync } from '../../utils/catchAsync.js';
import { Mascota } from './mascota.model.js';
import { AppError } from '../../utils/AppError.js';
import { Departamentos } from '../ubigeos/departamentos/departamentos.model.js';
import { Provincias } from '../ubigeos/provincias/provincias.model.js';
import { Distritos } from '../ubigeos/distritos/distritos.model.js';
import { User } from '../user/user.model.js';
import { Raza } from '../razas/raza.model.js';
import { deleteImage, uploadImage } from '../../utils/serverImage.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { dniNombre, correo } = req.query;

  let whereFilter = {};
  let whereFilterUser = {};

  let limit = 10;

  if (dniNombre && dniNombre.trim().length > 0) {
    whereFilter = {
      [Op.or]: [
        { dni: { [Op.like]: `%${dniNombre}%` } },
        { nombre: { [Op.like]: `%${dniNombre}%` } },
        { apellido: { [Op.like]: `%${dniNombre}%` } },
      ],
    };
  } else {
    limit = 10;
  }

  if (correo && correo.trim().length > 0) {
    whereFilterUser = {
      [Op.or]: [{ email: { [Op.like]: `%${correo}%` } }],
    };
  }

  const mascotas = await Mascota.findAll({
    where: {
      // usuario_id: sessionUser.id,
      estado_verificacion: 'APROBADO',
      ...whereFilter,
    },
    include: [
      { model: User, as: 'usuario', where: whereFilterUser },
      { model: Raza, as: 'raza' },
      { model: Departamentos, as: 'departamento' },
      { model: Provincias, as: 'provincia' },
      { model: Distritos, as: 'distrito' },
    ],
    order: [['id', 'DESC']],
    limit: limit,
  });

  return res.status(200).json({
    status: 'success',
    results: mascotas.length,
    mascotas,
  });
});

export const findAllPendientes = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { correo, rol, estado, page = 1, limit = 100 } = req.query;

  if (sessionUser.rol !== 'Admin') {
    return next(
      new AppError('No tienes permisos para ver las mascotas pendientes a aprobación', 403)
    );
  }

  let whereFilterUser = {};

  if (correo && correo.trim().length > 0) {
    whereFilterUser = {
      [Op.or]: [{ email: { [Op.like]: `%${correo}%` } }],
    };
  }

  if (rol && rol.trim().length > 0) {
    whereFilterUser.rol = rol;
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Mascota.findAndCountAll({
    where: {
      estado_verificacion: estado || 'PENDIENTE',
    },
    include: [
      { model: User, as: 'usuario' },
      { model: User, as: 'creador', where: whereFilterUser },
      { model: Raza, as: 'raza' },
      { model: Departamentos, as: 'departamento' },
      { model: Provincias, as: 'provincia' },
      { model: Distritos, as: 'distrito' },
    ],
    order: [['id', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  const totalPages = Math.ceil(count / limit);

  return res.status(200).json({
    status: 'success',
    results: rows.length,
    mascotas: rows,
    currentPage: parseInt(page),
    totalPages,
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

export const create = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const {
    usuario_id,
    nombre,
    apellido,
    responsable_2,
    dni_responsable_2,
    telefono_responsable_2,
    sexo,
    fecha_nacimiento,
    tamano,
    color,
    calificacion,
    biografia,
    especie_id,
    mascota_raza_id,
    departamento_id,
    provincia_id,
    distrito_id,
    direccion,
    tipo_mascota,
  } = req.body;

  const file = req.file;

  let uploadedFilename = null;
  if (file) {
    uploadedFilename = await uploadImage(file);
  }
  const nextNumber = (await Mascota.count()) + 1;
  const dni = String(nextNumber).padStart(8, '0');

  const mascota = await Mascota.create({
    usuario_registrado_id: sessionUser.id,
    usuario_id,
    dni,
    nombre,
    apellido,
    responsable_2,
    dni_responsable_2,
    telefono_responsable_2,
    sexo,
    fecha_nacimiento,
    tamano,
    color,
    calificacion,
    biografia,
    especie_id,
    mascota_raza_id,
    departamento_id,
    provincia_id,
    distrito_id,
    imagen: uploadedFilename,
    estado_verificacion: sessionUser.rol === 'Admin' ? 'APROBADO' : 'PENDIENTE',
    direccion,
    tipo_mascota,
  });

  res.status(201).json({
    status: 'success',
    message: 'the mascota has been created successfully!',
    mascota,
  });
});

export const update = catchAsync(async (req, res) => {
  const { sessionUser, mascota } = req;
  const file = req.file;

  let newFilename = mascota.imagen;
  const oldFilename = mascota.imagen;

  if (file) {
    newFilename = await uploadImage(file); // subir primero
  }

  const updateData = {
    usuario_registrado_id: sessionUser.id,
    usuario_id: req.body.usuario_id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    responsable_2: req.body.responsable_2,
    dni_responsable_2: req.body.dni_responsable_2,
    telefono_responsable_2: req.body.telefono_responsable_2,
    sexo: req.body.sexo,
    fecha_nacimiento: req.body.fecha_nacimiento,
    tamano: req.body.tamano,
    color: req.body.color,
    calificacion: req.body.calificacion,
    biografia: req.body.biografia,
    especie_id: req.body.especie_id,
    mascota_raza_id: req.body.mascota_raza_id,
    departamento_id: req.body.departamento_id,
    provincia_id: req.body.provincia_id,
    distrito_id: req.body.distrito_id,
    imagen: newFilename,
    estado_verificacion: sessionUser.rol === 'Admin' ? 'APROBADO' : 'PENDIENTE',
    direccion: req.body.direccion,
    tipo_mascota: req.body.tipo_mascota,
  };

  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  await mascota.update(updateData);

  // eliminación NO bloqueante
  if (file && oldFilename && oldFilename !== newFilename) {
    await deleteImage(oldFilename);
  }

  res.status(200).json({
    status: 'success',
    message: 'Mascota actualizada correctamente',
    mascota,
  });
});

export const updateEstadoAprobacion = catchAsync(async (req, res) => {
  const { mascotasIds, estado_verificacion } = req.body;

  await Mascota.update({ estado_verificacion }, { where: { id: mascotasIds } });

  res.status(200).json({
    status: 'success',
    message: 'El estado de verificación se actualizó correctamente.',
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { mascota } = req;

  let uploadedFilename = mascota.imagen;

  if (uploadedFilename) {
    await deleteImage(uploadedFilename);
  }

  await mascota.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The mascota with id: ${mascota.id} has been deleted`,
  });
});
