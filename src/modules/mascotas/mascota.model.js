import { DataTypes, Sequelize } from 'sequelize';
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
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
    responsable_2: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
    dni_responsable_2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    telefono_responsable_2: {
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
      defaultValue: false,
    },
    fallecido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_registrado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cod_microchip: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fecha_inscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_DATE'),
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
    estado_verificacion: {
      type: DataTypes.ENUM('APROBADO', 'PENDIENTE', 'DENEGADO'),
      allowNull: false,
      defaultValue: 'PENDIENTE',
    },
    tipo_mascota: {
      type: DataTypes.ENUM('PREMIUM', 'CLASICO'),
      allowNull: false,
      defaultValue: 'CLASICO',
    },
  },
  {
    tableName: 'mascotas',
    timestamps: true,
    underscored: true,
  }
);

export { Mascota };
