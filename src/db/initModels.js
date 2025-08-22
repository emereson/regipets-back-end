import { DatosClientes } from '../modules/checkout/datosClientes/datosClientes.model.js';
import { Pedido } from '../modules/checkout/pedido/pedido.model.js';
import { ProductoPedido } from '../modules/checkout/productosPedido/productosPedido.model.js';
import { Mascota } from '../modules/mascotas/mascota.model.js';
import { User } from '../modules/user/user.model.js';

const initModel = () => {
  User.hasMany(Mascota, { foreignKey: 'usuario_id', as: 'mascotas' });
  Mascota.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

  Pedido.hasMany(ProductoPedido, { foreignKey: 'pedido_id', as: 'productos' });
  ProductoPedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

  Pedido.hasOne(DatosClientes, { foreignKey: 'pedido_id', as: 'cliente' });
  DatosClientes.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
};

export { initModel };
