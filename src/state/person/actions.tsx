import {PersonService} from '../../services';
import {PersonQuestion} from '../../modules/person/manage/state/types';
import {
  FNBINFSAL,
  FNBINFSAL_FNCCONSAL,
  FNBNUCVIV_FNCPERSON,
  FNCPERSON,
} from './types';
import PersonRelationService from '../../services/PersonRelationService';
import { FNBNUCVIV } from '../house/types';

export const ActionType = {
  SET_FNCPERSON: 'SET_FNCPERSON',
  SET_PERSON_QUESTION_LIST: 'SET_PERSON_QUESTION_LIST',
};

const setPERSON_QUESTION_LIST = (data: PersonQuestion[]) => {
  return {type: ActionType.SET_PERSON_QUESTION_LIST, data};
};
const _setPERSON = (data: any) => {
  return {type: ActionType.SET_FNCPERSON, data};
};

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

export const setFNCPERSON = (data: FNCPERSON) => async (dispatch: any) => {
  dispatch(_setPERSON(data));
};
export const saveFNCPERSON = (data: FNCPERSON) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNBNUCVIV = store.housing.FNBNUCVIV;
  let person: FNCPERSON = store.person.FNCPERSON;
  let personServie: PersonService = new PersonService();
  let personRelation: PersonRelationService = new PersonRelationService();
  if (person.ID != null) {
    let item = person;
    item.FNCTIPIDE_ID = data.FNCTIPIDE_ID;
    item.FNCGENERO_ID = data.FNCGENERO_ID;
    item.PRIMER_NOMBRE = data.PRIMER_NOMBRE;
    item.SEGUNDO_NOMBRE = data.SEGUNDO_NOMBRE;
    item.PRIMER_APELLIDO = data.PRIMER_APELLIDO;
    item.SEGUNDO_APELLIDO = data.SEGUNDO_APELLIDO;
    item.IDENTIFICACION = data.IDENTIFICACION;
    let result = await personServie.UpdateFNCPERSON(item);
    dispatch(_setPERSON(person));
  } else {
    console.error('UPDATE ', data);
    let result = await personServie.SaveFNCPERSON(data);
    if (result) {
      let nucleoPersona: FNBNUCVIV_FNCPERSON = {
        FNBNUCVIV_ID: family.ID,
        FNCPERSON_ID: result.ID,
        ID: -1,
      };
      personRelation.SaveFNBNUCVIV_FNCPERSON(nucleoPersona);
      data.CODIGO = result.CODIGO;
      data.ID = result.ID;
    }
    dispatch(_setPERSON(data));
  }
};
/**
 *
 */
export const setQuestionWithOptions = () => async (dispatch: any) => {
  let questionItems: PersonQuestion[] = [];
  let personServie: PersonService = new PersonService();
  questionItems = await personServie.getQuestionWithOptions();
  dispatch(setPERSON_QUESTION_LIST(questionItems));
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
  let questionItems: PersonQuestion[] = store.person.PERSONQUESTIONLIST;
  if (questionItems.length === 0) {
    setQuestionWithOptions();
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
    let questionItems: PersonQuestion[] = store.person.PERSONQUESTIONLIST;
    let item: any = getQuestionByCode(questionCode, questionItems);
    if (item) {
      let family: FNBINFSAL = store.person.FNBINFSAL;
      let personServie: PersonService = new PersonService();
      switch (type) {
        case 1: // oneOption
          let option = getOption(item.ID, JSON.parse(answer), family.ID);
          if (option.FNCCONSAL_ID) {
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
  let family: FNBINFSAL = store.person.FNBINFSAL;
  let personServie: PersonService = new PersonService();
  let questionItems: PersonQuestion[] = store.person.PERSONQUESTIONLIST;
  let question = getQuestionByCode(questionCode, questionItems);
  console.log('answer query ', question);
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
  questionItems: PersonQuestion[],
) {
  if (questionItems.length === 0) {
    setQuestionWithOptions();
  }
  let item = questionItems.find((item) => {
    return item.CODIGO === questionCode;
  });
  return item as PersonQuestion;
}

/**
 *
 * @param questionID
 * @param answerID
 * @param fnbinfsalID
 */
function getOption(questionID: number, answerID: number, fnbinfsalID: number) {
  let object: FNBINFSAL_FNCCONSAL = {
    FNCCONSAL_ID: answerID,
    FNBINFSAL_ID: fnbinfsalID,
    FNCELESAL_ID: questionID,
    SYNCSTATE: 0,
  };
  return object;
}
