import {FUBUBIVIV, FNBNUCVIV} from './types';
export const ActionType = {
  SET_FUBUBIVIV: 'SET_FUBUBIVIV',
  SET_FNBNUCVIV: 'SET_FNBNUCVIV',
  SET_HOUSING_QUESTION_LIST: 'SET_HOUSING_QUESTION_LIST',
};
const _setFUBUBIVIV = (data: FUBUBIVIV) => {
  return {type: ActionType.SET_FUBUBIVIV, data};
};
const _setFNBNUCVIV = (data: FNBNUCVIV) => {
  return {type: ActionType.SET_FNBNUCVIV, data};
};
export const clearFUBUBIVIV = () => (dispatch: any) => {
  let data: any = {
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
  dispatch(_setFUBUBIVIV(data));
};
export const clearFNBNUCVIV = () => (dispatch: any) => {
  // eslint-disable-next-line no-shadow
  let FNBNUCVIV: any = {
    ID: null,
    CODIGO: '',
    HUMO_CASA: null,
    FECHA_ACTIVIDAD: null,
    FECHA_CREACION: null,
    ORIGEN_DATA: '',
    USUARIO_DATA: '',
    FUCBARVER_ID: null,
    RESIDUO_BOR: '',
    RESIDUO_PELIGROSO: '',
    ANIMAL_VACUNADO: null,
    ANIMAL_NOVACUNADO: null,
    RIESGO: null,
    OBSERVACION: '',
    LUGAR_COCINA: '',
    HUMO_DENTRO: '',
    ACCESO_INTERNET: null,
    TOTAL_ANIMAL: null,
    FUBUBIVIV_ID: null,
    FUBUBIVIV_CODE: '',
  };
  dispatch(_setFNBNUCVIV(FNBNUCVIV));
};

export const setFUBUBIVIV = (data: any) => async (dispatch: any) => {
  dispatch(_setFUBUBIVIV(data));
};
export const setFNBNUCVIV = (data: any) => (dispatch: any) => {
  dispatch(_setFNBNUCVIV(data));
};
