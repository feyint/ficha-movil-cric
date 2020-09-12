import {ActionType} from './actions';
import {HousingQuestion} from '../../modules/housing/state/types';
// TODO traer de la base de datos
const FUBUBIVIV = {
  ID: null,
  CODIGO: '',
  DIRECCION: '',
  COORDENADA_X: null,
  COORDENADA_Y: null,
  NUM_NUCLEOS: null,
  FECHA_ACTIVIDAD: new Date(),
  FECHA_CREACION: new Date(),
  ORIGEN_DATA: '',
  USUARIO_DATA: '',
  FUCBARVER_ID: null,
};
const FNBNUCVIV = {
  ID: null,
  CODIGO: '',
  HUMO_CASA: false,
  FECHA_ACTIVIDAD: null,
  FECHA_CREACION: null,
  ORIGEN_DATA: '',
  USUARIO_DATA: '',
  FUCBARVER_ID: null,
  RESIDUO_BOR: '',
  RESIDUO_PELIGROSO: '',
  ANIMAL_VACUNADO: null,
  ANIMAL_NOVACUNADO: null,
  RIESGO: false,
  OBSERVACION: '',
  LUGAR_COCINA: '',
  HUMO_DENTRO: '',
  ACCESO_INTERNET: false,
  TOTAL_ANIMAL: null,
  FUBUBIVIV_ID: null,
  FUBUBIVIV_CODE: '',
};
const initialState = {
  FUBUBIVIV: FUBUBIVIV,
  FNBNUCVIV: FNBNUCVIV,
  HOUSINGQUESTIONLIST: [] as HousingQuestion[],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_FUBUBIVIV:
      return {
        ...state,
        FUBUBIVIV: action.data,
      };
    case ActionType.SET_FNBNUCVIV:
      return {
        ...state,
        FNBNUCVIV: action.data,
      };
    case ActionType.SET_HOUSING_QUESTION_LIST:
      return {
        ...state,
        HOUSINGQUESTIONLIST: action.data,
      };
    default:
      return state;
  }
};
