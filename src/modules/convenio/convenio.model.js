import { DataTypes } from 'sequelize';
import { db } from '../../db/mysql.js';

const Convenio = db.define('convenios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre_convenio: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING(555),
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  logo_convenio: {
    type: DataTypes.STRING(5000),
    allowNull: true,
  },
  categoria_convenio: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  beneficio_convenio: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  direccion_convenio: {
    type: DataTypes.STRING(5000),
    allowNull: true,
  },

  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  provincia_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  distrito_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export { Convenio };
