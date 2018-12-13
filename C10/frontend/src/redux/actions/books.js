export const FETCH_BOOKS = 'FETCH_BOOKS'
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS'
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR'
export const FETCH_SINGLE_BOOK = 'FETCH_SINGLE_BOOK'
export const FETCH_SINGLE_BOOK_SUCCESS = 'FETCH_SINGLE_BOOK_SUCCESS'
export const SELECT_BOOK = 'SELECT_BOOK'
export const LEND_BOOK = 'LEND_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const LEND_BOOK_ERROR = 'LEND_BOOK_ERROR'

export const fetchBooks = (location, query) => {
  return {
    type: FETCH_BOOKS,
    location,
    query
  }
}

export const loadBooks = (books, total) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    books,
    total
  }
}

export const fetchBooksError = (error) => {
  return {
    type: FETCH_BOOKS_ERROR,
    error
  }
}

export const fetchSingleBook = (id) => {
  return {
    type: FETCH_SINGLE_BOOK,
    id
  }
}

export const loadSingleBook = (book) => {
  return {
    type: FETCH_SINGLE_BOOK_SUCCESS,
    book
  }
}

export const selectBook = (id) => {
  return {
    type: SELECT_BOOK,
    id
  }
}

export const lendBook = (id, location, returnDate) => {
  return {
    type: LEND_BOOK,
    id,
    location,
    returnDate
  }
}

export const updateBook = (id, updates) => {
  return {
    type: UPDATE_BOOK,
    id,
    updates
  }
}

export const lendBookError = (error) => {
  return {
    type: LEND_BOOK_ERROR,
    error
  }
}
