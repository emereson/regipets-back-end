import { DataTypes } from 'sequelize';
import { db } from '../../../db/mysql.js';

const DatosClientes = db.define(
  'datos_cliente',
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
    celular: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    distrito: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nombre_apellidos: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    provincia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    referencia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'datos_cliente',
    timestamps: false, // Si quieres manejar created_at y updated_at manualmente
  }
);

export { DatosClientes };
