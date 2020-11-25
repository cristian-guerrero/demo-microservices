const {Model, DataTypes} = require("sequelize")
const sqz = require('../db');



class Libro extends Model {
}

Libro.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  prestado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }


}, {

  sequelize: sqz,
  modelName: 'Libro',
  tableName: 'libro',
  timestamps: true,
  // paranoid: true,

});

Libro.sync({alter: true, force: true})

module.exports = Libro
