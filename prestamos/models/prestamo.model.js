const {Model, DataTypes} = require("sequelize")
const sqz = require('../db');



class Prestamo extends Model {
}

Prestamo.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },

  entregado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }


}, {

  sequelize: sqz,
  modelName: 'Prestamo',
  tableName: 'prestamo',
  timestamps: true,
  // paranoid: true,

});



module.exports = Prestamo
