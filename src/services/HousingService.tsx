import {
  FVCELEVIVSCHEMA,
  schemaVersion,
  FVCCONVIVSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  HousingQuestion,
  HousingQuestionOption,
} from '../modules/housing/state/types';

export default class HousingService {
  async getQuestionWithOptions() {
    let questionItems: HousingQuestion[] = [];
    const result = await Realm.open({
      schema: [FVCELEVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let servicios = realm.objects('FVCELEVIV');
        return servicios;
      })
      .catch((error) => {
        return error;
      });
    for (let i = 0; i < result.length; i++) {
      let questionItem: HousingQuestion = {
        ID: result[i].ID,
        CODIGO: result[i].CODIGO,
        NOMBRE: result[i].NOMBRE,
        ESTADO: result[i].ESTADO,
        OPTIONS: [],
      };
      let options = await this.getQuestionOptions(result[i].ID);
      for (let question of options) {
        questionItem.OPTIONS.push(question as HousingQuestionOption);
      }
      questionItems.push(questionItem);
    }
    return questionItems;
  }
  async getQuestionOptions(QuestionID: number) {
    const result = await Realm.open({
      schema: [FVCCONVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects('FVCCONVIV')
          .filtered(`FVCELEVIV_ID = ${QuestionID}`);
        return items;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
}
