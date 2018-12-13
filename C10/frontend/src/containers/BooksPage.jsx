import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InjectSheet from 'react-jss'
import qs from 'querystring'
import book from '../types/book'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBooks, fetchSingleBook, lendBook, selectBook } from '../redux/actions/books'
import BookDetails from '../components/BookDetails'
import Bookshelf from '../components/Bookshelf'

const styles = theme => ({
  error: {
    font: theme.font('cond_light', 24),
    color: theme.colors.error
  },
  loading: {
    font: theme.font('cond_light', 24),
    color: theme.colors.heText
  }
})

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

class BooksPage extends Component {
  constructor (props) {
    super(props)
    this.lendBook = this.lendBook.bind(this)
  }
  render () {
    const { loading, error, searchLocation, selectedBook, books, total, query, classes } = this.props
    const page = parseInt(qs.parse(query).page || 0)
    return (
      <div>
        {
          loading
            ? <h1 className={classes.loading}>Loading ...</h1>
            : error
              ? <div>{ error.status === 404 ? <Redirect to='/notfound' /> : <h1 className={classes.error}>{error.message}</h1> }</div>
              : searchLocation
                ? <Bookshelf books={books} location={searchLocation} query={query} page={page} total={total} />
                : selectedBook && <BookDetails book={selectedBook} onBookLend={this.lendBook} />
        }
      </div>
    )
  }

  lendBook (id, location, returnDate) {
    this.props.dispatch(lendBook(id, location, returnDate))
  }

  componentDidMount () {
    // if (this.props.searchLocation) {
    //   this.props.dispatch(fetchBooks(this.props.searchLocation, this.props.query))
    // }
    // if (this.props.selectedBookId) {
    //   this.props.dispatch(selectBook(this.props.selectedBookId))
    //   this.props.dispatch(fetchSingleBook(this.props.selectedBookId))
    // }
  }

  componentDidUpdate (prevProps) {
    // if (
    //   (prevProps.searchLocation !== this.props.searchLocation && this.props.searchLocation) ||
    //   (prevProps.query !== this.props.query)
    // ) {
    //   if (this.props.selectedBookId) return this.props.dispatch(selectBook(this.props.selectedBookId))
    //   this.props.dispatch(fetchBooks(this.props.searchLocation, this.props.query))
    // }
  }
}

BooksPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  total: PropTypes.number,
  books: PropTypes.arrayOf(book),
  selectedBook: book
}

const mapStateToProps = (state) => ({
  loading: state.books.loading,
  error: state.books.lastError,
  total: state.books.totalBooks,
  books: state.books.entities,
  selectedBook: state.books.entities.find(b => b.id === state.books.selectedBook)
})

export default connect(mapStateToProps)(BooksRouter(InjectSheet(styles)(BooksPage)))
