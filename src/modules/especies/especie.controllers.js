import { catchAsync } from '../../utils/catchAsync.js';
import { Especie } from './especie.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const especies = await Especie.findAll();

  return res.status(200).json({
    status: 'success',
    results: especies.length,
    especies,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { especie } = req;

  return res.status(200).json({
    status: 'Success',
    especie,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { title_en, title_es } = req.body;

  const especie = await Especie.create({
    title_en,
    title_es,
  });

  res.status(201).json({
    status: 'success',
    message: 'the especie has been created successfully!',
    especie,
  });
});

export const update = catchAsync(async (req, res) => {
  const { especie } = req;
  const { title_en, title_es } = req.body;

  await especie.update({
    title_en,
    title_es,
  });

  res.status(201).json({
    status: 'success',
    message: 'the especie has been update successfully!',
    especie,
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { especie } = req;

  await especie.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The especie with id: ${especie.id} has been deleted`,
  });
});
