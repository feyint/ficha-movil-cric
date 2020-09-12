import { ActionType } from './actions';
import { HousingQuestion } from '../../modules/housing/state/types';


const initialState = {
  PERSONQUESTIONLIST: [] as HousingQuestion[],
};

export default (state = initialState, action: any) => {
  console.log('Action Person: ', action);
  switch (action.type) {
    case ActionType.SET_PERSON_QUESTION_LIST:
      return {
        ...state,
        PERSONQUESTIONLIST: action.data,
      };
    default:
      return state;
  }
};
