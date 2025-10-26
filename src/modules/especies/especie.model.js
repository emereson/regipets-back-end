import { DataTypes } from 'sequelize';
import { db } from '../../db/mysql.js';

const Especie = db.define(
  'especie',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title_en: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    title_es: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },

    hidden: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'especie',
    timestamps: false, // si quieres usar created_at y updated_at manualmente
  }
);

export { Especie };
