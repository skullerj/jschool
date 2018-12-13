import { ofType, combineEpics } from 'redux-observable'
import { of } from 'rxjs'
import { switchMap, withLatestFrom, map, filter, catchError } from 'rxjs/operators'
import { Rxios } from 'rxios'
import {
  FETCH_BOOKS,
  SELECT_BOOK,
  LEND_BOOK,
  FETCH_SINGLE_BOOK,
  loadBooks,
  loadSingleBook,
  fetchBooksError,
  updateBook,
  lendBookError,
  fetchSingleBook
} from '../actions/books'

let requester = null

const getRequester = (token) => {
  if (!requester) {
    return new Rxios({
      baseURL: '/',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } else {
    return requester
  }
}

const fetchBooksEpic = (action$, state$) => action$.pipe(
  ofType(FETCH_BOOKS),
  withLatestFrom(state$),
  map(([action, state]) => ({ ...action, token: state.auth.token })),
  filter(action => action.token && true),
  switchMap(({ token, location, query }) => {
    const url = location === 'everywhere' ? `/books?${query}` : `/books?location=${location}&${query}`
    return getRequester(token).get(url).pipe(
      map(res => loadBooks(res.data, res.total)),
      catchError(err => of(fetchBooksError(err)))
    )
  })
)

const fetchSingleBookEpic = (action$, state$) => action$.pipe(
  ofType(FETCH_SINGLE_BOOK),
  withLatestFrom(state$),
  map(([action, state]) => ({ ...action, token: state.auth.token })),
  filter(action => action.token && true),
  switchMap(({ token, id }) => {
    const url = `/books/${id}`
    return getRequester(token).get(url).pipe(
      map(res => loadSingleBook(res.data)),
      catchError(err => of(fetchBooksError(err)))
    )
  })
)

const lendBookEpic = (action$, state$) => action$.pipe(
  ofType(LEND_BOOK),
  withLatestFrom(state$),
  map(([action, state]) => ({ ...action, token: state.auth.token })),
  filter(action => action.token && true),
  switchMap(({ token, id, location, returnDate }) => {
    const url = `/books/${id}/lend`
    return getRequester(token).post(url, {
      location,
      returnDate
    }).pipe(
      map(res => updateBook(id, { returnDate: returnDate.toString() })),
      catchError(err => of(lendBookError(err)))
    )
  })
)

const selectBookEpic = (action$, state$) => action$.pipe(
  ofType(SELECT_BOOK),
  withLatestFrom(state$),
  map(([action, state]) => {
    const book = state.books.entities.find(b => b.id === action.id)
    return {
      exists: book && true,
      id: action.id
    }
  }),
  filter(info => !info.exists),
  map(info => fetchSingleBook(info.id))
)

export default combineEpics(fetchBooksEpic, fetchSingleBookEpic, lendBookEpic, selectBookEpic)
