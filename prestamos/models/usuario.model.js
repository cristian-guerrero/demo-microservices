const {Model, DataTypes} = require("sequelize")
const sqz = require('../db');



class Usuario extends Model {
}

Usuario.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },



}, {

  sequelize: sqz,
  modelName: 'Usuario',
  tableName: 'usuario',
  timestamps: true,
  // paranoid: true,

});



module.exports = Usuario
