import { catchAsync } from '../../utils/catchAsync.js';
import { Departamentos } from '../ubigeos/departamentos/departamentos.model.js';
import { Distritos } from '../ubigeos/distritos/distritos.model.js';
import { Provincias } from '../ubigeos/provincias/provincias.model.js';
import { Convenio } from './convenio.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const convenios = await Convenio.findAll({
    include: [
      { model: Departamentos, as: 'departamento' },
      { model: Provincias, as: 'provincia' },
      { model: Distritos, as: 'distrito' },
    ],
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'success',
    results: convenios.length,
    convenios,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { convenio } = req;

  return res.status(200).json({
    status: 'Success',
    convenio,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const {
    nombre_convenio,
    direccion,
    telefono,
    punto_autorizado,
    departamento_id,
    provincia_id,
    distrito_id,
  } = req.body;

  const convenio = await Convenio.create({
    nombre_convenio,
    direccion,
    telefono,
    punto_autorizado,
    departamento_id,
    provincia_id,
    distrito_id,
  });

  res.status(201).json({
    status: 'success',
    message: 'the convenio has been created successfully!',
    convenio,
  });
});

export const update = catchAsync(async (req, res) => {
  const { convenio } = req;
  const {
    nombre_convenio,
    direccion,
    telefono,
    punto_autorizado,
    departamento_id,
    provincia_id,
    distrito_id,
  } = req.body;

  await convenio.update({
    nombre_convenio,
    direccion,
    telefono,
    punto_autorizado,
    departamento_id,
    provincia_id,
    distrito_id,
  });

  res.status(201).json({
    status: 'success',
    message: 'the convenio has been update successfully!',
    convenio,
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { convenio } = req;

  await convenio.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The convenio with id: ${convenio.id} has been deleted`,
  });
});
