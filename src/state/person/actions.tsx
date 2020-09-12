import {FUBUBIVIV, FNBNUCVIV_FVCCONVIV, FNBNUCVIV} from './types';
import {PersonService} from '../../services';
import {PersonQuestion} from '../../modules/person/manage/state/types';
//import {HousingQuestion} from '../../modules/housing/state/types';
export const ActionType = {
  SET_FUBUBIVIV: 'SET_FUBUBIVIV',
  SET_FNBNUCVIV: 'SET_FNBNUCVIV',
  SET_Person_QUESTION_LIST: 'SET_PERSON_QUESTION_LIST',
};
const setFUBUBIVIV = (data: FUBUBIVIV) => {
  return {type: ActionType.SET_FUBUBIVIV, data};
};
const set_FNBNUCVIV = (data: FNBNUCVIV) => {
  return {type: ActionType.SET_FNBNUCVIV, data};
};
const setPERSON_QUESTION_LIST = (data: PersonQuestion[]) => {
  return {type: ActionType.SET_PERSON_QUESTION_LIST, data};
};
export const SaveFUBUBIVIV = (data: any) => (dispatch: any) => {
  dispatch(setFUBUBIVIV(data));
};
export const setFNBNUCVIV = (data: any) => (dispatch: any) => {
  dispatch(set_FNBNUCVIV(data));
};
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
      let family: FNBNUCVIV = store.person.FNBNUCVIV;
      let personServie: PersonService = new PersonService();
      switch (type) {
        case 1: // oneOption
          let option = getOption(item.ID, JSON.parse(answer), family.ID);
          if (option.FVCCONVIV_ID) {
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
export function getQuestionByCode(
  questionCode: string,
  questionItems: PersonQuestion[],
) {
  if (questionItems.length === 0) {
    setQuestionWithOptions();
  }
  // eslint-disable-next-line no-shadow
  // eslint-disable-next-line prettier/prettier
  let item = questionItems.find(item => {
    return item.CODIGO === questionCode;
  });
  return item as PersonQuestion;
}
export const setQuestionWithOptions = () => async (dispatch: any) => {
  let questionItems: PersonQuestion[] = [];
  let personServie: PersonService = new PersonService();
  questionItems = await personServie.getQuestionWithOptions();
  dispatch(setPERSON_QUESTION_LIST(questionItems));
};
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
export const getQuestionAnswer = (type: number, questionCode: string) => async (
  _dispatch: any,
  getState: any,
) => {
  const store = getState();
  let family: FNBNUCVIV = store.person.FNBNUCVIV;
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
function getOption(questionID: number, answerID: number, nucleoID: number) {
  let object: FNBNUCVIV_FVCCONVIV = {
    FNBNUCVIV_ID: nucleoID,
    FVCCONVIV_ID: answerID,
    FVCELEVIV_ID: questionID,
    SYNCSTATE: 0,
  };
  return object;
}
