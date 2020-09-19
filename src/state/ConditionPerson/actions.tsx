import {ConditionPersonService} from '../../services';
import {ConditionPersonQuestion} from '../../modules/person/manage/state/types';
import {FNCPERSON, FNCPERSON_FNCCONPER} from './types';

export const ActionType = {
  SET_CONDITIONPERSON_QUESTION_LIST: 'SET_CONDITIONPERSON_QUESTION_LIST',
};

const setCONDITIONPERSON_QUESTION_LIST = (data: ConditionPersonQuestion[]) => {
  return {type: ActionType.SET_CONDITIONPERSON_QUESTION_LIST, data};
};

/**
 *
 */
export const setQuestionWithOptions = () => async (dispatch: any) => {
  let questionItems: ConditionPersonQuestion[] = [];
  let personServie: ConditionPersonService = new ConditionPersonService();
  questionItems = await personServie.getQuestionWithOptions();
  dispatch(setCONDITIONPERSON_QUESTION_LIST(questionItems));
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
  let questionItems: ConditionPersonQuestion[] =
    store.conditionperson.CONDITIONPERSONQUESTIONLIST;
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
    let questionItems: ConditionPersonQuestion[] =
      store.conditionperson.CONDITIONPERSONQUESTIONLIST;
    let item: any = getQuestionByCode(questionCode, questionItems);
    if (item) {
      let family: FNCPERSON = store.conditionperson.FNCPERSON;
      let personServie: ConditionPersonService = new ConditionPersonService();
      switch (type) {
        case 1: // oneOption
          let option = getOption(item.ID, JSON.parse(answer), family.ID);
          if (option.FNCCONPER_ID) {
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
  let family: FNCPERSON = store.conditionperson.FNCPERSON;
  let personServie: ConditionPersonService = new ConditionPersonService();
  let questionItems: ConditionPersonQuestion[] =
    store.conditionperson.CONDITIONPERSONQUESTIONLIST;
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
  questionItems: ConditionPersonQuestion[],
) {
  if (questionItems.length === 0) {
    setQuestionWithOptions();
  }
  let item = questionItems.find(item => {
    return item.CODIGO === questionCode;
  });
  return item as ConditionPersonQuestion;
}

/**
 *
 * @param questionID
 * @param answerID
 * @param fncpersonID
 */
function getOption(questionID: number, answerID: number, fncpersonID: number) {
  let object: FNCPERSON_FNCCONPER = {
    FNCCONPER_ID: answerID,
    FNCPERSON_ID: fncpersonID,
    FNCELEPER_ID: questionID,
    SYNCSTATE: 0,
  };
  return object;
}
