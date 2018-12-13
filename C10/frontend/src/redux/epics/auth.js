import { ofType, combineEpics } from 'redux-observable'
import { of } from 'rxjs'
import { tap, map, switchMap, catchError } from 'rxjs/operators'
import { Rxios } from 'rxios'
import {
  REQUEST_LOGIN,
  logIn,
  logInError
} from '../actions/auth'

const requester = new Rxios({
  baseUrl: '/'
})

const logInEpic = (action$, store$) => action$.pipe(
  ofType(REQUEST_LOGIN),
  switchMap(action => {
    const body = {
      username: action.username,
      password: action.password
    }
    return requester.post('/auth/login', body).pipe(
      tap((res) => { console.log(res) }),
      map(res => logIn(res.jwt)),
      catchError((err) => of(logInError(err)))
    )
  })
)

export default combineEpics(logInEpic)
