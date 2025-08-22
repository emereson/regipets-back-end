import { catchAsync } from '../../utils/catchAsync.js';
import { products } from '../../utils/productos.js';
import { Producto } from './producto.model.js';

export const findOne = catchAsync(async (req, res, next) => {
  const { producto } = req;

  products.forEach(async (item) => {
    await Producto.create({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      categoria: item.categoria,
    });
  });
  return res.status(200).json({
    status: 'Success',
    producto,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { nombre, precio, categoria } = req.body;

  const producto = await Producto.create({
    nombre,
    precio,
    categoria,
  });

  res.status(201).json({
    status: 'success',
    message: 'the producto has been created successfully!',
    producto,
  });
});

export const update = catchAsync(async (req, res) => {
  const { producto } = req;
  const { nombre, precio, categoria } = req.body;

  await producto.update({
    nombre,
    precio,
    categoria,
  });
  res.status(201).json({
    status: 'success',
    message: 'the producto has been created successfully!',
    producto,
  });
});

export const deleteItem = catchAsync(async (req, res) => {
  const { producto } = req;

  await producto.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The producto with id: ${producto.id} has been deleted`,
  });
});
