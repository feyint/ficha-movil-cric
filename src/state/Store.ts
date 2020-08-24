import {createStore, applyMiddleware} from 'redux';
import Reducers from '../state/Reducers';
import thunk from 'redux-thunk';

export default () => {
  let storeApp = createStore(Reducers, applyMiddleware(thunk));
  return storeApp;
};
