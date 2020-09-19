import { ActionType } from './actions';
import { HousingQuestion } from '../../modules/housing/state/types';

// TODO traer de la base de datos
const FNBINFSAL = {
  ID: 100,
  PESO: 80,
  TALLA: 70,
  TA_SISTOLICA: 0,
  TA_DIASTOLICA: 0,
  USO_PROTESIS: 1,
  TIEMPO_PROTESIS: 0,
  ULTIMA_VISITA: new Date(),
  FECHA_MUERTE: new Date(),
  DEFUNCION: 'string',
  FECHA_ACTIVIDAD: new Date(),
  USUARIO_DATA: 'SYSTEM_USER_CTL',
  FECHA_CREACION: new Date(),
  ORIGEN_DATA: 'SYSTEM_USER_CTL'
};

const initialState = {
  FNBINFSAL: FNBINFSAL,
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
