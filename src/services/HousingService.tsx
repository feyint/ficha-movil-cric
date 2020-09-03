import {
  FVCELEVIVSCHEMA,
  schemaVersion,
  FVCCONVIVSCHEMA,
  FVBVIVIEN_FVCCONVIV,
  DataBaseSchemas,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  HousingQuestion,
  HousingQuestionOption,
} from '../modules/housing/state/types';
import {FVBVIVIEN_FVCCONVIVSCHEMA} from '../state/house/types';

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
  async saveQuestionOption(answeroption: FVBVIVIEN_FVCCONVIVSCHEMA[]) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FVBVIVIEN_FVCCONVIV],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FVBVIVIEN_FVCCONVIVSCHEMA)
          .filtered(
            `FVBVIVIEN_CODE = "${answeroption[0].FVBVIVIEN_CODE}" AND FVCELEVIV_CODE = "${answeroption[0].FVCELEVIV_CODE}"`,
          );
        console.log('registros ya en base de datos', options.length);
        realm.write(() => {
          realm.delete(options);
          for (let i = 0; i < answeroption.length; i++) {
            console.log('option ', answeroption[i]);
            realm.create(DataBaseSchemas.FVBVIVIEN_FVCCONVIVSCHEMA, {
              FVBVIVIEN_CODE: answeroption[i].FVBVIVIEN_CODE,
              FVCELEVIV_CODE: answeroption[i].FVCELEVIV_CODE,
              FVCCONVIV_CODE: answeroption[i].FVCCONVIV_CODE,
              FVCCONVIV_ID: answeroption[i].FVCCONVIV_ID,
              FVBVIVIEN_ID: answeroption[i].FVBVIVIEN_ID,
              FVCELEVIV_ID: answeroption[i].FVCELEVIV_ID,
              SYNCSTATE: answeroption[i].SYNCSTATE,
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
