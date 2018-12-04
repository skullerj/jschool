import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { withRouter } from 'react-router-dom'
import mq from '../styles/mediaQueries'
import book from '../types/book'
import plutoFont from '../styles/plutoFont'
import theme from '../styles/theme'
import Book from './Book'
import BookDetails from './BookDetails'

const style = css`
  display: grid;
  grid-gap: 31px;
  grid-template-columns: repeat(auto-fill, 175px);
  justify-content: space-around;
  padding: 31px;
  ${mq({ 'max-height': ['calc(100vh - 214px)', 'calc(100vh - 214px)', 'calc(100vh - 214px)', 'calc(100vh - 134px)'] })}
  overflow: auto;
  .no-results {
    ${plutoFont('cond_light', 20)};
    color: ${theme.heTextColor};
    position: absolute;
    top: 50%;
    left: 50%;
  }
`

class Bookshelf extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedBook: null,
      books: []
    }
  }

  render () {
    const { selectedBook } = this.state
    const { books } = this.props
    return (
      <div className={style} onClick={(e) => this.clearSelectedBook(e)}>
        {books.map((book, i) => {
          return (
            <Book book={book}
              key={book.id}
              onBookClick={(e) => this.redirect(e, book.id)}
              onBookPointerEnter={(e) => this.selectBook(e, book.id)}
              onBookPointerLeave={(e) => this.clearSelectedBook(e)}>
              {selectedBook === book.id && <BookDetails book={book} alignment={this.computeAlignment(i)} /> }
            </Book>)
        })}
        {!books[0] && <span className='no-results'>No results found :(</span>}
      </div>
    )
  }

  computeAlignment (index) {
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

  redirect (e, id) {
    this.props.history.push(`/books/${id}`)
  }

  selectBook (e, id) {
    e.preventDefault()
    e.stopPropagation()
    this.setState(state => {
      if (id === state.selectBook) return {}
      return { selectedBook: id }
    })
  }
  clearSelectedBook (e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ selectedBook: null })
  }
}

Bookshelf.propTypes = {
  books: PropTypes.arrayOf(book)
}

export default withRouter(Bookshelf)
