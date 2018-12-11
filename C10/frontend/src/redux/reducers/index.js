import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import books from './books'
import auth from './auth'

export default (history) => combineReducers({
  router: connectRouter(history),
  books,
  auth
})
