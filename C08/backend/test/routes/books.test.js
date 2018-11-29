/* globals describe, before, it */
const request = require('supertest')
const { expect } = require('chai')

const fixtures = require('../fixtures.json')

describe('Books routes', () => {
  let token = null
  let app
  let books
  before((done) => {
    // Get a valid jwt from the same frodo we lended the book to
    const us = fixtures.user.reduce((res, u) => {
      if (u.username === 'frodo') {
        return u
      } else {
        return res
      }
    }, null)
    app = global.app
    books = global.books
    request(app)
      .post('/auth/login')
      .send({ username: us.username, password: us.unhashedpassword })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        token = res.body.jwt
        return done()
      })
  })
  describe('GET /books', () => {
    it('responds with a 401 when no jwt is sent', (done) => {
      request(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Unauthorized access.')
          return done()
        })
    })
    it('responds with a 401 when an invalid jwt is sent', (done) => {
      request(app)
        .get('/books')
        .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Unauthorized access.')
          return done()
        })
    })
    it('responds with a 200 and 15 books which is the default limit', (done) => {
      request(app)
        .get('/books')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const resultBooks = res.body.data
          expect(resultBooks).to.be.an('array')
          expect(resultBooks.length).to.equal(15)
          return done()
        })
    })
    it('responds with a 200 and the limit quantity of books', (done) => {
      request(app)
        .get('/books?limit=5')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const resultBooks = res.body.data
          expect(resultBooks).to.be.an('array')
          expect(resultBooks.length).to.equal(5)
          return done()
        })
    })
    it('responds with a 200 and the remaining books in the last page', (done) => {
      const page = Math.ceil(books.length / 10)
      const remaining = books.length % 10
      request(app)
        .get(`/books?page=${page}&limit=10`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const resultBooks = res.body.data
          expect(resultBooks).to.be.an('array')
          expect(resultBooks.length).to.equal(remaining)
          return done()
        })
    })
    it('responds with a 200 and the books matching sent location', (done) => {
      request(app)
        .get('/books?location=quito')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const resultBooks = res.body.data
          expect(resultBooks).to.be.an('array')
          const firstBook = resultBooks[0]
          expect(firstBook.availableLocations).to.be.an('array')
          expect(firstBook.availableLocations).to.include('quito')
          return done()
        })
    })
    it('responds with a 200 and the books containing sent title', (done) => {
      const searchingTitle = 'redep'
      const desiredBooks = books.filter((b) => {
        return b.title.toLowerCase().indexOf(searchingTitle) >= 0
      })
      request(app)
        .get(`/books?title=${searchingTitle}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const resultBooks = res.body.data
          expect(resultBooks).to.be.an('array')
          expect(resultBooks.length).to.equal(desiredBooks.length)
          expect(resultBooks[0].title).to.equal(desiredBooks[0].title)
          return done()
        })
    })
  })
  describe('GET /books/:id', () => {
    let validBook
    let lentBook
    before(() => {
      [validBook] = books
      // Find that book we lent to frodo
      lentBook = books.reduce((res, b) => {
        if (b.lentTo.length > 0) {
          return b
        } else {
          validBook = b
          return res
        }
      }, null)
    })
    it('responds with a 401 when no jwt is sent', (done) => {
      request(app)
        .get(`/books/${validBook.id}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Unauthorized access.')
          return done()
        })
    })
    it('responds with a 401 when an invalid jwt is sent', (done) => {
      request(app)
        .get(`/books/${validBook.id}`)
        .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Unauthorized access.')
          return done()
        })
    })
    it('responds with a 200 and single book', (done) => {
      request(app)
        .get(`/books/${validBook.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const book = res.body.data
          expect(book).to.be.an('object')
          expect(book.title).to.equal(validBook.title)
          expect(book.description).to.equal(validBook.description)
          expect(book.year).to.equal(validBook.year)
          expect(book.pageCount).to.equal(validBook.pageCount)
          expect(book.author).to.equal(validBook.author)
          expect(book.id).to.equal(validBook.id)
          expect(book.returnDate).to.equal(undefined)
          return done()
        })
    })
    it('responds with a 200 and a book with returnDate setted when user has lend that book', (done) => {
      request(app)
        .get(`/books/${lentBook.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const book = res.body.data
          expect(book).to.be.an('object')
          expect(new Date(book.returnDate).getTime()).to.equal(lentBook.lentTo[0].returnDate.getTime())
          return done()
        })
    })
    it('responds with a 404 if the book does not exist', (done) => {
      request(app)
        .get('/books/somefakeid')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Book not found.')
          return done()
        })
    })
  })
  describe('POST /books/:id/lend', () => {
    let testBook
    const validTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
    const futureTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    before((done) => {
      testBook = books.find(b => b.availableLocations.indexOf('quito') >= 0 &&
                              b.availableLocations.indexOf('cartagena') < 0 && b.lentTo.length === 0)
      if (!testBook) return done(new Error('Fixtures do not contain expected test book'))
      return done()
    })
    it('responds with a 401 when no jwt is sent', (done) => {
      request(app)
        .post(`/books/lend/${testBook.id}`)
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Unauthorized access.')
          return done()
        })
    })
    it('responds with a 401 when an invalid jwt is sent', (done) => {
      request(app)
        .post(`/books/lend/${testBook.id}`)
        .set('Authorization', 'Bearer 123123asdfasdf123123asdfasdfa')
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Unauthorized access.')
          return done()
        })
    })
    it('responds with a 400 when any required parameters are missing', (done) => {
      request(app)
        .post(`/books/${testBook.id}/lend`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Missing parameters.')
          expect(error.missingParameters).to.include('location')
          expect(error.missingParameters).to.include('returnDate')
          return done()
        })
    })
    it('responds with a 400 when returnDate is more than 15 days from now', (done) => {
      request(app)
        .post(`/books/${testBook.id}/lend`)
        .set('Authorization', `Bearer ${token}`)
        .send({ location: 'quito', returnDate: futureTime })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Invalid returnDate.')
          return done()
        })
    })
    it('responds with a 404 if the book does not exist', (done) => {
      request(app)
        .post('/books/somefakeid/lend')
        .set('Authorization', `Bearer ${token}`)
        .send({ location: 'quito', returnDate: validTime })
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Book not found.')
          return done()
        })
    })
    it('responds with a 200 and some confirmation data', (done) => {
      request(app)
        .post(`/books/${testBook.id}/lend`)
        .set('Authorization', `Bearer ${token}`)
        .send({ location: 'quito', returnDate: validTime })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const result = res.body.data
          expect(result).to.be.an('object')
          expect(result.lended).to.equal(true)
          return done()
        })
    })
    it('responds with a 409 when the book is already lent ', (done) => {
      request(app)
        .post(`/books/${testBook.id}/lend`)
        .set('Authorization', `Bearer ${token}`)
        .send({ location: 'quito', returnDate: validTime })
        .expect('Content-Type', /json/)
        .expect(409)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Book already lent.')
          return done()
        })
    })
  })
})
