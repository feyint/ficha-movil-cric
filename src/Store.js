import {createStore, applyMiddleware} from 'redux';
import Reducers from './Reducers';
import thunk from 'redux-thunk';

export default Store = () => {
  let storeApp = createStore(Reducers, applyMiddleware(thunk));
  return storeApp;
};
