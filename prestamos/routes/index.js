const {Router} = require('express')

const {Usuario, Prestamo, Libro} = require('../models')
const router = Router()

const axios = require('axios')

const eventUrl = 'http://event-bus-clusterip-srv:3003/api/event-bus/event'

/**
 *
 */
router.post('/api/prestamos', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {usuario, libro} = req.body
  try {

    const libroExiste = await Libro.findByPk(libro)


    if (!libroExiste) {
      return res.status(404).send({
        message: 'El libro no existe',
        data: null
      })
    } else if (libroExiste.get('prestado')) {
      return res.status(404).send({
        message: 'El libro se encuentra prestado',
        data: null
      })
    }

    const usuarioExiste = await Usuario.findByPk(usuario)

    if (!usuarioExiste) {
      return res.status(404).send({
        message: 'El usuario no existe',
        data: null
      })
    }




    const prestamo = await Prestamo.create({
      libro,
      usuario
    })


    await Libro.update({
      prestado: true
    }, {
      where: {
      id: libro

      }
    })


    emitEvent('booking', {
      libro, usuario
    })


    res.send({
      message: 'Prestamo creado ',
      data: prestamo
    })
  } catch (err) {
    console.log(err)
    if(err?.parent?.routine === 'string_to_uuid') {
     return  res.status(500).send({
        message: 'Los datos ingresado no son correctos',
        data: null
      })
    }
    res.status(500).send({
      message: 'Ocurrio un error inesperado ',
      data: null
    })
  }
})

/**
 * crear usuario
 */
router.post('/api/prestamos/devolucion/:id', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})


  try {
    const {id} = req.params

    const prestamo = await Prestamo.findByPk(id)

    if(!prestamo) {

     return  res.status(200).send({
        message: 'No se encontro el prestamo',
        data: null
      })
    }



    const book = await Libro.findByPk(prestamo.get('libro'))


    if(book){
      const bookUpdated = await  Libro.update({
        prestado: false
      },{
        where: {
          id: prestamo.get('libro')
        }
      })
    }



    const prestamoActualizado = await Prestamo.update({
      entregado: true
    },{
      where: {
        id
      }
    })



    emitEvent('bookReturned',book ? prestamo.get('libro'): null)

    res.status(200).send({
      message: 'Libro devuelto con exito',
      data: prestamoActualizado
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
})

router.get('/api/prestamos/usuario/:id', async (req, res) => {

  const {id} = req.params

  const prestamos = await Prestamo.findAll({
    where: {
      usuario: id
    }
  })

  res.status(201).send({
    message: 'Lista de prestamos',
    data: prestamos
  })

})



router.post('/api/event', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})
  let {event} = req.body

  console.log('event ------------->',event.type)
  if (event.type === 'userCreated') {

   await  crearUsuario(event.data)
  } else if (event.type === 'userDeleted') {

    await eliminarUsuario(event.data)

  } else if (event.type === 'bookCreated') {

   await crearLibro(event.data)
  } else if (event.type === 'bookDeleted') {

   await eliminarLibro(event.data)
  }

  // console.log(event)
})

/**
 *
 * @param id
 * @returns {Promise<Usuario>}
 */
async function crearUsuario(id) {
  return Usuario.create({id})

}

/**
 *
 * @param id
 * @returns {Promise<Libro>}
 */
async function crearLibro(id) {
  console.log('creating boook ----------->', id)

  return Libro.create({id})

}

/**
 *
 * @param id
 * @returns {Promise<number>}
 */
async function eliminarUsuario(id) {

  return Usuario.destroy({
    where: {
      id
    }
  })
}

/**
 *
 * @param id
 * @returns {Promise<number>}
 */
async function eliminarLibro(id) {
  return Libro.destroy({
    where: {
      id
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

/**
 *
 * @param usuario
 * @param libro
 * @returns {Promise<void>}
 */
async function prestamoValidacionInicil(usuario, libro) {

}


module.exports = router