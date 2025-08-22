import { DataTypes } from 'sequelize';
import { db } from '../../../db/mysql.js';

const ProductoPedido = db.define(
  'productos_pedidos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'productos_pedidos',
    timestamps: false,
  }
);

export { ProductoPedido };
