import {ActionType} from './actions';
import {SexAndRepHealthPersonQuestion} from '../../modules/person/manage/state/types';

// TODO traer de la base de datos
const FNCSALREP = {
  ID: 12345,
  EDAD_PRIMERA_REGLA: 14,
  GRAVIDEZ: 1,
  PARIDEZ: 1,
  ABORTO: 1,
  CESAREA: 'no',
  NACIDOS_VIVOS: 2,
  NACIDOS_MUERTOS: 1,
  PARTO_ULTIMO: new Date(),
  ULTIMA_REGLA: new Date(),
  EDAD_GESTACION: '16',
  PARTO_ESTIMADO: new Date(),
  PRESENCIA_FAM: 1,
  SEROLOGIA: 1,
  VIH: 1,
  RESUL_CITOLOGIA: 'negativo',
  ACCION_CITOLOGIA: 1,
  RESUL_PROSTATA: 'negativo',
  ACCION_PROSTATA: 1,
  FECHA_ACTIVIDAD: new Date(),
  USUARIO_DATA: 'SYSTEM_USER_CTL',
  FECHA_CREACION: new Date(),
  ORIGEN_DATA: 'SYSTEM_USER_CTL',
};
/* const FNCSALREP = {
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
}; */

const initialState = {
  FNCSALREP: FNCSALREP,
  SEXANDREPHEALTHPERSONQUESTIONLIST: [] as SexAndRepHealthPersonQuestion[],
};

export default (state = initialState, action: any) => {
  //console.log('Action Status Person: ', action);
  switch (action.type) {
    case ActionType.SET_SEXANDREPHEALTHPERSON_QUESTION_LIST:
      return {
        ...state,
        SEXANDREPHEALTHPERSONQUESTIONLIST: action.data,
      };
    case ActionType.SET_FNCSALREP:
      return {
        ...state,
        FNCSALREP: action.data,
      };
    default:
      return state;
  }
};
