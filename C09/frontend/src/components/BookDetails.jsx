import React from 'react'
import InjectSheet from 'react-jss'
import Stars from './Stars'
import ReservationForm from './ReservationForm'

const styles = theme => ({
  container: {
    display: 'grid',
    padding: theme.spacing,
    grid: {
      templateColumns: '1fr',
      templateRows: 'auto 120vh',
      templateAreas: `'info' 'reservation'`
    },
    [theme.mq.m]: {
      grid: {
        templateColumns: '1fr 1fr',
        templateRows: '1fr',
        templateAreas: `'info reservation'`
      },
      padding: 'inherit'
    }
  },
  info: {
    'grid-area': 'info',
    overflow: 'auto',
    display: 'flex',
    'max-height': 'calc(100vh - 160px)',
    'flex-direction': 'column',
    'align-items': 'center',
    'padding-bottom': theme.spacing * 3
  },
  title: {
    font: theme.font('cond_bold', 24),
    color: theme.colors.heText
  },
  author: {
    font: theme.font('cond_light', 18),
    color: theme.colors.leText,
    margin: '5px 0 0 0'
  },
  image: {
    width: 175,
    height: 250,
    margin: '10px 0 0 0',
    'flex-shrink': '0'
  },
  year: {
    font: theme.font('cond_light', 16),
    margin: '10px 0 0 0'
  },
  description: {
    font: theme.font('cond_light', 16),
    margin: '5px 0 0 0',
    'max-width': '450px',
    color: theme.colors.meText,
    'line-height': '1.4'
  },
  sectionTitle: {
    font: theme.font('cond_bold', 14),
    color: theme.colors.accent,
    'text-transform': 'uppercase',
    margin: '18px 0 0 0'
  },
  pages: {
    font: theme.font('cond_light', 14),
    margin: '5px 0 0 0',
    color: theme.colors.meText
  },
  reservation: {
    'grid-area': 'reservation',
    'display': 'flex',
    'flex-direction': 'column'
  },
  message: {
    width: 300,
    margin: 'auto',
    'text-align': 'center',
    font: theme.font('cond_light', 26),
    color: theme.colors.leText,
    '& b': {
      color: theme.colors.accent
    }
  },
  loading: {
    font: theme.font('cond_light', 26),
    color: theme.colors.leText
  }
})

function formatDate (date) {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return `${monthNames[monthIndex]} ${day}, ${year}`
}

const BookDetails = (props) => {
  const { classes, book, loading, error } = props
  const bookLent = book.returnDate && true
  const parsedReturnDate = bookLent ? formatDate(new Date(book.returnDate)) : null
  return (
    <section className={classes.container}>
      <div className={classes.info}>
        <h1 className={classes.title}>{book.title}</h1>
        <h2 className={classes.author}>{book.author}</h2>
        <Stars score={book.score} />
        <img className={classes.image} src={book.photoURL} alt={`${book.title} cover`} />
        <span className={classes.year}>{book.year}</span>
        <p className={classes.sectionTitle}>Summary</p>
        <p className={classes.description}>{book.description}</p>
        <p className={classes.pages}>{book.pageCount} pages</p>
      </div>
      <div className={classes.reservation}>
        {
          loading
            ? <h1 className={classes.loading}>Loading...</h1>
            : bookLent
              ? <h1 className={classes.message}>You have lent this book. <br /> Remember to return it before: <br /><br /> <b>{parsedReturnDate}</b> </h1>
              : <ReservationForm book={book} onBookLend={props.onBookLend} />
        }
        {error && <h1 className={classes.error}>There was an error lending that book</h1>}
      </div>
    </section>
  )
}

export default InjectSheet(styles)(BookDetails)
