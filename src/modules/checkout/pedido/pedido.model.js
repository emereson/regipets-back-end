import { DataTypes } from 'sequelize';
import { db } from '../../../db/mysql.js';

const Pedido = db.define(
  'pedidos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provincia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    distrito: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sub_total: {
      // ✅ corregí el typo (antes estaba sub_totoal)
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    costo_envio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendiente', 'pagada', 'cancelada'),
      defaultValue: 'pendiente',
    },
    numero_operacion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fecha_pedido: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'pedidos', // ✅ corregido
    timestamps: false,
  }
);

export { Pedido };
