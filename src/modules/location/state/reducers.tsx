import {ActionType} from './actions';
const initialState = {
  availableCatalogsHouse: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.CATALOGS_HOUSE:
      return {
        ...state,
        availableCatalogsHouse: state.availableCatalogsHouse,
      };
    case ActionType.SET_CATALOGS:
      return {
        ...state,
        availableCatalogsHouse: action.data,
      };
    default:
      return state;
  }
};
