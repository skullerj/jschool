const express = require('express')

const router = express.Router()
const Book = require('../models/book.js')
const isAuthenticated = require('../policies/isAuthenticated')
const { formatError, validateReturnDate } = require('../utils')
// Used to parse params and convert them into mongoose filters
function queryToFilters (query) {
  const filters = {}
  if (query.location) {
    filters['locations.name'] = query.location
  }
  if (query.title) {
    filters['title'] = { '$regex': new RegExp(`${query.title}`, 'i') }
  }
  return filters
}

// Require authentication for all this routes
router.use(isAuthenticated)

// *GET* Get all Books
router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.limit || 15)
  const page = parseInt(req.query.page || 1)
  Book.find(queryToFilters(req.query)).skip(limit * (page - 1)).limit(limit).exec((err, books) => {
    if (err) return next(err)
    return res.json({ data: books.map(b => b.toPublic(req.user.sub)) })
  })
})

// *GET* Get a specific book
router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      // When the sent id is not a valid id this error will pop
      if (err.name === 'CastError' && err.path === '_id') {
        return res.status(404).json(formatError('Book not found.', 404))
      }
      return next(err)
    }
    if (!book) return res.status(404).json(formatError('Book not found.', 404))
    return res.json({ data: book.toPublic(req.user.sub) })
  })
})

function checkMissingParams (params) {
  const missingParams = []
  if (!params.location) {
    missingParams.push('location')
  }
  if (!params.returnDate) {
    missingParams.push('returnDate')
  }
  return missingParams.length > 0 ? missingParams : false
}

// *POST* Lend a book
router.post('/:id/lend', (req, res, next) => {
  const missingParams = checkMissingParams(req.body)
  if (missingParams) {
    return res.status(400).json(formatError('Missing parameters.', 400, { missingParameters: missingParams }))
  }
  if (req.body.location === 'digital') {
    return res.status(400).json(formatError('Invalid lending location: digital.', 400))
  }
  if (!validateReturnDate(req.body.returnDate)) {
    return res.status(400).json(formatError('Invalid returnDate.', 400))
  }
  return Book.findById(req.params.id, (findError, book) => {
    if (findError) {
      // When the sent id is not a valid id this error will pop
      if (findError.name === 'CastError' && findError.path === '_id') {
        return res.status(404).json(formatError('Book not found.', 404))
      }
      return next(findError)
    }
    if (!book) return res.status(404).json(formatError('Book not found.', 404))
    if (book.availableLocations.indexOf(req.body.location) < 0) {
      return res.status(409).json(formatError('Book is not available at that location.', 409))
    }
    if (book.lendingUsers.indexOf(req.user.sub) >= 0) {
      return res.status(409).json(formatError('Book already lent.', 409))
    }

    const updatedLocations = book.locations.map((loc) => {
      if (loc.name === req.body.location) {
        return {
          name: loc.name,
          onInventory: loc.name === req.body.location ? loc.availableAfterLend : loc.available
        }
      }
      return loc
    })
    book.set({
      lentTo: [...book.lentTo, { userId: req.user.sub, returnDate: req.body.returnDate, location: req.body.location }],
      locations: updatedLocations
    })
    return book.save((updateError) => {
      if (updateError) return next(updateError)
      return res.json({ data: { lended: true } })
    })
  })
})

module.exports = router
