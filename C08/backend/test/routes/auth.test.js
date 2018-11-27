/* globals describe, it, before */
const request = require('supertest')
const { expect } = require('chai')

const fixtures = require('../fixtures.json')

describe('Auth routes', () => {
  let app

  before(() => {
    app = global.app
  })
  describe('POST /auth/register', () => {
    it('returns a 400 when username or password are missing', (done) => {
      request(app)
        .post('/auth/register')
        .send({ username: 'johndoe' })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Password required.')
          return done()
        })
    })

    it('returns a 400 when username already exists', (done) => {
      request(app)
        .post('/auth/register')
        .send(fixtures.user[0])
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Username already exists.')
          return done()
        })
    })

    it('returns a 201 when user has been registered successfully', (done) => {
      request(app)
        .post('/auth/register')
        .send({ username: 'johndoe2', password: 'iamjohndoe2' })
        .expect(201)
        .end(done)
    })
  })
  describe('POST /auth/login', () => {
    it('returns a 401 when user lack propper credentials', (done) => {
      request(app)
        .post('/auth/login')
        .send({ username: 'asdf' })
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err)
          const { error } = res.body
          expect(error).to.be.an('object')
          expect(error.message).to.equal('Invalid username or password')
          return done()
        })
    })

    it('returns a 200 and a JWT when authentication was succesful', (done) => {
      const us = fixtures.user[0]
      request(app)
        .post('/auth/login')
        .send({ username: us.username, password: us.unhashedpassword })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          const { body } = res
          expect(body).to.be.a('object')
          expect(body).to.have.property('jwt')
          return done()
        })
    })
  })
})
