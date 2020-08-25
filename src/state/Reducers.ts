import {combineReducers} from 'redux';
import {SessionReducers} from '../modules/auth/state';
import {LocationReducers} from '../modules/location/state';
export default combineReducers({
  session: SessionReducers,
  location: LocationReducers
});
