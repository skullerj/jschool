import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import mainReducer from './reducers'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const history = createBrowserHistory()

export default createStore(
  mainReducer(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
)
