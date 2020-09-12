
import { PersonService } from '../../services';
import { PersonQuestion } from '../../modules/person/manage/state/types';

export const ActionType = {
  SET_PERSON_QUESTION_LIST: 'SET_PERSON_QUESTION_LIST',
};

const setPERSON_QUESTION_LIST = (data: PersonQuestion[]) => {
  return { type: ActionType.SET_PERSON_QUESTION_LIST, data };
};

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
