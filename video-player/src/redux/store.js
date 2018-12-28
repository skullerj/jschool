import { createStore } from 'redux';
import main from './reducers';

const store = createStore(
  main,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
