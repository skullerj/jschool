import { createStore } from 'redux';
import main from './reducers';

const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state');
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    return undefined;
  }
};
const saveState = state => {
  try {
    let serializedData = JSON.stringify(state);
    localStorage.setItem('state', serializedData);
    return true;
  } catch (error) {
    return false;
  }
};

const store = createStore(
  main,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
