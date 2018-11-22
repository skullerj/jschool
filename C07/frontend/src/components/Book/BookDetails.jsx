import React from 'react'
import { css } from 'emotion'
import theme from '../../styles/theme'
import plutoFont from '../../styles/plutoFont'
import mq from '../../styles/mediaQueries'
import BookStars from './BookStars'

const mainStyle = css`
  height: 250px;
  position: absolute;
  width: 100%;
  z-index: 10;
  border-radius: 5px;
`
const actionsStyle = css`
  align-items: center;
  background: ${theme.hoverBackgroundColor};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 14px;
  width: 100%;

  .open-book {
    background: #fff;
    border-radius: 50%;
    color: ${theme.accentColor};
    font-size: 22px;
    height: 48px;
    padding-top: 14px;
    text-align: center;
    width: 48px;
  }

  .rate {
    text-align: center;
    p {
      ${plutoFont('cond_light', 11)};
      color: #fff;
      text-transform: uppercase;
    }
  }

`
const infoStyle = alignment => css`
  ${mq({
    'bottom': ['0', '0', '0', 'inherit'],
    'left': ['0', '0', '0', alignment === 'left' ? '205px' : '-400px'],
    'position': ['fixed', 'fixed', 'fixed', 'absolute'],
    'top': ['inherit', 'inherit', 'inherit', '0'],
    'width': ['100vw', '100vw', '100vw', '372px']
  })};
  background-color: ${theme.hoverBackgroundColor};
  color: #fff;
  ${plutoFont('cond_light', 12)};
  padding: 21px 31px;
  z-index: 100;

  h1,
  .year,
  p {
    margin-top: 8px;
  }

  h1 {
    ${plutoFont('cond_bold', 13)};
    color: ${theme.accentColor};
    text-transform: uppercase;
  }

  .year {
    color: ${theme.leTextColor};
    position: absolute;
    right: 20px;
    top: 22px;
  }

  .author {
    color: ${theme.leTextColor};
  }

  h2 {
    ${plutoFont('cond_bold', 12)};
    margin-top: 18px;
    text-transform: uppercase;
  }

  .description {
    height: 150px;
    overflow: auto;
  }

  .arrow {
    ${mq({ 'display': ['none', 'none', 'none', 'block'] })};
    border-bottom: 13px solid transparent;
    border-top: 13px solid transparent;
    ${alignment === 'left'
    ? `border-left: 13px solid ${theme.hoverBackgroundColor};`
    : `border-right: 13px solid ${theme.hoverBackgroundColor};`}
    
    height: 0;
    position: absolute;
    width: 0;
    ${alignment === 'left' ? `left: 367px;` : `left: -13px;`}
  }
`

const BookDetails = (props) => {
  const { book, alignment } = props
  return (
    <section className={mainStyle}>
      <div className={actionsStyle}>
        <i className='fas fa-book-open open-book' />
        <div className='rate'>
          <p>Rate this book</p>
          <BookStars score={book.score} color={theme.starColor} />
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
        <BookStars score={book.score} color={theme.accentColor} />
      </div>
    </section>
  )
}

export default BookDetails
