import { DataTypes } from 'sequelize';
import { db } from '../../db/mysql.js';

const Referido = db.define('referidos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER(255),
    allowNull: true,
  },
  pedido_id: {
    type: DataTypes.INTEGER(255),
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM('cobrado', 'pendiente'),
    defaultValue: 'pendiente',
  },
});

export { Referido };
