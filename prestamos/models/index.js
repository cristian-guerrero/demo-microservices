const Libro = require('./libros.model')
const Prestamo = require('./prestamo.model')
const Usuario = require('./usuario.model')


Libro.hasMany(Prestamo, {as: 'prestamos', foreignKey: {name: 'libro', allowNull: true}})
Prestamo.belongsTo(Libro, {as: 'libros', foreignKey: {name: 'libro', allowNull: true}})


Usuario.hasMany(Prestamo, {as: 'prestamos', foreignKey: {name: 'usuario', allowNull: true}})
Prestamo.belongsTo(Usuario, {as: 'usuarios', foreignKey: {name: 'usuario', allowNull: true}})


function sync() {

   Libro.sync({alter: true, force: true})
  Prestamo.sync({alter: true, force: true})
   Usuario.sync({alter: true, force: true})
}//

// sync()

module.exports = {
  Libro, Prestamo, Usuario
}