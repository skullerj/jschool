import React from 'react'
import PropTypes from 'prop-types'
import InjectSheet from 'react-jss'
import book from '../types/book'

import Stars from './Stars'

const styles = {
  
}

export const locations = new Map([
  ['everywhere', 'Everywhere'],
  ['medellin', 'Medellin'],
  ['quito', 'Quito'],
  ['cartagena', 'Cartagena'],
  ['digital', 'Digital']
])

const Book = (props) => {
  const { book, onBookClick, onBookPointerEnter, onBookPointerLeave } = props
  const availableLocations = book.availableLocations.map(l => locations.get(l)).join(', ')
  return (
    <article
      className={style}
      onClick={onBookClick}
      onPointerEnter={onBookPointerEnter}
      onPointerLeave={onBookPointerLeave}>
      <img src={book.photoURL} alt={`${book.title} cover`} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <Stars score={book.score} />
      <span><i className='fas fa-globe' /> {availableLocations} </span>
      <section className={mainStyle}>
        <div className={actionsStyle}>
          <i className='fas fa-book-open open-book' />
          <div className='rate'>
            <p>Rate this book</p>
            <Stars score={book.score} golden />
          </div>
        </div>
        <div className={infoStyle(alignment)}>
          <div className='arrow' />
          <h1>{book.title}</h1>
          <span className='year'>{book.year}</span>
          <p>Novel by <span className='author'>{book.author}</span></p>
          <p>{book.pageCount} pages</p>
          <h2>Summary</h2>
          <p className='description'>{book.description}</p>
          <h2>Rating</h2>
          <Stars score={book.score} />
        </div>
      </section>
    </article>
  )
}

Book.propTypes = {
  book: book,
  onBookClick: PropTypes.func,
  onBookPointerEnter: PropTypes.func,
  onBookPointerLeave: PropTypes.func
}

export default InjectSheet(styles)(Book)
