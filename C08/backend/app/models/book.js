const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const { Schema } = mongoose
const { validateReturnDate } = require('../utils')

const locationSchema = new Schema({
  name: { type: String, enum: ['quito', 'medellin', 'cartagena', 'digital'] },
  onInventory: { type: Number, min: 0 }
}, { _id: false })
locationSchema.virtual('available')
  .get(function getAvailable () {
    return this.name === 'digital' ? 100 : this.onInventory
  })
  .set(function setAvailable (v) {
    if (this.name !== 'digital') {
      this.onInventory = v
    }
  })
locationSchema.virtual('availableAfterLend')
  .get(function getAvailableAfter () {
    return this.name === 'digital' ? 100 : this.onInventory - 1
  })

const lendRecord = new Schema({
  userId: ObjectId,
  returnDate: {
    type: Date,
    validate: {
      validator: validateReturnDate,
      message: 'Can\'t lend books for more than 15 days'
    }
  }
}, { _id: false })

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  photoURL: { type: String, required: true },
  score: { type: Number, required: true },
  pageCount: { type: Number, required: true },
  locations: {
    type: [locationSchema],
    validate: {
      validator: function validateLocations (locations) {
        return (new Set(locations.map(l => l.name))).size === locations.length
      },
      message: 'Only entry per location name allowed.'
    }
  },
  lentTo: {
    type: [lendRecord],
    default: [],
    validate: {
      validator: function validateLentTo (records) {
        const ids = records.map(r => r.userId)
        return (new Set(ids)).size === ids.length
      },
      message: 'Can\'t lend book twice to the same user.'
    }
  }
})

bookSchema.virtual('availableLocations').get(function getAvailableLocations () {
  return this.locations.reduce((res, l) => {
    if (l.available >= 1) {
      res.push(l.name)
    }
    return res
  }, [])
})

bookSchema.virtual('lendingUsers').get(function getAvailableLocations () {
  return this.lentTo.reduce((res, r) => {
    res.push(r.userId.toString())
    return res
  }, [])
})

bookSchema.methods.toPublic = function publicBook (userId) {
  const parsedBook = Object.assign({}, this.toJSON())
  parsedBook.availableLocations = this.availableLocations
  parsedBook.id = this._id
  parsedBook.lentTo.forEach(r => {
    if (r.userId.toString() === userId) {
      parsedBook.returnDate = r.returnDate
    }
  })
  delete parsedBook._id
  delete parsedBook.lentTo
  delete parsedBook.locations
  return parsedBook
}

module.exports = mongoose.model('book', bookSchema)
