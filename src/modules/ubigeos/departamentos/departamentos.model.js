import { DataTypes } from 'sequelize';
import { db } from '../../../db/mysql.js';

const Departamentos = db.define('departamentos', {
  id: {
    primaryKey: true,
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
  },
  departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Departamentos };
