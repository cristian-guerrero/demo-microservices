const {Router} = require('express')

const router = Router()


const controller = require('../controllers')


/**
 *
 */
router.get('/api/usuarios', controller.listaUsuarios)

/**
 * crear usuario
 */
router.post('/api/usuarios', controller.crearUsuario)

/**
 *
 */
router.get('/api/usuarios/:id', controller.usuarioPorCedula)

/**
 *
 */
router.delete('/api/usuarios/:id', controller.eliminarUsuario)


router.post('/api/event', controller.event)



module.exports = router