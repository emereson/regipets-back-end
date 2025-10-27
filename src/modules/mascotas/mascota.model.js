import { DataTypes } from 'sequelize';
import { db } from '../../db/mysql.js';

const Mascota = db.define(
  'mascotas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sexo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tamano: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fecha_nacimiento: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    biografia: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    calificacion: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    castrado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    fallecido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    mascota_raza_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    cod_microchip: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fecha_inscripcion: {
      type: DataTypes.STRING(23),
      allowNull: true,
    },
    usuario_crea: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    usuario_mod: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    fecha_muerte: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tipo_reg: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    especie_id: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: 'mascotas',
    timestamps: false, // si quieres usar created_at y updated_at manualmente
  }
);

export { Mascota };
