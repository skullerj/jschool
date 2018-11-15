const request = require('supertest');
const fixtureLoader = require('node-mongoose-fixtures');
const fixtures = require('./fixtures.json');
const { app, connection } = require('../index.js');

const { expect } = request('chai');

describe('API tests', () => {
  before((done) => {
    // Drop test database and load fixtures
    connection.once('open', () => {
      connection.db.dropDatabase(() => {
        fixtureLoader(fixtures, (err) => {
          if (err) return done(err);
          return done();
        });
      });
    });
  });
  describe('Welcome route', () => {
    it('returns a welcome message', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Welcome to the bookshelf API.')
        .end(done);
    });
  });
  describe('Auth routes', () => {
    describe('POST /auth/register', () => {
      it('returns a 400 when username or password are missing', (done) => {
        request(app)
          .post('/auth/register')
          .send({ username: 'johndoe' })
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            if (err) return done();
            const { error } = res;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Missing user password');
            return done();
          });
      });

      it('returns a 400 when username already exists', (done) => {
        request(app)
          .post('/auth/register')
          .send(fixtures.users[0])
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            if (err) return done();
            const { error } = res;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Username already exists');
            return done();
          });
      });

      it('returns a 201 when user has been registered successfully', (done) => {
        request(app)
          .post('/auth/register')
          .send({ username: 'johndoe2', password: 'iamjohndoe2' })
          .expect(201)
          .end(done);
      });
    });
    describe('POST /auth/login', () => {
      it('returns a 401 when user lack propper credentials', (done) => {
        request(app)
          .post('/auth/register')
          .send({ username: 'asdf' })
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Invalid username or password');
            return done();
          });
      });

      it('returns a 200 and a JWT when authentication was succesful', (done) =>{
        const us = fixtures.users[0];
        request(app)
          .post('/auth/register')
          .send({ username: us.username, password: us.password })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const { body } = res;
            expect(body).to.be.a('object');
            expect(body).to.have.property('jwt');
            return done();
          });
      });
    });
  });
  describe('Books routes', () => {
    let books = [];
    let token = null;
    before((done) => {
      // Retrive book fixtures
      const us = fixtures.users[0];
      fixtureLoader.get('book', (err, fixBooks) => {
        if (err) throw err;
        books = fixBooks;
        // Get a jwt to check next calls
        request(app)
          .post('/auth/register')
          .send({ username: us.username, password: us.password })
          .end((res) => {
            token = res.body.jwt;
            done();
          });
      });
    });
    describe('GET /books', () => {
      it('responds with a 401 when no jwt is sent', (done) => {
        request(app)
          .get('/books')
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access. Login First');
            return done();
          });
      });
      it('responds with a 403 when an invalid jwt is sent', (done) => {
        request(app)
          .get('/books')
          .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
          .expect('Content-Type', /json/)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Access forbidden');
            return done();
          });
      });
      it('responds with a 200 and all books', (done) => {
        request(app)
          .get('/books')
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const resultBooks = res.body.data;
            expect(resultBooks).to.be.an('array');
            expect(resultBooks.length).to.equal(books.length);
            return done();
          });
      });
      it('responds with a 200 and the books matching sent shelf', (done) => {
        request(app)
          .get('/books?shelf=quito')
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const resultBooks = res.body.data;          
            expect(resultBooks).to.be.an('array');
            const firstBook = resultBooks[0];
            expect(firstBook.shelf).to.equal('quito');
            return done();
          });
      });
    });
    describe('GET /books/:id', () => {
      const validBook = books[0];
      it('responds with a 401 when no jwt is sent', (done) => {
        request(app)
          .get(`/books/${validBook.id}`)
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access. Login First');
            return done();
          });
      });
      it('responds with a 403 when an invalid jwt is sent', (done) => {
        request(app)
          .get(`/books/${validBook.id}`)
          .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
          .expect('Content-Type', /json/)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Access forbidden');
            return done();
          });
      });
      it('responds with a 200 and single book', (done) => {
        request(app)
          .get(`/books/${validBook.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const book = res.body.data;
            expect(book).to.be.an('object');
            expect(book.title).to.equal(validBook.title);
            expect(book.description).to.equal(validBook.description);
            expect(book.year).to.equal(validBook.year);
            expect(book.pageCount).to.equal(validBook.pageCount);
            expect(book.author).to.equal(validBook.author);
            expect(book.id).to.equal(validBook.id);
            return done();
          });
      });
      it('responds with a 404 if the book does not exist', (done) => {
        request(app)
          .get('/books/somefakeid')
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Book not found.');
            return done();
          });
      });
    });
    describe('POST /books/lend/:id', () => {
      const testBook = books.find(b => !b.lended);
      before(() => {
        // Check if the book we are lending is not lended to begin with
        if (testBook.lended || testBook.lendedBy) {
          throw new Error('Invalid book selected');
        }
      });
      it('responds with a 401 when no jwt is sent', (done) => {
        request(app)
          .get(`/books/lend/${testBook.id}`)
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access. Login First');
            return done();
          });
      });
      it('responds with a 403 when an invalid jwt is sent', (done) => {
        request(app)
          .get(`/books/lend/${testBook.id}`)
          .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
          .expect('Content-Type', /json/)
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Access forbidden');
            return done();
          });
      });
      it('responds with a 200 and some confirmation data', (done) => {
        request(app)
          .get(`/books/lend/${testBook.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const result = res.body.data;
            expect(result).to.be.an('object');
            expect(result.lended).to.equal(true);
            return done();
          });
      });
      it('responds with a 409 when the book is already lent ', (done) => {
        request(app)
          .get(`/books/lend/${testBook.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(409)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Book already lent.');
            return done();
          });
      });
      it('responds with a 404 if the book does not exist', (done) => {
        request(app)
          .get('/books/lend/somefakeid')
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Book not found.');
            return done();
          });
      });
    });

  });
});
