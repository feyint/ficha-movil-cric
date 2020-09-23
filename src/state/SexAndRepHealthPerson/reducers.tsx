import {ActionType} from './actions';
import {HousingQuestion} from '../../modules/housing/state/types';

// TODO traer de la base de datos
const FNCPERSON = {
  ID: 12346,
  CODIGO: 'PERSON002',
  IDENTIFICACION: 111111,
  PRIMER_NOMBRE: 'AAAAA',
  SEGUNDO_NOMBRE: 'BBBBB',
  PRIMER_APELLIDO: 'CCCCC',
  SEGUNDO_APELLIDO: 'DDDDD',
  FECHA_NACIMIENTO: new Date(),
  EDAD: 30,
  EDAD_VISITA: 30,
  TEL_CEDULAR: 3192424333,
  TEL_ALTERNO: 8342595,
  CORREO_ELECTRONICO: 'LINKON90@GMAIL.COM',
  FECHA_ACTIVIDAD: new Date(),
  USUARIO_DATA: 'SYSTEM_USER_CTL',
  FECHA_CREACION: new Date(),
  ORIGEN_DATA: 'SYSTEM_USER_CTL',
};

const initialState = {
  FNCPERSON: FNCPERSON,
  CONDITIONPERSONQUESTIONLIST: [] as HousingQuestion[],
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
