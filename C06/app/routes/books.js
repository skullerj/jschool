const express = require('express');

const router = express.Router();
const Book = require('../models/book.js');
const isAuthenticated = require('../policies/isAuthenticated');
const { formatError } = require('../utils');

// Used to parse params and convert them into mongoose filters
function queryToFilters(query) {
  const filters = {};
  if (query.location) {
    filters['locations.name'] = query.location;
  }
  return filters;
}

// Require authentication for all this routes
router.use(isAuthenticated);

// *GET* Get all Books
router.get('/', (req, res, next) => {
  Book.find(queryToFilters(req.query), (err, books) => {
    if (err) return next(err);
    return res.json({ data: books.map(b => b.toPublic()) });
  });
});

// *GET* Get a specific book
router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      // When the sent id is not a valid id this error will pop
      if (err.name === 'CastError' && err.path === '_id') {
        return res.status(404).json(formatError('Book not found.', 404));
      }
      return next(err);
    }
    if (!book) return res.status(404).json(formatError('Book not found.', 404));
    return res.json({ data: book.toPublic() });
  });
});

// *POST* Lend a book
router.post('/:id/lend', (req, res, next) => {
  if (!req.body.location) {
    return res.status(400).json(formatError('Location is required.', 400));
  }
  return Book.findById(req.params.id, (findError, book) => {
    if (findError) {
      // When the sent id is not a valid id this error will pop
      if (findError.name === 'CastError' && findError.path === '_id') {
        return res.status(404).json(formatError('Book not found.', 404));
      }
      return next(findError);
    }
    if (!book) return res.status(404).json(formatError('Book not found.', 404));
    if (book.availableLocations.indexOf(req.body.location) < 0) {
      return res.status(409).json(formatError('Book is not available at that location.', 409));
    }
    if (book.lentTo.indexOf(req.user.sub) >= 0) {
      return res.status(409).json(formatError('Book already lent.', 409));
    }
    const updatedLocations = book.locations.map((loc) => {
      if (loc.name === req.body.location) {
        return {
          name: loc.name,
          onInventory: loc.name === req.body.location ? loc.availableAfterLend : loc.available,
        };
      }
      return loc;
    });
    book.set({
      lentTo: [...book.lentTo, req.user.sub],
      locations: updatedLocations,
    });
    return book.save((updateError) => {
      if (updateError) return next(updateError);
      return res.json({ data: { lended: true } });
    });
  });
});


module.exports = router;
