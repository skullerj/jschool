import React from 'react'
import PropTypes from 'prop-types'
import InjectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import book from '../types/book'

import Stars from './Stars'

const styles = (theme) => ({
  article: {
    display: 'flex',
    'flex-direction': 'column',
    height: 330,
    'min-width': 150,
    position: 'relative',
    'width': '100%',
    '&:hover $details': {
      display: 'block'
    }
  },
  title: {
    font: theme.font('cond_regular', 16),
    color: theme.colors.heTex,
    'max-width': '100%',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    'margin': '4px 0px 0px 0px'
  },
  author: {
    font: theme.font('cond_light', 14),
    color: theme.colors.leText,
    'margin': '4px 0px 0px 0px'
  },
  thumbnailLink: {
    display: 'flex',
    'min-height': 250
  },
  thumbnail: {
    'border-radius': '4px',
    display: 'flex',
    'max-width': 200,
    width: '100%'
  },
  locations: {
    font: theme.font('cond_light', 10),
    color: theme.colors.leText,
    'margin': '4px 0px 0px 0px'
  },
  details: {
    display: 'none',
    height: 250,
    position: 'absolute',
    width: '100%',
    'z-index': 10,
    'border-radius': '4px'
  },
  actions: {
    'box-sizing': 'border-box',
    'align-items': 'center',
    'text-align': 'center',
    background: theme.colors.hoverBg,
    display: 'flex',
    'flex-direction': 'column',
    height: '100%',
    'justify-content': 'space-between',
    padding: 14,
    width: '100%',
    '& .open-book': {
      background: theme.colors.white,
      'border-radius': '50%',
      'box-sizing': 'border-box',
      color: theme.colors.accent,
      'font-size': 22,
      height: 48,
      'padding-top': 14,
      width: 48
    },
    '& .rate': {
      font: theme.font('cond_light', 11),
      color: theme.colors.white,
      'text-transform': 'uppercase'
    }
  },
  info: {
    'box-sizing': 'border-box',
    top: 0,
    right: (props) => props.alignment === 'right' ? '-400px' : '205px',
    position: 'absolute',
    width: 372,
    background: theme.colors.hoverBg,
    color: theme.colors.white,
    font: theme.font('cond_light', 12),
    padding: '21px 31px',
    'z-index': '100'
  },
  infoTitle: {
    font: theme.font('cond_bold', 13),
    color: theme.colors.accent,
    'text-transform': 'uppercase'
  },
  infoYear: {
    color: theme.colors.leText,
    position: 'absolute',
    right: 20,
    top: 22
  },
  infoAuthor: {
    color: theme.colors.leText
  },
  infoSubtitle: {
    font: theme.font('cond_bold', 12),
    'margin-top': 18,
    'text-transform': 'uppercase'
  },
  infoDescription: {
    height: 150,
    overflow: 'auto'
  },
  infoArrow: {
    'border-bottom': '13px solid transparent',
    'border-top': '13px solid transparent',
    'border-left': (props) => props.alignment === 'left' ? `13px solid ${theme.colors.hoverBg}` : 'inherit',
    'border-right': (props) => props.alignment === 'right' ? `13px solid ${theme.colors.hoverBg}` : 'inherit',
    height: 0,
    position: 'absolute',
    width: 0,
    left: (props) => props.alignment === 'left' ? '371px' : '-12px'
  }
})

export const locations = new Map([
  ['everywhere', 'Everywhere'],
  ['medellin', 'Medellin'],
  ['quito', 'Quito'],
  ['cartagena', 'Cartagena'],
  ['digital', 'Digital']
])

const Book = (props) => {
  const { book, classes } = props
  const availableLocations = book.availableLocations.map(l => locations.get(l)).join(', ')
  return (
    <article className={classes.article}>
      <Link to={`/books/${book.id}`} className={classes.thumbnailLink}>
        <img className={classes.thumbnail} src={book.photoURL} alt={`${book.title} cover`} />
      </Link>
      <h1 className={classes.title}>{book.title}</h1>
      <h2 className={classes.author}>{book.author}</h2>
      <Stars score={book.score} />
      <span className={classes.locations}><i className='fas fa-globe' /> {availableLocations} </span>
      <section className={classes.details}>
        <div className={classes.actions}>
          <Link to={`/books/${book.id}`}>
            <i className='fas fa-book-open open-book' />
          </Link>
          <div className='rate'>
            <p>Rate this book</p>
            <Stars score={book.score} golden />
          </div>
        </div>
        <div className={classes.info}>
          <div className={classes.infoArrow} />
          <h1 className={classes.infoTitle}>{book.title}</h1>
          <span className={classes.infoYear}>{book.year}</span>
          <p>Novel by <span className={classes.infoAuthor}>{book.author}</span></p>
          <p>{book.pageCount} pages</p>
          <h2 className={classes.infoSubtitle}>Summary</h2>
          <p className={classes.infoDescription}>{book.description}</p>
          <h2 className={classes.infoSubtitle}>Rating</h2>
          <Stars score={book.score} />
        </div>
      </section>
    </article>
  )
}

Book.propTypes = {
  book: book,
  onBookClick: PropTypes.func
}

export default InjectSheet(styles)(Book)
