import {
  FETCH_BOOKS,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  FETCH_SINGLE_BOOK,
  FETCH_SINGLE_BOOK_SUCCESS,
  SELECT_BOOK,
  LEND_BOOK,
  UPDATE_BOOK,
  LEND_BOOK_ERROR
} from '../actions/books'

const books = (state = {
  entities: [],
  total: 0,
  selectedBook: null,
  loading: false,
  lastError: null
}, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
    case FETCH_SINGLE_BOOK:
    case LEND_BOOK:
      return { ...state, loading: true }
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, entities: action.books, total: action.total }
    case FETCH_BOOKS_ERROR:
      return { ...state, loading: false, entities: [], lastError: action.error }
    case FETCH_SINGLE_BOOK_SUCCESS:
      return { ...state, loading: false, entities: [...state.entities, ...action.book] }
    case LEND_BOOK_ERROR:
      return { ...state, loading: false, lastError: action.error }
    case SELECT_BOOK:
      return { ...state, selectedBook: action.id }
    case UPDATE_BOOK:
      const newEnties = state.entities.map(book => (book.id === action.id ? { ...book, ...action.updates } : book))
      return { ...state, entities: newEnties, loading: false }
    default:
      return state
  }
}

export default books
