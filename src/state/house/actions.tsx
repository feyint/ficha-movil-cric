import {FUBUBIVIV, FVBVIVIEN_FVCCONVIVSCHEMA} from './types';
import {HousingService} from '../../services';

export const ActionType = {
  SET_FUBUBIVIV: 'SET_FUBUBIVIV',
  SET_QUESTIONLIST: 'SET_QUESTIONLIST',
};
const setFUBUBIVIV = (data: FUBUBIVIV) => {
  return {type: ActionType.SET_FUBUBIVIV, data};
};
export const SaveFUBUBIVIV = (data: any) => (dispatch: any) => {
  dispatch(setFUBUBIVIV(data));
};
export const saveAnswerLocal = (
  type: number,
  questionCode: string,
  answer: any,
) => async (_dispatch: any, getState: any) => {
  const store = getState();
  let ubicationHouse: FUBUBIVIV = store.housing.FUBUBIVIV;
  let houseServie: HousingService = new HousingService();
  switch (type) {
    case 1: // oneOption
      let option = getOption(questionCode, answer, ubicationHouse.CODIGO);
      await houseServie.saveQuestionOption([option]);
      break;
    case 2: // multiSelect
      let options = [];
      for (let i = 0; i < answer.length; i++) {
        let opt = getOption(questionCode, answer[i], ubicationHouse.CODIGO);
        options.push(opt);
      }
      await houseServie.saveQuestionOption(options);
      break;
    default:
      break;
  }
};
function getOption(questionCode: string, answerid: number, housecode: string) {
  let object: FVBVIVIEN_FVCCONVIVSCHEMA = {
    FVBVIVIEN_CODE: housecode,
    FVBVIVIEN_ID: 0,
    FVCCONVIV_CODE: '',
    FVCCONVIV_ID: answerid,
    FVCELEVIV_CODE: questionCode,
    FVCELEVIV_ID: 0,
    SYNCSTATE: 0,
  };
  return object;
}