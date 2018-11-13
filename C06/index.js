const express = require('express');

const app = express();
// Get database connection URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookshelf';
const mongoose = require('mongoose');

const booksRouter = require('./app/routes/books');
const authRouter = require('./app/routes/auth');

mongoose.connect(mongoURI, { useNewUrlParser: true }, (error) => {
  if (error) { console.error(error); }
  app.listen(8080);
  console.log('We are on baby!');
});

app.get('/', (req, res)=> {
  res.send('Welcome to the bookshelf API. ');
});
app.use('/books', booksRouter);
app.use('/auth', authRouter);
