import {ActionType} from './actions';
const FNCSALREPDATA = {
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
const initialState = {
  FNCSALREP: FNCSALREPDATA,
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_FNCSALREP:
      return {
        ...state,
        FNCSALREP: action.data,
      };
    default:
      return state;
  }
};
