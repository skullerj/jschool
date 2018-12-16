import React from 'react'
import PropTypes from 'prop-types'
import book from '../types/book'
import InjectSheet from 'react-jss'
import Book, { locations } from './Book'
import PageSelector from './PageSelector'
import qs from 'querystring'

const styles = (theme) => ({
  container: {
    padding: theme.spacing * 3,
    'max-height': 'calc(100vh - 214px)',
    'overflow': 'auto',
    [theme.mq.l]: {
      'max-height': 'calc(100vh - 134px)'
    }
  },
  summary: {
    display: 'flex',
    'flex-direction': 'row',
    padding: theme.spacing * 3
  },
  search: {
    display: 'flex',
    'flex-grow': 1,
    font: theme.font('cond_light', 20),
    color: theme.colors.heText
  },
  grid: {
    display: 'grid',
    grid: {
      gap: `${theme.spacing * 3}px`,
      templateColumns: 'repeat(auto-fill, 175px)',
      templateRows: 'repeat(auto-fill, 350px)'
    },
    'justify-content': 'space-around'
  },
  noResults: {
    font: theme.font('cond_light', 24),
    color: theme.colors.heText,
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
})
function computeAlignment (index) {
  const width = window.innerWidth
  if (width > 1180) {
    // Compute books per row taking the drawer nav and padding into account
    const booksPerRow = Math.floor((width - 300) / 220)
    const mod = (index + 1) % booksPerRow
    if (mod === 0 || mod === booksPerRow - 1) {
      return 'left'
    } else {
      return 'right'
    }
  } else {
    return 'left'
  }
}

function getSearchTerms (query, location) {
  query = qs.parse(query)
  if (query.title) {
    return `Searching: ${query.title} ${location === 'everywhere' ? '' : 'on '}${locations.get(location)}`
  } else {
    return `${locations.get(location)}`
  }
}

const Bookshelf = (props) => {
  const { classes, books, page, total, query, location, lastUpdated } = props
  const searchTerms = getSearchTerms(query, location)
  return (
    <div className={classes.container}>
      <div className={classes.summary}>
        <span className={classes.search}>{searchTerms}</span>
        <PageSelector page={page} total={total} />
      </div>
      <div className={classes.grid}>
        {
          books.map((book, i) => {
            return (<Book book={book} key={book.id} alignment={computeAlignment(i)} recentlyUpdated={lastUpdated === book.id} />)
          })
        }
        {!books[0] && <span className={classes.noResults}>No results found :(</span>}
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(book),
  page: PropTypes.number,
  total: PropTypes.number,
  query: PropTypes.string,
  location: PropTypes.string,
  lastUpdated: PropTypes.string
}

export default InjectSheet(styles)(Bookshelf)
