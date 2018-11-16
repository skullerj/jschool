const request = require('supertest');
const fixtureLoader = require('node-mongoose-fixtures');
const { expect } = require('chai');

const fixtures = require('./fixtures.json');
const { app, connection } = require('../index.js');

let books = [];

describe('API tests', () => {
  before((done) => {
    // Drop test database and load fixtures
    connection.once('open', () => {
      connection.db.dropDatabase(() => {
        fixtureLoader(fixtures, (err, data) => {
          if (err) return done(err);
          [, books] = data;
          return done();
        });
      });
    });
  });
  describe('Routing in general', () => {
    describe('GET /', () => {
      it('returns a welcome message', (done) => {
        request(app)
          .get('/')
          .expect(200)
          .expect('Welcome to the bookshelf API.')
          .end(done);
      });
    });
    describe('GET a non existing route', () => {
      it('returns a 404', (done) => {
        request(app)
          .get('/dogs')
          .expect(404)
          .expect('Not found.')
          .end(done);
      });
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
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Password required.');
            return done();
          });
      });

      it('returns a 400 when username already exists', (done) => {
        request(app)
          .post('/auth/register')
          .send(fixtures.user[0])
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Username already exists.');
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
          .post('/auth/login')
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

      it('returns a 200 and a JWT when authentication was succesful', (done) => {
        const us = fixtures.user[0];
        request(app)
          .post('/auth/login')
          .send({ username: us.username, password: us.unhashedpassword })
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
    let token = null;
    before((done) => {
      // Get a valid jwt
      const us = fixtures.user[0];
      request(app)
        .post('/auth/login')
        .send({ username: us.username, password: us.unhashedpassword })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.jwt;
          return done();
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
            expect(error.message).to.equal('Unauthorized access.');
            return done();
          });
      });
      it('responds with a 401 when an invalid jwt is sent', (done) => {
        request(app)
          .get('/books')
          .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access.');
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
      it('responds with a 200 and the books matching sent location', (done) => {
        request(app)
          .get('/books?location=quito')
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const resultBooks = res.body.data;
            expect(resultBooks).to.be.an('array');
            const firstBook = resultBooks[0];
            expect(firstBook.availableLocations).to.be.an('array');
            expect(firstBook.availableLocations).to.include('quito');
            return done();
          });
      });
    });
    describe('GET /books/:id', () => {
      let validBook;
      before(() => {
        [validBook] = books;
      });
      it('responds with a 401 when no jwt is sent', (done) => {
        request(app)
          .get(`/books/${validBook.id}`)
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access.');
            return done();
          });
      });
      it('responds with a 401 when an invalid jwt is sent', (done) => {
        request(app)
          .get(`/books/${validBook.id}`)
          .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access.');
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
    describe('POST /books/:id/lend', () => {
      let testBook;
      before((done) => {
        testBook = books.find(b => b.availableLocations.indexOf('quito') >= 0
                                && b.availableLocations.indexOf('cartagena') < 0);
        if (!testBook) return done(new Error('Fixtures do not contain expected test book'));
        return done();
      });
      it('responds with a 401 when no jwt is sent', (done) => {
        request(app)
          .post(`/books/lend/${testBook.id}`)
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access.');
            return done();
          });
      });
      it('responds with a 401 when an invalid jwt is sent', (done) => {
        request(app)
          .post(`/books/lend/${testBook.id}`)
          .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
          .expect('Content-Type', /json/)
          .expect(401)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Unauthorized access.');
            return done();
          });
      });
      it('responds with a 400 when no location is sent', (done) => {
        request(app)
          .post('/books/somefakeid/lend')
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Location is required.');
            return done();
          });
      });
      it('responds with a 404 if the book does not exist', (done) => {
        request(app)
          .post('/books/somefakeid/lend')
          .set('Authorization', `Bearer ${token}`)
          .send({ location: 'quito' })
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
      it('responds with a 409 when book exists but is not available', (done) => {
        request(app)
          .post(`/books/${testBook.id}/lend`)
          .set('Authorization', `Bearer ${token}`)
          .send({ location: 'cartagena' })
          .expect('Content-Type', /json/)
          .expect(409)
          .end((err, res) => {
            if (err) return done(err);
            const { error } = res.body;
            expect(error).to.be.an('object');
            expect(error.message).to.equal('Book is not available at that location.');
            return done();
          });
      });
      it('responds with a 200 and some confirmation data', (done) => {
        request(app)
          .post(`/books/${testBook.id}/lend`)
          .set('Authorization', `Bearer ${token}`)
          .send({ location: 'quito' })
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
          .post(`/books/${testBook.id}/lend`)
          .set('Authorization', `Bearer ${token}`)
          .send({ location: 'quito' })
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
    });
  });
});
