import { createStore } from 'redux';
import main from './reducers';

const store = createStore(main);

export default store;
