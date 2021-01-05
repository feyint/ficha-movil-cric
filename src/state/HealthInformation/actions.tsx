import {FNCSALREP} from './types';

export const ActionType = {
  SET_FNCSALREP: 'SET_FNCSALREP',
  SET_SEXANDREPHEALTHPERSON_QUESTION_LIST:
    'SET_SEXANDREPHEALTHPERSON_QUESTION_LIST',
};

export const clearFNCNCSALREP = () => (dispatch: any) => {
  let NCSALREP: any = {
    ID: null,
    FNCPERSON_ID: null,
    EDAD_PRIMERA_REGLA: null,
    GRAVIDEZ: null,
    PARIDEZ: null,
    ABORTO: null,
    CESAREA: null,
    NACIDOS_VIVOS: null,
    NACIDOS_MUERTOS: null,
    PARTO_ULTIMO: null,
    ULTIMA_REGLA: null,
    EDAD_GESTACION: null,
    PARTO_ESTIMADO: null,
    PRESENCIA_FAM: null,
    SEROLOGIA: null,
    VIH: null,
    RESUL_CITOLOGIA: null,
    ACCION_CITOLOGIA: null,
    RESUL_PROSTATA: null,
    ACCION_PROSTATA: null,
    USUARIO_DATA: null,
    FECHA_ACTIVIDAD: null,
    FECHA_CREACION: null,
    ORIGEN_DATA: null,
  };
  dispatch(_setFNCSALREP(NCSALREP));
};

export const setFNCNCSALREP = (data: FNCSALREP) => async (dispatch: any) => {
  dispatch(_setFNCSALREP(data));
};
const _setFNCSALREP = (data: FNCSALREP) => {
  return {type: ActionType.SET_FNCSALREP, data};
};

export const clearFNCSALREP = () => (dispatch: any) => {
  // eslint-disable-next-line no-shadow
  let FNCSALREP: any = {
    ID: null,
    EDAD_PRIMERA_REGLA: null,
    GRAVIDEZ: null,
    PARIDEZ: null,
    ABORTO: null,
    CESAREA: '',
    NACIDOS_VIVOS: null,
    NACIDOS_MUERTOS: null,
    PARTO_ULTIMO: new Date(),
    ULTIMA_REGLA: new Date(),
    EDAD_GESTACION: '',
    PARTO_ESTIMADO: new Date(),
    PRESENCIA_FAM: null,
    SEROLOGIA: null,
    VIH: null,
    RESUL_CITOLOGIA: '',
    ACCION_CITOLOGIA: null,
    RESUL_PROSTATA: '',
    ACCION_PROSTATA: null,
    FECHA_ACTIVIDAD: new Date(),
    USUARIO_DATA: '',
    FECHA_CREACION: new Date(),
    ORIGEN_DATA: '',
    FNCPERSON_ID: null,
  };
  dispatch(_setFNCSALREP(FNCSALREP));
};

export const setFNCSALREP = (data: any) => (dispatch: any) => {
  dispatch(_setFNCSALREP(data));
};
