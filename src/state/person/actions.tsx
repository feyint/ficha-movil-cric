import {PersonService, SexAndRepHealthPersonService} from '../../services';
import {PersonQuestion} from '../../modules/person/manage/state/types';
import {
  FNBINFSAL,
  FNBINFSAL_FNCCONSAL,
  FNBNUCVIV_FNCPERSON,
  FNCPERSON,
} from './types';
import PersonRelationService from '../../services/PersonRelationService';
import {FNBNUCVIV} from '../house/types';
import {Alert} from 'react-native';

export const ActionType = {
  SET_FNCPERSON: 'SET_FNCPERSON',
  SET_PERSON_QUESTION_LIST: 'SET_PERSON_QUESTION_LIST',
  SET_FNBINFSAL: 'SET_FNBINFSAL',
};

const setPERSON_QUESTION_LIST = (data: PersonQuestion[]) => {
  return {type: ActionType.SET_PERSON_QUESTION_LIST, data};
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
export const saveFNCPERSON = (data: FNCPERSON) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNBNUCVIV = store.housing.FNBNUCVIV;
  try {
    let personServie: PersonService = new PersonService();
    let sexhealtService: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
    let result = await personServie.SaveFNCPERSON(data, family.ID);
    if (result) {
      data.CODIGO = result.CODIGO;
      data.ID = result.ID;
      sexhealtService.SaveFNCSALREP({
        FNCPERSON_ID: result.ID,
      });
    }
    dispatch(_setPERSON(data));
  } catch (error) {
    Alert.alert(
      'Ha ocurrido un error',
      error.message,
      [
        {
          text: 'aceptar',
        },
      ],
    );
    return false;
  }
  return data;
};
export const saveSaveFNBNUCVIV_FNCPERSON = (data: FNCPERSON) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNBNUCVIV = store.housing.FNBNUCVIV;
  let personRelation: PersonRelationService = new PersonRelationService();
  let nucleoPersona: FNBNUCVIV_FNCPERSON = {
    FNBNUCVIV_ID: family.ID,
    FNCPERSON_ID: data.ID,
    ID: -1,
  };
  try {
    await personRelation.SaveFNBNUCVIV_FNCPERSON(nucleoPersona);
    dispatch(_setPERSON(data));
    return true;
  } catch (error) {
    return false;
  }
};
export const updateFNCPERSON = (data: any) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let person = store.person.FNCPERSON;
  let item = {
    ID: person.ID,
    CODIGO: person.CODIGO,
    IDENTIFICACION: person.IDENTIFICACION,
    PRIMER_NOMBRE: person.PRIMER_NOMBRE,
    SEGUNDO_NOMBRE: person.SEGUNDO_NOMBRE,
    PRIMER_APELLIDO: person.PRIMER_APELLIDO,
    SEGUNDO_APELLIDO: person.SEGUNDO_APELLIDO,
    FECHA_NACIMIENTO: person.FECHA_NACIMIENTO,
    TEL_CELULAR: person.TEL_CELULAR,
    TEL_ALTERNO: person.TEL_ALTERNO,
    CORREO_ELECTRONICO: person.CORREO_ELECTRONICO,
    FNCTIPIDE_ID: person.FNCTIPIDE_ID,
    FNCORGANI_ID: person.FNCORGANI_ID,
    FNCLUNIND_ID: person.FNCLUNIND_ID,
    FNCOCUPAC_ID: person.FNCOCUPAC_ID,
    FUCMUNICI_ID: person.FUCMUNICI_ID,
    FNCPAREN_ID: person.FNCPAREN_ID,
    FNCGENERO_ID: person.FNCGENERO_ID,
  };
  let personServie: PersonService = new PersonService();
  await personServie.UpdateFNCPERSON(Object.assign(data, {ID: person.ID}));
  for (const key of Object.keys(data)) {
    if (key in item && key !== 'ID') {
      item[key] = data[key];
    }
  }
  dispatch(_setPERSON(item));
};
/**
 *
 */
export const setQuestionWithOptions = () => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let items: PersonQuestion[] = store.person.PERSONQUESTIONLIST;
  if (items && items.length == 0) {
    let questionItems: PersonQuestion[] = [];
    let personServie: PersonService = new PersonService();
    questionItems = await personServie.getQuestionWithOptions();
    dispatch(setPERSON_QUESTION_LIST(questionItems));
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
export const saveFNCPERSONPropiety = (propiety: any, value: any) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: any = store.person.FNCPERSON;
  let personServie: PersonService = new PersonService();
  let updatedProp = await personServie.SaveFNCPERSONPropiety(
    family.ID,
    propiety,
    value,
  );
  if (updatedProp == true) {
    family[propiety] = value;
    dispatch(_setPERSON(family));
  }
};
