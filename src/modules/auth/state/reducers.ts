import {ActionType} from './actions';

const initialState = {
  user: {
    userid: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    identificationType: '',
    identification: '',
  },
  isFeching: false,
  error: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SUCCESS_USER:
      return {
        ...state,
        user: action.data,
        isFeching: false,
        error: false,
      };
    case ActionType.FAILURE:
      return {
        ...state,
        isFeching: false,
        error: true,
      };
    default:
      return state;
  }
};
