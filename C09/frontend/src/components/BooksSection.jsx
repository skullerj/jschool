import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'
import * as qs from 'querystring'
import axios from 'axios'
import Bookshelf from './Bookshelf'
import ReservationPage from './ReservationPage'
import PageSelector from './PageSelector'
import { locations } from './Book'

const styles = css`
  display: flex;
  flex-direction: column;
  
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
  .search-helpers {
    display: flex;
    flex-direction: row;
    padding: 20px 44px 10px 44px;
  }
  .search-terms {
    display: flex;
    flex-grow: 1;   
    ${plutoFont('cond_light', 20)};
    color: ${theme.heTextColor};
  }
`
const BooksRouter = (WrappedComponent) => ({ match, ...passed }) => {
  return (
    <Switch>
      <Route path={`${match.url}/`} exact
        render={({ location }) => <WrappedComponent searchLocation='everywhere' query={location.search.replace('?', '')} {...passed} />} />
      <Route path={`${match.url}/:location(quito|medellin|cartagena|digital)`} exact
        render={({ match, location }) => <WrappedComponent {...passed} searchLocation={match.params.location} query={location.search.replace('?', '')} />} />
      <Route path={`${match.url}/:id`}
        render={({ match }) => <WrappedComponent {...passed} selectedBookId={match.params.id} />} />
    </Switch>
  )
}

class BooksSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      total: 0,
      loading: false,
      error: null
    }
    this.requester = axios.create({
      baseURL: '/',
      headers: { 'Authorization': `Bearer ${props.token}` }
    })
    this.updateBook = this.updateBook.bind(this)
  }
  render () {
    const { books, total, loading, error } = this.state
    const { searchLocation, selectedBookId, token, query } = this.props
    const page = parseInt(qs.parse(query).page)
    const selectedBook = this.getBook(selectedBookId)
    const searchTerms = this.getSearchTerms()
    return (
      <div className={styles}>
        {
          loading
            ? <h1 className='loading'>Loading ...</h1>
            : error
              ? <h1 className='error'>{ error.status === 404 ? <Redirect to='/notfound' /> : <h1 className='error'>{error.message}</h1> }</h1>
              : searchLocation
                ? <React.Fragment> <div className='search-helpers'><span className='search-terms' >{searchTerms}</span> <PageSelector page={page} total={total} /> </div> <Bookshelf books={books} /></React.Fragment>
                : selectedBook && <ReservationPage book={selectedBook} token={token} onBookUpdate={this.updateBook} />
        }
      </div>
    )
  }

  componentDidMount () {
    if (this.props.searchLocation) {
      this.fetchBooks(this.props.searchLocation, this.props.query)
    }
    if (this.props.selectedBookId) {
      this.fetchSingleBook(this.props.selectedBookId)
    }
  }

  componentDidUpdate (prevProps) {
    if (
      (prevProps.searchLocation !== this.props.searchLocation && this.props.searchLocation) ||
      (prevProps.query !== this.props.query)
    ) {
      if (this.props.selectedBookId) return
      this.fetchBooks(this.props.searchLocation, this.props.query)
    }
  }

  fetchBooks (location, query) {
    const url = location === 'everywhere' ? `/books?${query}` : `/books?location=${location}&${query}`
    this.setState({ loading: true })
    this.requester.get(url)
      .then((res) => {
        this.setState({ books: res.data.data, total: res.data.total, loading: false })
      })
      .catch((err) => {
        const body = err.response.data.error
        this.setState({ loading: false, error: body })
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
        const body = err.response.data.error
        this.setState({ loading: false, error: body })
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

  getSearchTerms () {
    const query = qs.parse(this.props.query)
    if (query.title) {
      return `Searching: ${query.title} on ${locations.get(this.props.searchLocation)}`
    } else {
      return `${locations.get(this.props.searchLocation)}`
    }
  }

  updateBook (id, updates) {
    const newBooks = this.state.books.reduce((res, book) => {
      if (book.id === id) {
        const newBook = Object.assign({}, book, updates)
        res.push(newBook)
      } else {
        res.push(book)
      }
      return res
    }, [])
    this.setState({ books: newBooks })
  }
}

BooksSection.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  authenticated: PropTypes.bool
}

export default BooksRouter(BooksSection)
