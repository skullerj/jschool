import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reboot.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import theme from './styles/theme';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
