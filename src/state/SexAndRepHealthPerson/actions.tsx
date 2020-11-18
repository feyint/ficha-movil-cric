import {SexAndRepHealthPersonService} from '../../services';
import {SexAndRepHealthPersonQuestion} from '../../modules/person/manage/state/types';
import {FNCSALREP, FNCSALREP_FNCCONREP} from './types';

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
export const updateFNCSALREP = (data: any) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let FNCSALREPitem = store.sarhealthperson.FNCSALREP;
  let service: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
  let item = {
    ID: FNCSALREPitem.ID,
    FNCPERSON_ID: FNCSALREPitem.FNCPERSON_ID,
    EDAD_PRIMERA_REGLA: FNCSALREPitem.EDAD_PRIMERA_REGLA,
    GRAVIDEZ: FNCSALREPitem.GRAVIDEZ,
    PARIDEZ: FNCSALREPitem.PARIDEZ,
    ABORTO: FNCSALREPitem.ABORTO,
    CESAREA: FNCSALREPitem.CESAREA,
    NACIDOS_VIVOS: FNCSALREPitem.NACIDOS_VIVOS,
    NACIDOS_MUERTOS: FNCSALREPitem.NACIDOS_MUERTOS,
    PARTO_ULTIMO: FNCSALREPitem.PARTO_ULTIMO,
    ULTIMA_REGLA: FNCSALREPitem.ULTIMA_REGLA,
    EDAD_GESTACION: FNCSALREPitem.EDAD_GESTACION,
    PARTO_ESTIMADO: FNCSALREPitem.PARTO_ESTIMADO,
    PRESENCIA_FAM: FNCSALREPitem.PRESENCIA_FAM,
    SEROLOGIA: FNCSALREPitem.SEROLOGIA,
    VIH: FNCSALREPitem.VIH,
    RESUL_CITOLOGIA: FNCSALREPitem.RESUL_CITOLOGIA,
    ACCION_CITOLOGIA: FNCSALREPitem.ACCION_CITOLOGIA,
    RESUL_PROSTATA: FNCSALREPitem.RESUL_PROSTATA,
    ACCION_PROSTATA: FNCSALREPitem.ACCION_PROSTATA,
  };
  await service.UpdateFNCSALREP(data);
  for (const key of Object.keys(data)) {
    if (key in item && key !== 'ID') {
      item[key] = data[key];
    }
  }
  dispatch(_setFNCSALREP(item));
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

const setSEXANDREPHEALTHPERSON_QUESTION_LIST = (
  data: SexAndRepHealthPersonQuestion[],
) => {
  return {type: ActionType.SET_SEXANDREPHEALTHPERSON_QUESTION_LIST, data};
};

export const saveFNCSALREP = (data: any) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNCSALREP = store.sarhealthperson.FNCSALREP;
  let personServie: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
  let result = await personServie.SaveFNCSALREP(data);
  if (result) {
    family.FNCPERSON_ID = result.FNCPERSON_ID;
    family.ID = result.ID;
  }
  dispatch(_setFNCSALREP(family));
  return family;
};

export const saveFNCSALREPPropiety = (propiety: any, value: any) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: any = store.sarhealthperson.FNCSALREP;
  let personServie: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
  let updatedProp = await personServie.SaveFNCSALREPPropiety(
    family.ID,
    propiety,
    value,
  );
  if (updatedProp == true) {
    family[propiety] = value;
    dispatch(_setFNCSALREP(family));
  }
};
export const setFNCSALREP = (data: any) => (dispatch: any) => {
  dispatch(_setFNCSALREP(data));
};

/**
 *
 */
