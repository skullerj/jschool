/* globals before */

const fixtureLoader = require('node-mongoose-fixtures')
const fixtures = require('./fixtures.json')
const { app, connection } = require('../index.js')

before((done) => {
  global.app = app
  global.connection = connection
  // Drop test database and load fixtures
  connection.once('open', () => {
    connection.db.dropDatabase(() => {
      fixtureLoader(fixtures, (err, data) => {
        if (err) return done(err);
        [, global.books] = data
        return done()
      })
    })
  })
})
