const express = require('express')
const jwt = require('jsonwebtoken')
const jwtSecret = require('config').get('jwtSecret')

const router = express.Router()
const User = require('../models/user')
const { formatError } = require('../utils')

function reduceValErrorMsg (e) {
  return Object.keys(e.errors).reduce((msg, key) => {
    msg.push(e.errors[key].message)
    return msg
  }, []).join(' ')
}

router.post('/register', (req, res, next) => {
  const newUser = new User(req.body)
  const validationError = newUser.validateSync()
  if (validationError) {
    const message = reduceValErrorMsg(validationError)
    return res.status(400).json(formatError(message, 400))
  }
  newUser.hashPassword()
  return newUser.save((err) => {
    if (err) {
      if (err.name && err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).json(formatError('Username already exists.', 400))
      }
      return next(err)
    }
    return res.sendStatus(201)
  })
})

router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return next(err)
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json(formatError('Invalid username or password', 401))
    }
    return res.json({ jwt: jwt.sign({ sub: user.id, username: user.username }, jwtSecret) })
  })
})

module.exports = router
