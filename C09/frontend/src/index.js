import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import * as serviceWorker from './serviceWorker'

// Style related imports
import 'normalize.css'
import './fonts/index'
import { ThemeProvider } from 'react-jss'
import theme from './styles/theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
