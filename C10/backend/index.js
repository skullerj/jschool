const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { socketListen } = require('./app/sockets')

const app = express()
const server = require('http').Server(app)

// Get configurations
const config = require('config')
const booksRouter = require('./app/routes/books')
const authRouter = require('./app/routes/auth')

mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true }, (error) => {
  if (error) { console.error(error) }
  socketListen(server)
  server.listen(config.get('port'))
  console.log('We are on baby!')
})

// JWT token detection

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, config.get('jwtSecret'), (err, decode) => {
      if (err) {
        req.user = undefined
      } else {
        req.user = decode
      }
      next()
    })
  } else {
    req.user = undefined
    next()
  }
})

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Mount routes
app.get('/', (req, res) => {
  res.send('Welcome to the bookshelf API.')
})
app.use('/books', booksRouter)
app.use('/auth', authRouter)

// 404 at the end
app.use((req, res) => {
  res.status(404).send('Not found.')
})

// Export for testing purposes
module.exports = { app, connection: mongoose.connection }
