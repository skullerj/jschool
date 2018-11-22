import React from 'react'
import PropTypes from 'prop-types'

import { css } from 'emotion'
import theme from '../../styles/theme'
import plutoFont from '../../styles/plutoFont'

import BookStars from './BookStars'

const style = css`
  display: flex;
  flex-direction: column;
  height: 320px;
  min-width: 150px;
  position: relative;
  width: 100%;

  img {
    align-self: center;
    border-radius: 4px;
    display: flex;
    max-width: 200px;
    width: 100%;
  }

  h1 {
    ${plutoFont('cond_regular', 15)};
    color: ${theme.heTextColor};
    margin-top: 16px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h2 {
    ${plutoFont('cond_light', 13)};
    color: ${theme.leTextColor};
    margin-top: 5px;
  }

`
const Book = (props) => {
  const { book, children } = props
  return (
    <article className={style}>
      <img src={book.photoURL} alt={`${book.title} cover`} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <BookStars score={book.score} color={theme.accentColor} />
      {children}
    </article>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    locations: PropTypes.arrayOf(PropTypes.string)
  }),
  showDetails: PropTypes.bool
}

export default Book
