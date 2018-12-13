import { combineEpics } from 'redux-observable'
import authEpic from './auth'
import booksEpic from './books'
export default combineEpics(authEpic, booksEpic)
