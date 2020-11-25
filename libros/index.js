const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes')

const app = express()

app.use(bodyParser.json())


app.use(router)


app.all('*', (req, res) => {
  const message = `${req.method} to ${req.get('host')}${req.originalUrl} not found`
  res.status(404).send({message})
})

app.listen(3000, () => {
  
  console.log('Libros en localhost:3000')
})