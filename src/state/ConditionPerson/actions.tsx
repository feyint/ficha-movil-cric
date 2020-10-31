import {ConditionPersonService} from '../../services';
import {ConditionPersonQuestion} from '../../modules/person/manage/state/types';
import {FNCPERSON, FNCPERSON_FNCCONPER} from '../person/types';
export const ActionType = {
  SET_CONDITIONPERSON_QUESTION_LIST: 'SET_CONDITIONPERSON_QUESTION_LIST',
};

const setCONDITIONPERSON_QUESTION_LIST = (data: ConditionPersonQuestion[]) => {
  return {type: ActionType.SET_CONDITIONPERSON_QUESTION_LIST, data};
};

/**
 *
 */
export const setConditionQuestionWithOptions = () => async (dispatch: any) => {
  let questionItems: ConditionPersonQuestion[] = [];
  let personServie: ConditionPersonService = new ConditionPersonService();
  questionItems = await personServie.getQuestionWithOptions();
  dispatch(setCONDITIONPERSON_QUESTION_LIST(questionItems));
  return questionItems;
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
    questionItems = await setConditionQuestionWithOptions();
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
    try {
      const store = getState();
      let questionItems: ConditionPersonQuestion[] =
        store.conditionperson.CONDITIONPERSONQUESTIONLIST;
      let question: any = await getQuestionByCode(questionCode, questionItems);
      if (question) {
        let person: FNCPERSON = store.person.FNCPERSON;
        let personServie: ConditionPersonService = new ConditionPersonService();
        switch (type) {
          case 1: // oneOption
            let option = getOption(question.ID, JSON.parse(answer), person.ID);
            if (option.FNCCONPER_ID) {
              await personServie.saveQuestionOption([option]);
            } else {
              await personServie.deleteAnswerForQuestion(
                person.ID,
                question.ID,
              );
            }
            break;
          case 2: // multiSelect
            let options = [];
            for (let i = 0; i < answer.length; i++) {
              let opt = getOption(question.ID, answer[i], person.ID);
              options.push(opt);
            }
            if (options.length > 0) {
              await personServie.saveQuestionOption(options);
            } else {
              await personServie.deleteAnswerForQuestion(person.ID, item.ID);
            }
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error(error);
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
  let person: FNCPERSON = store.person.FNCPERSON;
  let personServie: ConditionPersonService = new ConditionPersonService();
  let questionItems: ConditionPersonQuestion[] =
    store.conditionperson.CONDITIONPERSONQUESTIONLIST;
  let question = await getQuestionByCode(questionCode, questionItems);
  switch (type) {
    case 1: // oneOption
      let option = await personServie.getAnswerOneOption(
        person.ID,
        question.ID,
      );
      return '' + option;
    case 2: // multiSelect
      let options = [];
      options = await personServie.getAnswerMultiSelect(person.ID, question.ID);
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
export async function getQuestionByCode(
  questionCode: string,
  questionItems: ConditionPersonQuestion[],
) {
  if (questionItems.length === 0) {
    questionItems = await setConditionQuestionWithOptions();
  }
  let item = questionItems.find((item) => {
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