export const setSexAndRepHealthQuestionWithOptions = () => async (
  _dispatch: any,
  getState: any,
) => {
  const store = getState();
  if (store.sarhealthperson.SEXANDREPHEALTHPERSONQUESTIONLIST.length == 0) {
    let questionItems: SexAndRepHealthPersonQuestion[] = [];
    let personServie: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
    questionItems = await personServie.getQuestionWithOptions();
    _dispatch(setSEXANDREPHEALTHPERSON_QUESTION_LIST(questionItems));
  }
};
/**
 *
 * @param questionsQuery
 */
export const getQuestionWithOptions = (questionsQuery?: any[]) => async (
  _dispatch: any,
  getState: any,
) => {
  const store = getState();
  let questionItems: SexAndRepHealthPersonQuestion[] =
    store.sarhealthperson.SEXANDREPHEALTHPERSONQUESTIONLIST;
  if (questionItems.length === 0) {
    setSexAndRepHealthQuestionWithOptions();
  }
  if (questionsQuery) {
    questionItems = questionItems.filter((item) => {
      return questionsQuery.indexOf(item.CODIGO) !== -1;
    });
  }
  return questionItems;
};

/**
 *
 * @param type
 * @param questionCode
 * @param answer
 */
export const saveAnswerLocal = (
  type: number,
  questionCode: string,
  answer: any,
) => async (_dispatch: any, getState: any) => {
  if (questionCode) {
    const store = getState();
    let questionItems: SexAndRepHealthPersonQuestion[] =
      store.sarhealthperson.SEXANDREPHEALTHPERSONQUESTIONLIST;
    let item: any = getQuestionByCode(questionCode, questionItems);
    if (item) {
      let family: FNCSALREP = store.sarhealthperson.FNCSALREP;
      let personServie: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
      switch (type) {
        case 1: // oneOption
          let option = getOption(item.ID, JSON.parse(answer), family.ID);
          if (option.FNCCONREP_ID) {
            await personServie.saveQuestionOption([option]);
          } else {
            await personServie.deleteAnswerForQuestion(family.ID, item.ID);
          }
          break;
        case 2: // multiSelect
          let options = [];
          for (let i = 0; i < answer.length; i++) {
            let opt = getOption(item.ID, answer[i], family.ID);
            options.push(opt);
          }
          if (options.length > 0) {
            await personServie.saveQuestionOption(options);
          } else {
            await personServie.deleteAnswerForQuestion(family.ID, item.ID);
          }
          break;
        default:
          break;
      }
    }
  }
};

/**
 *
 * @param type
 * @param questionCode
 */
export const getQuestionAnswer = (type: number, questionCode: string) => async (
  _dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNCSALREP = store.sarhealthperson.FNCSALREP;
  let personServie: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
  let questionItems: SexAndRepHealthPersonQuestion[] =
    store.sarhealthperson.SEXANDREPHEALTHPERSONQUESTIONLIST;
  let question = getQuestionByCode(questionCode, questionItems);
  switch (type) {
    case 1: // oneOption
      let option = await personServie.getAnswerOneOption(
        family.ID,
        question.ID,
      );
      return '' + option;
    case 2: // multiSelect
      let options = [];
      options = await personServie.getAnswerMultiSelect(family.ID, question.ID);
      return options;
    default:
      break;
  }
};

/**
 *
 * @param questionCode
 * @param questionItems
 */
export function getQuestionByCode(
  questionCode: string,
  questionItems: SexAndRepHealthPersonQuestion[],
) {
  if (questionItems.length === 0) {
    setSexAndRepHealthQuestionWithOptions();
  }
  let item = questionItems.find(item => {
    return item.CODIGO === questionCode;
  });
  return item as SexAndRepHealthPersonQuestion;
}

/**
 *
 * @param questionID
 * @param answerID
 * @param fncsalrepID
 */
function getOption(questionID: number, answerID: number, fncsalrepID: number) {
  let object: FNCSALREP_FNCCONREP = {
    FNCCONREP_ID: answerID,
    FNCSALREP_ID: fncsalrepID,
    FNCELEREP_ID: questionID,
    SYNCSTATE: 0,
  };
  return object;
}
