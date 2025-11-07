import { catchAsync } from '../../utils/catchAsync.js';
import { Especie } from '../especies/especie.model.js';
import { Raza } from './raza.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const razas = await Raza.findAll({
    where: {
      especie_id: id,
    },
    include: [{ model: Especie, as: 'especie' }],
    order: [['title_es', 'ASC']],
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
  const { especie_id, title_en, title_es, description_en, description_es, hidden } = req.body;

  const especie = await Especie.findOne({
    where: {
      id: especie_id,
    },
  });

  if (!especie) {
    return next(new AppError(`especie con el : ${id} no encontrado `, 404));
  }

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
  const { especie_id, title_en, title_es, description_en, description_es, hidden } = req.body;

  await raza.update({
    especie_id,
    title_en,
    title_es,
    description_en,
    description_es,
    hidden,
  });

  res.status(201).json({
    status: 'success',
    message: 'the raza has been update successfully!',
    raza,
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
