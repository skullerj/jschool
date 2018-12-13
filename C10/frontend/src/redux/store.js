import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import mainReducer from './reducers'
import mainEpic from './epics'

const epicMiddleware = createEpicMiddleware()
export const history = createBrowserHistory()

export default function configureStore () {
  const store = createStore(
    mainReducer(history),
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        epicMiddleware
      )
    )
  )
  epicMiddleware.run(mainEpic)

  return store
}
