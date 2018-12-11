/* globals describe, it, before */
const request = require('supertest')
const { expect } = require('chai')
const client = require('socket.io-client')
const fixtures = require('../fixtures.json')

describe('Sockets test', () => {
  let app
  let token
  let testBook
  const validTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
  before((done) => {
    // Get a valid jwt from the same frodo we lended the book to
    const us = fixtures.user.reduce((res, u) => {
      if (u.username === 'frodo') {
        return u
      } else {
        return res
      }
    }, null)
    // This book only have one available copy on Quito
    testBook = global.books.find(b => b.title === 'El Extranjero')
    if (!testBook) return done(new Error('Fixtures do not contain expected test book'))
    app = global.app
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
  it('should receive the book lent event when a book is lent', (done) => {
    const socket = client('http://localhost:3000')
    socket.on('book_lent', (data) => {
      expect(data.book).to.equal(testBook.id)
      expect(data.newAvailableLocations).to.be.an('array').that.does.not.include('quito')
      done()
    })
    request(app)
      .post(`/books/${testBook.id}/lend`)
      .set('Authorization', `Bearer ${token}`)
      .send({ location: 'quito', returnDate: validTime })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
      })
  })
})
