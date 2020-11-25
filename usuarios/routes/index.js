const { Router } = require('express')


const router = Router()


router.get('/api/libros', (req, res) => {


  res.send({ message: 'Lista de libros' })
})




module.exports = router