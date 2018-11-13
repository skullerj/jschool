const express = require('express');

const router = express.Router();
const Book = require('../models/book.js');
// *GET* Get all Books
router.get('/', (req, res, next) => {
  Book.find({}, (err,books) => {
    if (err) return next(err);
    res.json(books);
  });
});

// *POST *
router.post('/', (req, res, next) => {
  
});

// *GET* Get all Books
router.get('/', (req,res,next) => {
  res.send('Hello');
});

// *GET* Get all Books
router.get('/', (req,res,next) => {
  res.send('Hello');
});

module.exports = router;
