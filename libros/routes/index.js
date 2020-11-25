const {Router} = require('express')

const Libro = require('../models/libros.model')

const router = Router()

const axios = require('axios')

const eventUrl = 'http://event-bus-clusterip-srv:3003/api/event-bus/event'

/**
 *
 */
router.get('/api/libros', async (req, res) => {

  const lista = await Libro.findAll({
    attributes: ['id', 'nombre', 'isbn', 'prestado']
  })

  res.send({
    message: 'Lista de libros',
    data: lista
  })
})

/**
 * crear usuario
 */
router.post('/api/libros', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})


  try {
    const {nombre, isbn} = req.body

    const libro = await Libro.create({
      nombre, isbn
    })


    emitEvent('bookCreated', libro.get('id'))

    res.status(201).send({
      message: 'Libro Creado',
      data: libro
    })
  } catch (err) {
    console.error(err)

    if (err.message === 'Validation error') {
      return res.status(401).send({
        message: 'Isbn ya registrada',

      })
    }
    res.status(500).send({
      message: 'Ocurrio un error inesperado',

    })
  }
})

/**
 *
 */
router.get('/api/libros/:id', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const lista = await Libro.findOne({
    where: {
      isbn: id
    }
  })

  res.send({
    message: 'Libro',
    data: lista
  })
})

/**
 *
 */
router.delete('/api/libros/:id', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const user = await Libro.findOne({
    where: {
      isbn: id
    }
  })

  if (!user) {
    res.status(404).send({
      message: 'Libro no existe',
      data: null
    })
  }

  const lista = await Libro.destroy({
    where: {
      isbn: id
    }
  })

  emitEvent('bookDeleted', user.get('id'))


  res.send({
    message: 'Libro eliminado',
    data: lista
  })
})


router.post('/api/event', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})
  let {event} = req.body


  console.log('event ------------->', event.type)
  if (event.type === 'booking' || event.type === 'bookReturned') {
    let prestado = event.type === 'booking'

    console.log('------nuevo estado de prestado-->', prestado)
    await Libro.update({
      prestado
    }, {
      where: {
        id: event.data.libro
      }
    })
  }

  console.log(event)
})


function emitEvent(type, data) {
  axios.post(eventUrl,
    {
      event: {
        type,
        data
      }

    })
}


module.exports = router