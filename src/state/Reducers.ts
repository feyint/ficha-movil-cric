import {combineReducers} from 'redux';
import {SessionReducers} from '../modules/auth/state';
import {HousingReducers} from './house';
import {LocationReducers} from '../modules/location/state';
export default combineReducers({
  session: SessionReducers,
  location: LocationReducers,
  housing: HousingReducers,
});
