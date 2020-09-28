import {ActionType} from './actions';
import {HousingQuestion} from '../../modules/housing/state/types';

const initialState = {
  CONDITIONPERSONQUESTIONLIST: [] as HousingQuestion[],
};

export default (state = initialState, action: any) => {
  console.log('Action Status Person: ', action);
  switch (action.type) {
    case ActionType.SET_SEXANDREPHEALTHPERSON_QUESTION_LIST:
      return {
        ...state,
        CONDITIONPERSONQUESTIONLIST: action.data,
      };
    default:
      return state;
  }
};
