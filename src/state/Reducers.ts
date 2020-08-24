import {combineReducers} from 'redux';
import {SessionReducers} from '../modules/auth/state';
export default combineReducers({
  session: SessionReducers,
});
