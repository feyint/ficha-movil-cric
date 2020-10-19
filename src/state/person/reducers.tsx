import {ActionType} from './actions';
import {HousingQuestion} from '../../modules/housing/state/types';

// TODO traer de la base de datos
const FNBINFSAL = {
  ID: null,
  PESO: null,
  TALLA: null,
  TA_SISTOLICA: null,
  TA_DIASTOLICA: null,
  USO_PROTESIS: null,
  TIEMPO_PROTESIS: null,
  ULTIMA_VISITA: null,
  FECHA_MUERTE: null,
  DEFUNCION: null,
  FECHA_ACTIVIDAD: null,
  USUARIO_DATA: null,
  FECHA_CREACION: null,
  ORIGEN_DATA: null,
  FNCPERSON_ID: null,
  FNCINTIMC_ID: null,
  FNCINTTEA_ID: null,
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
    case ActionType.SET_FNBINFSAL:
      return {
        ...state,
        FNBINFSAL: action.FNBINFSAL,
      };
    default:
      return state;
  }
};
