import React, { Component } from 'react'
import PropTypes from 'prop-types'
import book from '../types/book'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import BookDetails from '../components/BookDetails'
import Bookshelf from '../components/Bookshelf'

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
  render () {
    const { loading, error, searchLocation, selectedBook, books, searchTerms } = this.props
    return (
      <div>
        {
          loading
            ? <h1 className='loading'>Loading ...</h1>
            : error
              ? <h1 className='error'>{ error.status === 404 ? <Redirect to='/notfound' /> : <h1 className='error'>{error.message}</h1> }</h1>
              : searchLocation
                ? <Bookshelf books={books} searchTerms={searchTerms} page={page} total={total} />
                : selectedBook && <BookDetails book={selectedBook} />
        }
      </div>
    )
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
  selectedBook: state.books.find(b => b.id === state.books.selectedBook)
})

export default connect(mapStateToProps)(BooksRouter(BooksPage))
