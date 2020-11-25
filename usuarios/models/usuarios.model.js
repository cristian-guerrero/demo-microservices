const {Model, DataTypes } = require("sequelize");
const sqz = require('../db');


class Usuario extends Model {
}

Usuario.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

}, {

  sequelize: sqz, 
  modelName: 'Usuario',
  tableName: 'usuario',
  timestamps: true,
  // paranoid: true,

});

// Usuario.sync({alter: true, force: true})



module.exports = Usuario
