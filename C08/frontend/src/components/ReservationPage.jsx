import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { css } from 'emotion'
import theme from '../styles/theme'
import mq from '../styles/mediaQueries'
import plutoFont from '../styles/plutoFont'
import BookStars from './BookStars'
import ReservationForm from './ReservationForm'
import book from '../types/book'

const styles = css`
  padding: 31px; 
  display: grid;

  ${mq({
    'grid-template-columns': ['1fr','1fr','1fr 1fr','1fr 1fr'],
    'grid-template-rows': ['1fr 1fr', '1fr 1fr','1fr','1fr'],
    'grid-template-areas': [`'info' 'reservation'`,`'info' 'reservation'`,`'info reservation'`,`'info reservation'`]
  })}
  .info { 
    grid-area: info;
    max-height: calc(100vh - 110px);
    overflow: auto;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
    h1 {
      ${plutoFont('cond_bold', 24)};
      color: ${theme.heTextColor};
    }
    h2 {
      ${plutoFont('cond_light', 18)};
      color: ${theme.leTextColor};
      margin-top: 5px;
    } 
    img {
      width: 175px;
      height: 250px;
      margin-top: 10px;
      flex-shrink: 0;
    }
    span.year {
      ${plutoFont('cond_light', 16)};
      color: ${theme.leTextColor};
      margin-top: 10px;
    }
    p.description {
      ${plutoFont('cond_light', 16)};
      margin-top: 5px;
      max-width: 450px;
      color: ${theme.meTextColor};
      line-height: 1.4;
    }
    
    p.section-title {
      ${plutoFont('cond_bold', 14)};
      color: ${theme.accentColor};
      text-transform: uppercase;
      margin-top: 18px;
    }

    p.pages {
      ${plutoFont('cond_light', 14)};
      margin-top: 5px;
      color: ${theme.meTextColor};
    }
  }
  .reservation {
    grid-area: reservation;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    .message {
      width: 300px;
      text-align: center;
      color: ${theme.heTextColor};

      b {
        color: ${theme.accentColor};
      }
    }
  }
`
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
class ReservationPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null
    }
    this.requester = axios.create({
      baseURL: '/',
      headers: { 'Authorization': `Bearer ${props.token}` }
    })
    this.lendBook = this.lendBook.bind(this)
  }
  render () {
    const { book } = this.props
    const { loading, error } = this.state
    const bookLent = book.returnDate && true
    const parsedReturnDate = bookLent ? formatDate(new Date(book.returnDate)) : null
    return (
      <section className={styles}>
        <div className='info'>
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <BookStars score={book.score} color={theme.accentColor} />
          <img src={book.photoURL} alt={`${book.title} cover`} />
          <span className='year'>{book.year}</span>
          <p className='section-title'>Summary</p>
          <p className='description'>{book.description}</p>
          <p className='pages'>{book.pageCount} pages</p>
        </div>
        <div className='reservation'>
          {
            loading
              ? <h1>Loading...</h1>
              : bookLent
                ? <h1 className='message'>You have lent this book. <br /> Remember to return it before: <br /><br /> <b>{parsedReturnDate}</b> </h1>
                : <ReservationForm book={book} onBookLend={this.lendBook} />
          }
          {error && <h1 className='error'>There was an error lending that book</h1>}
        </div>
      </section>
    )
  }

  lendBook (location, returnDate) {
    this.setState({ loading: true })
    this.requester.post(`/books/${this.props.book.id}/lend`, { location, returnDate })
      .then((res) => {
        this.setState({ loading: false })
        this.props.onBookUpdate(this.props.book.id, { returnDate: returnDate.toString() })
      })
      .catch((err) => {
        this.setState({ loading: false, error: err })
      })
  }
}

ReservationPage.propTypes = {
  book: book,
  onBookUpdate: PropTypes.func.isRequired
}

export default ReservationPage
