import { DatosClientes } from '../modules/checkout/datosClientes/datosClientes.model.js';
import { Pedido } from '../modules/checkout/pedido/pedido.model.js';
import { ProductoPedido } from '../modules/checkout/productosPedido/productosPedido.model.js';
import { Mascota } from '../modules/mascotas/mascota.model.js';
import { User } from '../modules/user/user.model.js';
import { Departamentos } from '../modules/ubigeos/departamentos/departamentos.model.js';
import { Provincias } from '../modules/ubigeos/provincias/provincias.model.js';
import { Distritos } from '../modules/ubigeos/distritos/distritos.model.js';
import { Raza } from '../modules/razas/raza.model.js';
import { Especie } from '../modules/especies/especie.model.js';
import { Convenio } from '../modules/convenio/convenio.model.js';
import { Referido } from '../modules/referidos/referidos.model.js';

const initModel = () => {
  User.hasMany(Mascota, { foreignKey: 'usuario_id', as: 'mascotas' });
  Mascota.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

  User.hasMany(Mascota, { foreignKey: 'usuario_registrado_id', as: 'mascotas_creador' });
  Mascota.belongsTo(User, { foreignKey: 'usuario_registrado_id', as: 'creador' });

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

  // Razas
  Especie.hasMany(Raza, { foreignKey: 'especie_id', as: 'razas' });
  Raza.belongsTo(Especie, { foreignKey: 'especie_id', as: 'especie' });
  // Razas

  // Convenios
  Departamentos.hasMany(Convenio, {
    foreignKey: 'departamento_id',
    as: 'convenios',
  });
  Convenio.belongsTo(Departamentos, {
    foreignKey: 'departamento_id',
    as: 'departamento',
  });

  Provincias.hasMany(Convenio, { foreignKey: 'provincia_id', as: 'convenios' });
  Convenio.belongsTo(Provincias, {
    foreignKey: 'provincia_id',
    as: 'provincia',
  });

  Distritos.hasMany(Convenio, { foreignKey: 'distrito_id', as: 'convenios' });
  Convenio.belongsTo(Distritos, { foreignKey: 'distrito_id', as: 'distrito' });

  // Convenios

  Pedido.hasMany(ProductoPedido, { foreignKey: 'pedido_id', as: 'productos' });
  ProductoPedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

  Pedido.hasOne(DatosClientes, { foreignKey: 'pedido_id', as: 'cliente' });
  DatosClientes.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

  Pedido.hasOne(Referido, { foreignKey: 'pedido_id', as: 'referido' });
  Referido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
};

export { initModel };
