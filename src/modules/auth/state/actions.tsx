import {LoginFormData, User} from './types';

export const ActionType = {
  LOGIN: 'LOGIN',
  FAILURE: 'FAILURE',
  SUCCESS_USER: 'SUCCESS_USER',
};
const setDataFailure = () => {
  return {type: ActionType.FAILURE};
};
const setDataUser = (data: User) => {
  return {type: ActionType.SUCCESS_USER, data};
};

export const authAction = (formData: LoginFormData) => (dispatch: any) => {
  let logged = false;
  if (formData.username == 'F') {
    //TODO traer el usuario de la base de datos que tenga ese mismo username
    let user: User = {
      email: 'felipperoan@gmail.com',
      firstName: 'Luis',
      lastName: 'Roa',
      identification: '1061809552',
      identificationType: '2',
      userid: 123,
      username: formData.username,
    };
    dispatch(setDataUser(user));
    logged = true;
  } else {
    dispatch(setDataFailure());
  }
  return logged;
};
