import {ActionType} from './actions';
// TODO traer de la base de datos
const FUBUBIVIV = {
  ID: null,
  CODIGO: 'FV001',
  DIRECCION: '',
  COORDENADA_X: null,
  COORDENADA_Y: null,
  HUMO_CASA: '',
  NUM_NUCLEOS: null,
  FECHA_ACTIVIDAD: null,
  FECHA_CREACION: null,
  ORIGEN_DATA: '',
  USUARIO_DATA: '',
  FUCBARVER_ID: null,
  RESIDUO_BOR: '',
  RESIDUO_PELIGROSO: '',
  ANIMAL_VACUNADO: null,
  ANIMAL_NOVACUNADO: null,
  RIESGO: '',
  OBSERVACION: '',
  FUCUNICUI_ID: null,
  FVBENCUES_ID: null,
  LUGAR_COCINA: '',
  HUMO_DENTRO: '',
  ACCESO_INTERNET: '',
  TOTAL_ANIMAL: '',
};
const initialState = {
  FUBUBIVIV: FUBUBIVIV,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_FUBUBIVIV:
      return {
        ...state,
        FUBUBIVIV: action.data,
      };
    default:
      return state;
  }
};
