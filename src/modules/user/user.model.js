import { DataTypes } from 'sequelize';
import { db } from '../../db/mysql.js';

const User = db.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    avatar_facebook: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    token_activacion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    token_facebook: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    token_password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    creador_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rol: {
      type: DataTypes.ENUM(
        'Admin',
        'Cliente RUMP',
        'Cliente Premium',
        'Embajador',
        'Aliado',
        'Gobierno'
      ),
      defaultValue: 'Cliente RUMP',
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false, // usamos manualmente created_at y updated_at
    underscored: true, // para mapear con snake_case
  }
);

export { User };
