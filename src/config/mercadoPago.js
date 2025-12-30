// utils/mercadoPago.js
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { FRONTEND_URL, MP_ACCESS_TOKEN, WEBHOOK_URL } from '../../config.js';

const client = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN, // Usa variables de entorno
  options: { timeout: 5000 },
});

export const crearPreference = async (pedido, productos, customerData) => {
  const preference = new Preference(client);

  const items = productos.map((p) => ({
    title: p.nombre,
    unit_price: Number(p.precio),
    quantity: Number(p.quantity),
    currency_id: 'PEN', // asegúrate de usar la moneda correcta
  }));

  items.push({
    title: 'Costo de Envío',
    unit_price: Number(pedido.costo_envio),
    quantity: 1,
    currency_id: 'PEN',
  });

  const body = {
    items,
    payer: {
      name: customerData.nombre,
      email: customerData.email,
      identification: {
        type: 'DNI',
        number: customerData.dni,
      },
    },
    back_urls: {
      success: `${FRONTEND_URL}/success/${pedido.id}`,
    },
    auto_return: 'approved',
    notification_url: `${WEBHOOK_URL}/pedido/webhook`,

    external_reference: String(pedido.id),
  };

  const response = await preference.create({ body });

  return response;
};

export const processPayment = async (paymentId) => {
  const paymentClient = new Payment(client);
  return paymentClient.get({ id: paymentId });
};
