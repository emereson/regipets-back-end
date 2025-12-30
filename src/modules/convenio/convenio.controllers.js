import { catchAsync } from '../../utils/catchAsync.js';
import { deleteImage, uploadImage } from '../../utils/serverImage.js';
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
    departamento_id,
    provincia_id,
    distrito_id,
    categoria_convenio,
    beneficio_convenio,
    direccion_convenio,
  } = req.body;

  const file = req.file;

  let uploadedFilename = null;

  if (file) {
    uploadedFilename = await uploadImage(file);
  }
  const convenio = await Convenio.create({
    nombre_convenio,
    direccion,
    telefono,
    departamento_id,
    provincia_id,
    distrito_id,
    logo_convenio: uploadedFilename,
    categoria_convenio,
    beneficio_convenio,
    direccion_convenio,
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
    departamento_id,
    provincia_id,
    distrito_id,
    categoria_convenio,
    beneficio_convenio,
    direccion_convenio,
  } = req.body;
  const file = req.file;

  let newFilename = convenio.logo_convenio;
  const oldFilename = convenio.logo_convenio;

  if (file) {
    newFilename = await uploadImage(file); // subir primero
  }

  await convenio.update({
    nombre_convenio,
    direccion,
    telefono,
    departamento_id,
    provincia_id,
    distrito_id,
    logo_convenio: newFilename,
    categoria_convenio,
    beneficio_convenio,
    direccion_convenio,
  });

  if (file && oldFilename && oldFilename !== newFilename) {
    await deleteImage(oldFilename);
  }

  res.status(201).json({
    status: 'success',
    message: 'the convenio has been update successfully!',
    convenio,
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { convenio } = req;
  const oldFilename = convenio.logo_convenio;

  if (file && oldFilename && oldFilename !== newFilename) {
    await deleteImage(oldFilename);
  }

  await convenio.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The convenio with id: ${convenio.id} has been deleted`,
  });
});
