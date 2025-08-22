import { where } from 'sequelize';
import {
  crearPreference,
  processPayment,
} from '../../../config/mercadoPago.js';
import { db } from '../../../db/mysql.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { costosDelivery } from '../../../utils/costoDelivery.js';
import { DatosClientes } from '../datosClientes/datosClientes.model.js';
import { ProductoPedido } from '../productosPedido/productosPedido.model.js';
import { Pedido } from './pedido.model.js';

export const findOne = catchAsync(async (req, res, next) => {
  const { pedido } = req;

  return res.status(200).json({
    status: 'Success',
    pedido,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { customerData, deliveryInfo, productos } = req.body;

  const calcularDelivery = () => {
    const costo = costosDelivery.find(
      (c) =>
        c.departamento.toUpperCase() ===
          deliveryInfo.departamento.toUpperCase() &&
        c.provincia.toUpperCase() === deliveryInfo.provincia.toUpperCase() &&
        c.distrito.toUpperCase() === deliveryInfo.distrito.toUpperCase()
    );

    return costo ? costo.valor : 15;
  };

  const totalProductos = productos.reduce(
    (acc, producto) => acc + producto.precio * producto.quantity,
    0
  );

  const costoDelivery = calcularDelivery();

  const t = await db.transaction();

  try {
    const pedido = await Pedido.create(
      {
        departamento: deliveryInfo.departamento,
        provincia: deliveryInfo.provincia,
        distrito: deliveryInfo.distrito,
        sub_total: totalProductos,
        costo_envio: costoDelivery,
        total: totalProductos + costoDelivery,
      },
      { transaction: t }
    );

    await DatosClientes.create(
      {
        pedido_id: pedido.id,
        nombre_apellidos: customerData.nombre_apellidos,
        celular: customerData.celular,
        departamento: deliveryInfo.departamento,
        direccion: customerData.direccion,
        distrito: deliveryInfo.distrito,
        dni: customerData.dni,
        email: customerData.email,
        provincia: deliveryInfo.provincia,
        referencia: customerData.referencia,
      },
      { transaction: t }
    );

    for (const producto of productos) {
      await ProductoPedido.create(
        {
          pedido_id: pedido.id,
          producto_id: producto.id,
          categoria: producto.categoria, // ojo: pusiste gategoria 👀
          nombre: producto.nombre,
          precio: producto.precio,
          quantity: producto.quantity,
        },
        { transaction: t }
      );
    }

    // Aquí podrías llamar crearPreference después de confirmar que todo está bien
    const preference = await crearPreference(pedido, productos, customerData);

    // Confirmar transacción
    await t.commit();

    res.status(201).json({
      status: 'success',
      message: 'Pedido creado con éxito',
      pedido,
      init_point: preference.init_point,
    });
  } catch (error) {
    // Revertir cambios si algo falla
    await t.rollback();
    return next(error);
  }
});

export const webhook = catchAsync(async (req, res, next) => {
  const { query } = req;
  console.log(query);

  // 👇 esto está bien, pero ojo: Mercado Pago envía la data en "query" o "body" según el evento
  const paymentId = query.id || query['data.id'];
  if (!paymentId) {
    throw new Error('ID de pago no proporcionado');
  }

  const paymentData = await processPayment(paymentId);
  console.log(paymentData);

  if (paymentData.status === 'approved') {
    await Pedido.update(
      { status: 'pagada' },
      { where: { id: paymentData.external_reference } }
    );
  }
  res.status(201).json({
    status: 'success',
    message: 'El pago se procesó correctamente',
    data: paymentData, // ✅ aquí puedes devolver info del pago o lo que quieras
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
