import { combineReducers } from 'redux'
const entities = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.book]
    case 'UPDATE_BOOK':
      return state.map(book => (book.id === action.book.id ? { ...book, ...action.book } : book))
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

export default combineReducers({
  entities,
  selectedBook
})
