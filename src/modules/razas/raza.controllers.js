import { catchAsync } from '../../utils/catchAsync.js';
import { Raza } from './raza.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const razas = await Raza.findAll({
    where: {
      especie_id: id,
    },
  });

  return res.status(200).json({
    status: 'success',
    results: razas.length,
    razas,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { raza } = req;

  return res.status(200).json({
    status: 'Success',
    raza,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const {
    especie_id,
    title_en,
    title_es,
    description_en,
    description_es,
    hidden,
  } = req.body;

  const raza = await Raza.create({
    especie_id,
    title_en,
    title_es,
    description_en,
    description_es,
    hidden,
  });

  res.status(201).json({
    status: 'success',
    message: 'the raza has been created successfully!',
    raza,
  });
});

export const update = catchAsync(async (req, res) => {
  const { raza } = req;
  const {
    especie_id,
    title_en,
    title_es,
    description_en,
    description_es,
    hidden,
  } = req.body;

  await raza.update({
    especie_id,
    title_en,
    title_es,
    description_en,
    description_es,
    hidden,
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { raza } = req;

  await raza.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The raza with id: ${raza.id} has been deleted`,
  });
});
