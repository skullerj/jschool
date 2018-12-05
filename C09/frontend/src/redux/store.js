import { createStore, compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import mainReducer from './reducers'
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory()

export default createStore(
  mainReducer(history),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
)
