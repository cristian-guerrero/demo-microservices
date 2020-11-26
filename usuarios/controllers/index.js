const service = require('../services')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const listaUsuarios = async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const lista = await service.listaUsuarios()

  res.send({
    message: 'Lista de usuarios',
    data: lista
  })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const crearUsuario = async (req, res) => {

  try {
    const {nombre, cedula} = req.body

    const user = await service.crearUsuario(nombre, cedula)


    service.emitEvent('userCreated', user.get('id'))

    res.status(201).send({
      message: 'Usuario Creado',
      data: user
    })
  } catch (err) {
    console.error(err)

    if (err.message === 'Validation error') {
      return res.status(401).send({
        message: 'Cedula ya registrada',

      })
    }
    res.status(500).send({
      message: 'Ocurrio un error inesperado',

    })
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const usuarioPorCedula = async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const lista = await service.usuarioPorCedula(id)
  res.send({
    message: 'Usuario',
    data: lista
  })
}


/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const eliminarUsuario = async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const user = await service.usuarioPorCedula(id)

  if (!user) {
    res.status(404).send({
      message: 'Usuario no existe',
      data: null
    })
  }

  const lista = await service.eliminarUsuario(id)

  service.emitEvent('userDeleted', user.get('id'))


  res.send({
    message: 'Usuario eliminado',
    data: lista
  })
}

const actualizarUsuario = async (req, res) => {

  try {
    const {nombre, cedula} = req.body
    const {id} = req.params

    let newData = {
      ...nombre && {nombre}
    }

    if (cedula && cedula !== id) {

      const usuarioExiste = await service.usuarioPorCedula(cedula)
      if (usuarioExiste) {
        return res.status(401).send({
          message: 'Cedula ya registrada',

        })
      }
      newData.cedula = cedula

    }

    // console.log('new data -----------------', newData)

    const user = await service.actualizarUsuario(newData, id)


    res.status(201).send({
      message: 'Usuario actualizado',
      data: user
    })
  } catch (err) {
    console.error(err)

    if (err.message === 'Validation error') {
      return res.status(401).send({
        message: 'Cedula ya registrada',

      })
    }
    res.status(500).send({
      message: 'Ocurrio un error inesperado',

    })
  }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const event = async (req, res) => {

  // await Usuario.sync({alter: true, force: true})
  let {event} = req.body

  console.log(event)
}

module.exports = {
  listaUsuarios,
  crearUsuario,
  usuarioPorCedula,
  eliminarUsuario,
  event,
  actualizarUsuario

}


