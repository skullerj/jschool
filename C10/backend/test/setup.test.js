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
      fixtureLoader({ user: fixtures.user }, (err, userData) => {
        if (err) return done(err)
        // Lend one of the books to the user with username sam
        const frodoId = userData[0].reduce((res, u) => {
          if (u.username === 'frodo') {
            return u._id
          } else {
            return res
          }
        }, null)
        if (!frodoId) return done(new Error('There was an error when trying to load fixtures into the database'))
        fixtures.book[0].lentTo = [{
          returnDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // three days on the future
          userId: frodoId,
          location: 'quito'
        }]
        fixtureLoader({ book: fixtures.book }, (err, booksData) => {
          if (err) return done(err);
          [global.books] = booksData
          return done()
        })
      })
    })
  })
})
