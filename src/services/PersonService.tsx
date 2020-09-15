import {
  FNCELESALSCHEMA,
  FNCCONSALSCHEMA,
  schemaVersion,
  FNCPERSONSCHEMA, FNBINFSAL_FNCCONSALSCHEMA, DataBaseSchemas
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  PersonQuestion,
  PersonQuestionOption,
} from '../modules/person/manage/state/types';
import { SelectSchema, MultiSelectSchema } from '../core/utils/types';
import { capitalizeFirstLetter } from '../core/utils/utils';
import { FNBINFSAL_FNCCONSAL } from '../state/person/types';

export default class PersonService {

  /**
   * 
   */
  async getPersons() {
    const result = await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm.objects('FNCPERSON');
        console.log('persona items', items);
        for (let i of items) {
          console.log('persona items for', i);
        }
        return items;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }

  /**
   * 
   * @param questionsQuery 
   */
  async getQuestionWithOptions(questionsQuery?: any[]) {
    let questionItems: PersonQuestion[] = [];
    const result = await Realm.open({
      schema: [FNCELESALSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let servicios;
        if (questionsQuery) {
          const query = questionsQuery
            .map((id) => `CODIGO = "${id}"`)
            .join(' OR ');
          servicios = realm.objects('FNCELESAL').filtered(`${query}`);
        } else {
          servicios = realm.objects('FNCELESAL');
        }
        return servicios;
      })
      .catch((error) => {
        return error;
      });
    for (let i = 0; i < result.length; i++) {
      let questionItem: PersonQuestion = {
        ID: result[i].ID,
        CODIGO: result[i].CODIGO,
        NOMBRE: result[i].NOMBRE,
        ESTADO: result[i].ESTADO,
        OPTIONS: [],
      };
      let options = await this.getQuestionOptions(result[i].ID);
      for (let question of options) {
        questionItem.OPTIONS.push(question as PersonQuestionOption);
      }
      questionItems.push(questionItem);
    }
    return questionItems;
  }

  /**
   * 
   * @param QuestionID 
   */
  async getQuestionOptions(QuestionID: number) {
    const result = await Realm.open({
      schema: [FNCCONSALSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects('FNCCONSAL')
          .filtered(`FNCELESAL_ID = ${QuestionID}`);
        return items;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }

  /**
   * 
   * @param code 
   * @param questions 
   */
  getItemsForQuestionSelect(code: string, questions: PersonQuestion[]) {
    let item: SelectSchema = { name: '', id: 0, children: [] };
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({
            value: option.ID.toString(),
            label: option.NOMBRE,
          });
        }
        item.children.unshift({ value: '-1', label: 'Seleccione' });
      }
    }
    return item;
  }

  /**
   * 
   * @param code 
   * @param questions 
   */
  getItemsForQuestionMultiSelect(code: string, questions: PersonQuestion[]) {
    let item: MultiSelectSchema = { name: '', id: 0, children: [] };
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({ id: option.ID, name: option.NOMBRE });
        }
      }
    }
    return item;
  }

  /**
   * 
   * @param code 
   * @param questions 
   */
  getQuestionlabel(code: string, questions: PersonQuestion[]) {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        return capitalizeFirstLetter(questions[i].NOMBRE);
      }
    }
  }

  /**
   * 
   * @param answeroption 
   */
  async saveQuestionOption(answeroption: FNBINFSAL_FNCCONSAL[]) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNBINFSAL_FNCCONSALSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNBINFSAL_FNCCONSALSCHEMA)
          .filtered(
            `FNBINFSAL_ID = ${answeroption[0].FNBINFSAL_ID} AND FNCELESAL_ID = ${answeroption[0].FNCELESAL_ID}`,
          );
        console.log('registros ya en base de datos', options.length);
        realm.write(() => {
          realm.delete(options);
          for (let i = 0; i < answeroption.length; i++) {
            console.log('option ', answeroption[i]);
            realm.create(DataBaseSchemas.FNBINFSAL_FNCCONSALSCHEMA, {
              FNCCONSAL_ID: answeroption[i].FNCCONSAL_ID,
              FNBINFSAL_ID: answeroption[i].FNBINFSAL_ID,
              FNCELESAL_ID: answeroption[i].FNCELESAL_ID,
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

  /**
   * 
   * @param FNBINFSAL_ID 
   * @param FVCELEVIV_ID 
   */
  async getAnswerOneOption(FNBINFSAL_ID: any, FVCELEVIV_ID: any) {
    const result = await Realm.open({
      schema: [FNBINFSAL_FNCCONSALSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(`aaaaaaaaaaa FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FVCELEVIV_ID}`);
        let items = realm
          .objects(DataBaseSchemas.FNBINFSAL_FNCCONSALSCHEMA)
          .filtered(
            `FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FVCELEVIV_ID}`,
          );
        console.warn('items getAnswerOneOption ', items.length);
        if (items.length > 0) {
          return items[0].FNCCONSAL_ID;
        } else {
          return '';
        }
      })
      .catch((error) => {
        return error;
      });
    return result;
  }


}
