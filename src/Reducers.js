import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
export default combineReducers({
  form: FormReducer,
});
