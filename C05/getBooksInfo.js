const fs = require('fs');
const fetch = require('node-fetch');

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

async function getBooksInfo() {
  const promises = [];
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

  const books = results.reduce((arr, res) => {
    if (res.totalItems > 0) {
      const b = res.items[0].volumeInfo;
      arr.push({
        title: b.title,
        author: b.authors.join(','),
        year: b.publishedDate.split('-')[0],
        description: b.description,
        photoURL: b.imageLinks.thumbnail,
        score: Math.ceil(Math.random() * 5),
        pageCount: b.pageCount,
        borrowed: (Math.random() - 0.5) > 0,
      });
    }
    return arr;
  }, []);
  return fs.writeFile('dist/books.json', JSON.stringify(books), (err) => {
    if (err) throw err;
    console.log('Success!');
  });
}

getBooksInfo();
