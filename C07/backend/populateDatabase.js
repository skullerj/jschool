const mongoose = require('mongoose');
const config = require('config');
const fetch = require('node-fetch');

const Book = require('./app/models/book');
const User = require('./app/models/user');

const booksISBNs = [
  '9780143127550',
  '9781501173219',
  '9780143126829',
  '9780802123701',
  '9780425274866',
  '9781476770390',
  '9780812976823',
  '9780804172448',
  '9780812993011',
  '9781439172742',
  '9781593279509',
  '9781449331818',
  '9780345816023',
  '9780307474728',
  '9781537392349',
];

function locationsGenerator() {
  const posiblelocations = ['quito', 'medellin', 'cartagena', 'digital'];
  return posiblelocations.reduce((res, loc) => {
    if ((Math.random() - 0.5) > 0) {
      res.push({
        name: loc,
        onInventory: Math.ceil(Math.random() * 5),
      });
    }
    return res;
  }, []);
}


async function populateDatabase() {
  await mongoose.connect(config.get('mongoUri'));
  await mongoose.connection.db.dropDatabase();
  let promises = [];
  let results;
  booksISBNs.forEach((isbn) => {
    promises.push(fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`));
  });
  try {
    results = await Promise.all(promises);
    results = await Promise.all(results.map(b => b.json()));
  } catch (e) {
    return e;
  }
  promises = [];

  results.forEach((res) => {
    if (res.totalItems === 0) {
      return;
    }
    const b = res.items[0].volumeInfo;
    const book = new Book({
      title: b.title,
      author: b.authors.join(','),
      year: b.publishedDate.split('-')[0],
      description: b.description,
      photoURL: b.imageLinks.thumbnail,
      score: Math.ceil(Math.random() * 5),
      pageCount: b.pageCount,
      locations: locationsGenerator(),
    });
    promises.push(book.save());
  });
  try {
    await Promise.all(promises);
  } catch (e) {
    return e;
  }
  // Create a sample user
  const user = new User({ username: 'frodo', password:'givemethatring' });
  user.hashPassword();
  try {
    await user.save();
  } catch (e) {
    return e;
  }
  console.log(`Success! Check the database at: ${config.get('mongoUri')}`);
  await mongoose.connection.close();
  return true;
}

populateDatabase();
