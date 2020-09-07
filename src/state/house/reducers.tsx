import {ActionType} from './actions';
import {HousingQuestion} from '../../modules/housing/state/types';
// TODO traer de la base de datos
const FUBUBIVIV = {
  ID: 123,
  CODIGO: 'CODVIVI1',
  DIRECCION: 'Calle 34CN',
  COORDENADA_X: 12345,
  COORDENADA_Y: 12345,
  HUMO_CASA: false,
  NUM_NUCLEOS: 0,
  FECHA_ACTIVIDAD: new Date(),
  FECHA_CREACION: new Date(),
  ORIGEN_DATA: 'string',
  USUARIO_DATA: 'string',
  FUCBARVER_ID: 1,
  RESIDUO_BOR: 'string',
};
const FNBNUCVIV = {
  ID: 1,
  CODIGO: 'CODVIVI1_1',
  HUMO_CASA: false,
  FECHA_ACTIVIDAD: null,
  FECHA_CREACION: null,
  ORIGEN_DATA: 'string',
  USUARIO_DATA: 'string',
  FUCBARVER_ID: 1,
  RESIDUO_BOR: 'string',
  RESIDUO_PELIGROSO: 'string',
  ANIMAL_VACUNADO: 1,
  ANIMAL_NOVACUNADO: 1,
  RIESGO: false,
  OBSERVACION: '',
  LUGAR_COCINA: '',
  HUMO_DENTRO: '',
  ACCESO_INTERNET: false,
  TOTAL_ANIMAL: 1,
  FUBUBIVIV_ID: 123,
  FUBUBIVIV_CODE: 'CODVIVI1',
};
const initialState = {
  FUBUBIVIV: FUBUBIVIV,
  FNBNUCVIV: FNBNUCVIV,
  HOUSINGQUESTIONLIST: [] as HousingQuestion[],
};

export default (state = initialState, action: any) => {
  console.log('Action House: ', action);
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
