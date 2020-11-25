const {Router} = require('express')

const Usuario = require('../models/usuarios.model')
const router = Router()


router.get('/api/usuarios', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const lista = await Usuario.findAll()

  res.send({
    message: 'Lista de usuarios',
    data: lista
  })
})


router.post('/api/usuarios', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})


  try {
    const {nombre, cedula} = req.body

    const user = await Usuario.create({
      nombre, cedula
    })

    res.status(201).send({
      message: 'Usuario Creado',
      data: user
    })
  } catch (err) {

    if (err.message === 'Validation error') {
      return res.status(401).send({
        message: 'Cedula ya registrada',

      })
    }
    res.status(500).send({
      message: 'Ocurrio un error inexperado',

    })
  }
})

router.get('/api/usuarios/:id', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const lista = await Usuario.findOne({
    where:{
      cedula: id
    }
  })

  res.send({
    message: 'Usuario',
    data: lista
  })
})


router.delete('/api/usuarios/:id', async (req, res) => {

  // await Usuario.sync({alter: true, force: true})

  const {id} = req.params

  const lista = await Usuario.destroy({
    where:{
      cedula: id
    }
  })

  res.send({
    message: 'Usuario eliminado',
    data: lista
  })
})

module.exports = router