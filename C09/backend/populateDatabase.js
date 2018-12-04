const mongoose = require('mongoose')
const config = require('config')
const fetch = require('node-fetch')

const Book = require('./app/models/book')
const User = require('./app/models/user')

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
  '9780552149518',
  '9780747532743',
  '9780747538486',
  '9780552150736',
  '9780747551003',
  '9780747581086',
  '9780747591054',
  '9780747546290',
  '9781904233657',
  '9780439139601',
  '9780552151764',
  '9781904233886',
  '9780330457729',
  '9780552151696',
  '9780099450252',
  '9781904233916',
  '9781847245458',
  '9780747566533',
  '9780099464464',
  '9780141017891',
  '9780099429791',
  '9780593054277',
  '9780552997041',
  '9781905654284',
  '9780747546245',
  '9780747591061',
  '9781849163422',
  '9780752837505',
  '9780349116754',
  '9780718147655',
  '9780006512134',
  '9780099387916',
  '9780752877327',
  '9780755309511',
  '9781841953922',
  '9780091889487',
  '9780747599876',
  '9780679763970',
  '9780563384304',
  '9780330507417',
  '9781861976123',
  '9780590660549',
  '9780755331420',
  '9781849162746',
  '9780330367356',
  '9780141020525',
  '9780722532935',
  '9780552996006',
  '9780099487821',
  '9780141011905',
  '9780718154776',
  '9780099457169',
  '9780330332774',
  '9780241003008',
  '9780747582977',
  '9781846051616',
  '9780718147709',
  '9780755307500',
  '9780141030142',
  '9780007110926',
  '9780330448444',
  '9780747561071',
  '9780701181840',
  '9780099771517',
  '9780590112895',
  '9780718148621',
  '9781904994367',
  '9781861978769',
  '9780718152437',
  '9780140276336',
  '9780007156108',
  '9780593059258',
  '9780752893686',
  '9780007207329',
  '9780552998482',
  '9780718144395',
  '9780006498407',
  '9780747563204',
  '9781847670946',
  '9780007232741'
]

function locationsGenerator () {
  const posiblelocations = ['quito', 'medellin', 'cartagena', 'digital']
  return posiblelocations.reduce((res, loc, i) => {
    if ((Math.random() - 0.5) > 0) {
      res.push({
        name: loc,
        onInventory: Math.ceil(Math.random() * 5)
      })
    }
    if (i === 3 && res.length === 0) {
      // If no location has been entered the just randomly assign one
      res.push({
        name: posiblelocations[Math.ceil(Math.random() * 3)],
        onInventory: Math.ceil(Math.random() * 5)
      })
    }
    return res
  }, [])
}

async function populateDatabase () {
  await mongoose.connect(config.get('mongoUri'))
  await mongoose.connection.db.dropDatabase()
  let promises = []
  let results
  booksISBNs.forEach((isbn) => {
    promises.push(fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`))
  })
  try {
    results = await Promise.all(promises)
    results = await Promise.all(results.map(b => b.json()))
    for (let res of results) {
      if (res.totalItems && res.totalItems > 0) {
        const b = res.items[0].volumeInfo
        const locations = locationsGenerator()
        const hasDigital = locations.reduce((res, l) => {
          if (l.name === 'digital') {
            return true
          }
          return res
        }, false)
        const book = new Book({
          title: b.title,
          author: b.authors ? b.authors.join(', ') : 'Anonimus',
          year: b.publishedDate.split('-')[0],
          description: b.description,
          photoURL: b.imageLinks.thumbnail,
          score: Math.ceil(Math.random() * 5),
          pageCount: b.pageCount || 360,
          digitalLink: hasDigital >= 0 ? b.selfLink || 'https://openlibrary.org/' : null,
          locations: locations
        })
        await book.save()
      }
    }
    const user = new User({ username: 'frodo', password: 'givemethatring' })
    user.hashPassword()
    await user.save()
  } catch (e) {
    console.error(e)
    return e
  }
  console.log(`Success! Check the database at: ${config.get('mongoUri')}`)
  await mongoose.connection.close()
  return true
}

populateDatabase()
