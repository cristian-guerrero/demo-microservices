
const axios = require('axios')

const Usuario = require('../models/usuarios.model')

const eventUrl = 'http://event-bus-clusterip-srv:3003/api/event-bus/event'


/**
 *
 * @returns {Promise<Usuario[]>}
 */
async  function  listaUsuarios() {

  return   Usuario.findAll({
    attributes: ['id', 'nombre', 'cedula']
  })

}



async function  crearUsuario(nombre, cedula) {
 return  await Usuario.create({
    nombre, cedula
  })
}

/**
 *
 * @param cedula
 * @returns {Promise<void>}
 */
async function  usuarioPorCedula(cedula) {
  return  Usuario.findOne({
    where: {
      cedula
    }
  })

}

async  function  eliminarUsuario(cedula) {
  return Usuario.destroy({
    where: {
      cedula
    }
  })
}

/**
 *
 * @param type
 * @param data
 */
function emitEvent(type, data) {
  axios.post(eventUrl,
    {
      event: {
        type,
        data
      }

    })
}


module.exports = {

  listaUsuarios, crearUsuario,
  emitEvent,usuarioPorCedula,
  eliminarUsuario

}