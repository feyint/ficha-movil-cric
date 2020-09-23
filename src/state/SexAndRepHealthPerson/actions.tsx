import {SexAndRepHealthPersonService} from '../../services';
import {SexAndRepHealthPersonQuestion} from '../../modules/person/manage/state/types';
import {FNCSALREP, FNCSALREP_FNCCONREP} from './types';

export const ActionType = {
  SET_SEXANDREPHEALTHPERSON_QUESTION_LIST:
    'SET_SEXANDREPHEALTHPERSON_QUESTION_LIST',
};

const setSEXANDREPHEALTHPERSON_QUESTION_LIST = (
  data: SexAndRepHealthPersonQuestion[],
) => {
  return {type: ActionType.SET_SEXANDREPHEALTHPERSON_QUESTION_LIST, data};
};

/**
 *
 */
export const setSexAndRepHealthQuestionWithOptions = () => async (dispatch: any) => {
  let questionItems: SexAndRepHealthPersonQuestion[] = [];
  let personServie: SexAndRepHealthPersonService = new SexAndRepHealthPersonService();
  questionItems = await personServie.getQuestionWithOptions();
  dispatch(setSEXANDREPHEALTHPERSON_QUESTION_LIST(questionItems));
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
