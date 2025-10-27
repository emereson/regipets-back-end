import { DatosClientes } from '../modules/checkout/datosClientes/datosClientes.model.js';
import { Pedido } from '../modules/checkout/pedido/pedido.model.js';
import { ProductoPedido } from '../modules/checkout/productosPedido/productosPedido.model.js';
import { Mascota } from '../modules/mascotas/mascota.model.js';
import { User } from '../modules/user/user.model.js';
import { Departamentos } from '../modules/ubigeos/departamentos/departamentos.model.js';
import { Provincias } from '../modules/ubigeos/provincias/provincias.model.js';
import { Distritos } from '../modules/ubigeos/distritos/distritos.model.js';
import { Raza } from '../modules/razas/raza.model.js';

const initModel = () => {
  User.hasMany(Mascota, { foreignKey: 'usuario_id', as: 'mascotas' });
  Mascota.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

  // mascota
  Departamentos.hasMany(Mascota, {
    foreignKey: 'departamento_id',
    as: 'mascotas',
  });
  Mascota.belongsTo(Departamentos, {
    foreignKey: 'departamento_id',
    as: 'departamento',
  });

  Provincias.hasMany(Mascota, { foreignKey: 'provincia_id', as: 'mascotas' });
  Mascota.belongsTo(Provincias, {
    foreignKey: 'provincia_id',
    as: 'provincia',
  });

  Distritos.hasMany(Mascota, { foreignKey: 'distrito_id', as: 'mascotas' });
  Mascota.belongsTo(Distritos, { foreignKey: 'distrito_id', as: 'distrito' });

  Raza.hasMany(Mascota, { foreignKey: 'mascota_raza_id', as: 'mascotas' });
  Mascota.belongsTo(Raza, { foreignKey: 'mascota_raza_id', as: 'raza' });

  // mascota

  Pedido.hasMany(ProductoPedido, { foreignKey: 'pedido_id', as: 'productos' });
  ProductoPedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

  Pedido.hasOne(DatosClientes, { foreignKey: 'pedido_id', as: 'cliente' });
  DatosClientes.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
};

export { initModel };
