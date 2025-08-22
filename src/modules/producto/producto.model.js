import { DataTypes } from 'sequelize';
import { db } from '../../db/mysql.js';

const Producto = db.define(
  'productos',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'productos',
    timestamps: false, // Si quieres manejar created_at y updated_at manualmente
  }
);

export { Producto };
