import React, { Component } from 'react'
import axios from 'axios'
import { css } from 'emotion'
import theme from '../styles/theme'
import mq from '../styles/mediaQueries'
import plutoFont from '../styles/plutoFont'
import BookStars from './BookStars'
import ReservationForm from './ReservationForm'

const styles = css`
  padding: 31px; 
  display: flex;
  ${mq({
    'flex-direction': ['column', 'column', 'row', 'row']
  })}
  .info { 
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
    display: flex;
    flex-grow: 2;
  }
`

class ReservationPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      bookLent: props.book.isLent
    }
    this.requester = axios.create({
      baseURL: '/',
      headers: { 'Authorization': `Bearer ${props.token}` }
    })
    this.lendBook = this.lendBook.bind(this)
  }
  render () {
    const { book } = this.props
    const { loading, error, isLent } = this.state
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
              : isLent
                ? <h1>You have lended this book. Remember to return it before: </h1>
                : <ReservationForm book={book} onBookLent={this.lendBook} />
          }
          {error && <h1>There was an error lending that book</h1>}
        </div>
      </section>
    )
  }

  lendBook (location, returnDate) {
    this.setState({ loading: true })
    this.requester.post(`/books/${this.props.book.id}/lend`, { location, returnDate })
      .then((res) => {
        this.setState({ loading: false, bookLent: true })
      })
      .catch((err) => {
        this.setState({ loading: false, error: err })
      })
  }
}

export default ReservationPage
