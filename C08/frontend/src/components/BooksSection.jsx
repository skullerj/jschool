import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'
import * as qs from 'querystring'
import axios from 'axios'

import Bookshelf from './Bookshelf'
import ReservationPage from './ReservationPage'

const styles = css`
  .loading,
  .error,
  .message {
    padding: 20px 0px 10px 44px;
    ${plutoFont('cond_light', 20)}
    color: ${theme.heTextColor};
    min-height: calc(100vh - 130px);
  }
  .error {
    color: ${theme.errorColor}
  }
  .message {
    color: ${theme.accentColor}
  }
`
const BooksRouter = (WrappedComponent) => ({ match, ...passed }) => {
  return (
    <Switch>
      <Route path={`${match.url}/`} exact
        render={({ location }) => <WrappedComponent location='everywhere' query={qs.parse(location.search)} {...passed} />} />
      <Route path={`${match.url}/:location(quito|medellin|cartagena|digital)`} exact
        render={({ match, location }) => <WrappedComponent location={`${match.params.location}`} query={qs.parse(location.search)} {...passed} />} />
      <Route path={`${match.url}/:id`}
        render={({ match }) => <WrappedComponent selectedBookId={`${match.params.id}`} {...passed} />} />
    </Switch>
  )
}

class BooksSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      loading: false,
      error: null
    }
    this.requester = axios.create({
      baseURL: '/',
      headers: { 'Authorization': `Bearer ${props.token}` }
    })
  }
  render () {
    const { books, loading, error, token } = this.state
    const { location, selectedBookId } = this.props
    const selectedBook = this.getBook(selectedBookId)
    return (
      <div className={styles}>
        {
          loading
            ? <h1 className='loading'>Loading ...</h1>
            : error
              ? <h1 className='error'>{error.message}</h1>
              : location
                ? <Bookshelf books={books} />
                : selectedBook && <ReservationPage book={selectedBook} token={token} />
        }
      </div>
    )
  }

  componentDidMount () {
    if (this.props.location) {
      this.fetchBooks(this.props.location)
    }
    if (this.props.selectedBookId) {
      this.fetchSingleBook(this.props.selectedBookId)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location !== this.props.location && this.props.location) {
      this.fetchBooks(this.props.location)
    }
  }

  fetchBooks (location) {
    const url = location === 'everywhere' ? '/books' : `/books?location=${location}`
    this.setState({ loading: true })
    this.requester.get(url)
      .then((res) => {
        this.setState({ books: res.data.data, loading: false })
      })
      .catch((err) => {
        this.setState({ loading: false, error: err })
      })
  }

  fetchSingleBook (id) {
    const url = `/books/${id}`
    this.setState({ loading: true })
    this.requester.get(url)
      .then((res) => {
        this.setState((lastState) => { return { loading: false, books: [...lastState.books, res.data.data] } })
      })
      .catch((err) => {
        this.setState({ loading: false, error: err })
      })
  }

  getBook (id) {
    return this.state.books.reduce((res, b) => {
      if (b.id === id) {
        return b
      } else {
        return res
      }
    }, null)
  }
}

BooksSection.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  authenticated: PropTypes.bool
}

export default BooksRouter(BooksSection)
