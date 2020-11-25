const { Router } = require('express')


const router = Router()


router.get('/api/event', (req, res) => {


  res.send({ message: 'Lista de evento' })
})




module.exports = router