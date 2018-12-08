import React from 'react'
import InjectSheet from 'react-jss'
import Book from './Book'

const styles = (theme) => ({
  container: {
    padding: theme.spacing * 3,
    'max-height': 'calc(100vh - 214px)',
    'overflow': 'auto',
    [theme.mq.l]: {
      'max-height': 'calc(100vh - 134px)'
    }
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

const Bookshelf = (props) => {
  const { classes, books } = props
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {
          books.map((book, i) => {
            return (<Book book={book} key={i} alignment={computeAlignment(i)} />)
          })
        }
        {!books[0] && <span className={classes.noResults}>No results found :(</span>}
      </div>
    </div>
  )
}

export default InjectSheet(styles)(Bookshelf)
