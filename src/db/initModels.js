import { Mascota } from "../modules/mascotas/mascota.model.js";
import { User } from "../modules/user/user.model.js";

const initModel = () => {
  User.hasMany(Mascota, { foreignKey: "usuario_id", as: "mascotas" });
  Mascota.belongsTo(User, { foreignKey: "usuario_id", as: "usuario" });
};

export { initModel };
