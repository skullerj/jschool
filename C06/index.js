const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// Get configurations
const config = require('config');

const booksRouter = require('./app/routes/books');
const authRouter = require('./app/routes/auth');

mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true }, (error) => {
  if (error) { console.error(error); }
  app.listen(config.get('port'));
  console.log('We are on baby!');
});

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount routes
app.get('/', (req, res) => {
  res.send('Welcome to the bookshelf API.');
});
app.use('/books', booksRouter);
app.use('/auth', authRouter);

// Error handler

app.use((err, req, res) => {
  res.status(err.status);
  res.json({ error: { message: err.message, status: err.status } });
});


// Export for testing purposes
module.exports = { app, connection: mongoose.connection };
