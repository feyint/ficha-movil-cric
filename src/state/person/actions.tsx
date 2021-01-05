import {FNBINFSAL, FNCPERSON} from './types';;

export const ActionType = {
  SET_FNCPERSON: 'SET_FNCPERSON',
  SET_PERSON_QUESTION_LIST: 'SET_PERSON_QUESTION_LIST',
  SET_FNBINFSAL: 'SET_FNBINFSAL',
};

const _setPERSON = (data: any) => {
  return {type: ActionType.SET_FNCPERSON, data};
};
const _setFNBINFSAL = (data: any) => {
  return {type: ActionType.SET_FNBINFSAL, data};
};

/* const _setFNCPERSON = (data: FNCPERSON) => {
  return {type: ActionType.SET_FNCPERSON, data};
}; */

export const clearFNCPERSON = () => (dispatch: any) => {
  let person = {
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
    TEL_CEDULAR: null,
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
  dispatch(_setPERSON(person));
};
export const clearFNBINFSAL = () => (dispatch: any) => {
  let cFNBINFSAL = {
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
  dispatch(_setFNBINFSAL(cFNBINFSAL));
};

export const setFNBINFSAL = (data: FNBINFSAL) => async (dispatch: any) => {
  dispatch(_setFNBINFSAL(data));
};
export const setFNCPERSON = (data: FNCPERSON) => async (dispatch: any) => {
  dispatch(_setPERSON(data));
};
