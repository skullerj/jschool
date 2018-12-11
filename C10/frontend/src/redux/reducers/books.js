import { combineReducers } from 'redux'
const entities = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_BOOKS':
      return [...action.books]
    case 'ADD_BOOK':
      return [...state, action.book]
    case 'UPDATE_BOOK':
      return state.map(book => (book.id === action.id ? { ...book, ...action.updates } : book))
    default:
      return state
  }
}
const totalBooks = (state = 0, action) => {
  switch (action.type) {
    case 'SET_BOOKS_TOTAL':
      return action.total
    default:
      return state
  }
}
const selectedBook = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_BOOK':
      return action.bookId
    default:
      return state
  }
}
const loading = (state = false, action) => {
  switch (action.type) {
    case 'BOOKS_LOADING':
      return true
    case 'BOOKS_LOADED':
      return false
    default :
      return state
  }
}
const lastError = (state = null, action) => {
  switch (action.type) {
    case 'SET_BOOKS_ERROR':
      return action.error
    default :
      return state
  }
}
export default combineReducers({
  entities,
  selectedBook,
  totalBooks,
  loading,
  lastError
})
