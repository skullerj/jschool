import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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

const store = createStore(main, loadState(), applyMiddleware(thunk));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
