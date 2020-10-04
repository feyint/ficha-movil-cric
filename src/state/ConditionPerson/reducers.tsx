import {ActionType} from './actions';

const initialState = {
  CONDITIONPERSONQUESTIONLIST: [],
};

export default (state = initialState, action: any) => {
  console.log('Action Status Person: ', action);
  switch (action.type) {
    case ActionType.SET_CONDITIONPERSON_QUESTION_LIST:
      return {
        ...state,
        CONDITIONPERSONQUESTIONLIST: action.data,
      };
    default:
      return state;
  }
};
