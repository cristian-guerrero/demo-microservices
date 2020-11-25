const {Router} = require('express')

const axios = require('axios')

const router = Router()

const services = [
  'prestamos-clusterip-srv:3002',
  'libros-clusterip-srv:3001',
  'usuarios-clusterip-srv:3000',

]

const model = {
  type: 'tipoEvento',
  data: {}
}
router.post('/api/event-bus/event', (req, res) => {


  let {event} = req.body

  if (!event) {

    event = {
      type: undefined,
      data: undefined
    }
  }
  console.log('new event type: '+ event.type)

  for (const s of services) {
    axios.post(`http://${s}/api/event`, {event})
  }


  res.send({status: 'ok'})
})


module.exports = router