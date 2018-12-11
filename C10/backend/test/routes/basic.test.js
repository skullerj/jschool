/* globals describe, it, before */
const request = require('supertest')

describe('Routing in general', () => {
  let app

  before(() => {
    app = global.app
  })

  describe('GET /', () => {
    it('returns a welcome message', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Welcome to the bookshelf API.')
        .end(done)
    })
  })
  describe('GET a non existing route', () => {
    it('returns a 404', (done) => {
      request(app)
        .get('/dogs')
        .expect(404)
        .expect('Not found.')
        .end(done)
    })
  })
})
