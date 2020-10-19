import {ActionType} from './actions';
import {HousingQuestion} from '../../modules/housing/state/types';

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
  ORIGEN_DATA: 'SYSTEM_USER_CTL',
};
const FNCPERSON = {
  ID: null,
  CODIGO: null,
  IDENTIFICACION: null,
  PRIMER_NOMBRE: null,
  SEGUNDO_NOMBRE: null,
  PRIMER_APELLIDO: null,
  SEGUNDO_APELLIDO: null,
  FECHA_NACIMIENTO: null,
  EDAD: null,
  EDAD_VISITA: null,
  TEL_CELULAR: null,
  TEL_ALTERNO: null,
  CORREO_ELECTRONICO: null,
  FNCTIPIDE_ID: null,
  FNCORGANI_ID: null,
  FNCLUNIND_ID: null,
  FNCOCUPAC_ID: null,
  FUCMUNICI_ID: null,
  FNCPAREN_ID: null,
  FNCGENERO_ID: null,
};

const initialState = {
  FNCPERSON: FNCPERSON,
  FNBINFSAL: FNBINFSAL,
  PERSONQUESTIONLIST: [] as HousingQuestion[],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_PERSON_QUESTION_LIST:
      return {
        ...state,
        PERSONQUESTIONLIST: action.data,
      };
    case ActionType.SET_FNCPERSON:
      return {
        ...state,
        FNCPERSON: action.data,
      };
    default:
      return state;
  }
};
