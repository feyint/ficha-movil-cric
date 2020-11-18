import {FUBUBIVIV, FNBNUCVIV_FVCCONVIV, FNBNUCVIV} from './types';
import {HousingService} from '../../services';
import {HousingQuestion} from '../../modules/housing/state/types';
import { prototype } from 'realm';

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
export const saveFUBUBIVIV = (data: any) => async (dispatch: any) => {
  let houseServie: HousingService = new HousingService();
  await houseServie.SaveHouse(data);
  dispatch(_setFUBUBIVIV(data));
};
export const saveFNBNUCVIV = (data: any) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNBNUCVIV = store.housing.FNBNUCVIV;
  let houseServie: HousingService = new HousingService();
  let result = await houseServie.SaveFNBNUCVIV(data);
  if (result) {
    family.CODIGO = result.CODIGO;
    family.FUBUBIVIV_ID = result.FUBUBIVIV_ID;
    family.ID = result.ID;
  }
  dispatch(_setFNBNUCVIV(family));
  return family;
};
export const saveFNBNUCVIVPropiety = (propiety: any, value: any) => async (
  dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: any = store.housing.FNBNUCVIV;
  let houseServie: HousingService = new HousingService();
  let updatedProp = await houseServie.SaveFNBNUCVIVPropiety(
    family.ID,
    propiety,
    value,
  );
  if (updatedProp == true) {
    family[propiety] = value;
    dispatch(_setFNBNUCVIV(family));
  }
};
export const updateFUBUBIVIV = (data: any) => async (dispatch: any) => {
  let houseServie: HousingService = new HousingService();
  await houseServie.UpdateHouse(data);
  dispatch(_setFUBUBIVIV(data));
};
export const setFUBUBIVIV = (data: any) => async (dispatch: any) => {
  dispatch(_setFUBUBIVIV(data));
};
const setHOUSING_QUESTION_LIST = (data: HousingQuestion[]) => {
  return {type: ActionType.SET_HOUSING_QUESTION_LIST, data};
};
export const setFNBNUCVIV = (data: any) => (dispatch: any) => {
  dispatch(_setFNBNUCVIV(data));
};
export const saveAnswerLocal = (
  type: number,
  questionCode: string,
  answer: any,
) => async (_dispatch: any, getState: any) => {
  if (questionCode && answer) {
    const store = getState();
    let questionItems: HousingQuestion[] = store.housing.HOUSINGQUESTIONLIST;
    let item: any = getQuestionByCode(questionCode, questionItems);
    if (item) {
      let family: FNBNUCVIV = store.housing.FNBNUCVIV;
      let houseServie: HousingService = new HousingService();
      switch (type) {
        case 1: // oneOption
          let option = getOption(item.ID, JSON.parse(answer), family.ID);
          if (option.FVCCONVIV_ID) {
            await houseServie.saveQuestionOption([option]);
          } else {
            await houseServie.deleteAnswerForQuestion(family.ID, item.ID);
          }
          break;
        case 2: // multiSelect
          let options = [];
          for (let i = 0; i < answer.length; i++) {
            let opt = getOption(item.ID, answer[i], family.ID);
            options.push(opt);
          }
          if (options.length > 0) {
            await houseServie.saveQuestionOption(options);
          } else {
            await houseServie.deleteAnswerForQuestion(family.ID, item.ID);
          }
          break;
        default:
          break;
      }
    }
  }
};
export function getQuestionByCode(
  questionCode: string,
  questionItems: HousingQuestion[],
) {
  if (questionItems.length === 0) {
    setQuestionWithOptions();
  }
  // eslint-disable-next-line no-shadow
  // eslint-disable-next-line prettier/prettier
  let item = questionItems.find(item => {
    return item.CODIGO === questionCode;
  });
  return item as HousingQuestion;
}
export const setQuestionWithOptions = () => async (
  _dispatch: any,
  getState: any,
) => {
  try {
    const store = getState();
    let questions = store.housing.HOUSINGQUESTIONLIST;
    if (questions && questions.length == 0) {
      let questionItems: HousingQuestion[] = [];
      let houseServie: HousingService = new HousingService();
      questionItems = await houseServie.getQuestionWithOptions();
      _dispatch(setHOUSING_QUESTION_LIST(questionItems));
    }
  } catch (error) {
    console.error(error);
  }
};
export const getQuestionWithOptions = (questionsQuery?: any[]) => async (
  _dispatch: any,
  getState: any,
) => {
  const store = getState();
  let questionItems: HousingQuestion[] = store.housing.HOUSINGQUESTIONLIST;
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
export const getQuestionAnswer = (type: number, questionCode: string) => async (
  _dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNBNUCVIV = store.housing.FNBNUCVIV;
  let houseServie: HousingService = new HousingService();
  let questionItems: HousingQuestion[] = store.housing.HOUSINGQUESTIONLIST;
  let question = getQuestionByCode(questionCode, questionItems);
  switch (type) {
    case 1: // oneOption
      let option = await houseServie.getAnswerOneOption(family.ID, question.ID);
      return '' + option;
    case 2: // multiSelect
      let options = [];
      options = await houseServie.getAnswerMultiSelect(family.ID, question.ID);
      return options;
    default:
      break;
  }
};
function getOption(questionID: number, answerID: number, nucleoID: number) {
  let object: FNBNUCVIV_FVCCONVIV = {
    FNBNUCVIV_ID: nucleoID,
    FVCCONVIV_ID: answerID,
    FVCELEVIV_ID: questionID,
    SYNCSTATE: 0,
  };
  return object;
}
