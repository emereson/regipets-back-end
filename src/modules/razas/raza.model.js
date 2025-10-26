import { DataTypes } from 'sequelize';
import { db } from '../../db/mysql.js';

const Raza = db.define(
  'raza',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    especie_id: {
      type: DataTypes.INTEGER(255),
      allowNull: true,
    },
    title_en: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },
    title_es: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
    description_en: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description_es: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    hidden: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'raza',
    timestamps: false, // si quieres usar created_at y updated_at manualmente
  }
);

export { Raza };
