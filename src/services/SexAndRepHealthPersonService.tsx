import {
  FNCELEREPSCHEMA,
  FNCCONREPSCHEMA,
  schemaVersion,
  FNCSALREP_FNCCONREPSCHEMA,
  DataBaseSchemas,
  FNCSALREPSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  SexAndRepHealthPersonQuestion,
  SexAndRepHealthPersonQuestionOption,
} from '../modules/person/manage/state/types';
import {SelectSchema, MultiSelectSchema} from '../core/utils/types';
import {capitalizeFirstLetter} from '../core/utils/utils';
import {
  FNCSALREP,
  FNCSALREP_FNCCONREP,
} from '../state/SexAndRepHealthPerson/types';
import {UtilsService} from '.';

export default class SexAndRepHealthPersonService {
  async SaveFNCSALREP(item: any) {
    let utils = new UtilsService();
    let FNCSALREP_ID = await utils.getLastEntityID(
      DataBaseSchemas.FNCSALREPSCHEMA,
    );
    item.ID = FNCSALREP_ID;
    item.FECHA_CREACION = new Date();
    const result = await Realm.open({
      schema: [FNCSALREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let inserted = realm.create(DataBaseSchemas.FNCSALREPSCHEMA, item);
          return inserted;
        });
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return result;
  }
  async UpdateFNCSALREP(item: any) {
    await Realm.open({
      schema: [FNCSALREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let entity: any = realm
          .objects(DataBaseSchemas.FNCSALREPSCHEMA)
          .filtered(`FNCPERSON_ID = ${item.FNCPERSON_ID}`)
          .sorted('FNCPERSON_ID', true)[0];
        if (entity) {
          realm.write(() => {
            for (const key of Object.keys(item)) {
              if (key in entity && key !== 'ID' && key !== 'FNCPERSON_ID') {
                // or obj1.hasOwnProperty(key)
                entity[key] = item[key];
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return item;
  }
  async getFNCSALREP(FNCPERSON_ID: number) {
    let item = await Realm.open({
      schema: [FNCSALREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let entity: any = realm
          .objects(DataBaseSchemas.FNCSALREPSCHEMA)
          .filtered(`FNCPERSON_ID = ${FNCPERSON_ID}`)
          .sorted('FNCPERSON_ID', true)[0];
        return entity;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    return item;
  }
  /**
   *
   * @param questionsQuery
   */
  async getQuestionWithOptions(questionsQuery?: any[]) {
    let questionItems: SexAndRepHealthPersonQuestion[] = [];
    const result = await Realm.open({
      schema: [FNCELEREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let servicios;
        if (questionsQuery) {
          const query = questionsQuery
            .map((id) => `CODIGO = "${id}"`)
            .join(' OR ');
          servicios = realm.objects('FNCELEREP').filtered(`${query}`);
        } else {
          servicios = realm.objects('FNCELEREP');
        }
        return servicios;
      })
      .catch((error) => {
        return error;
      });
    for (let i = 0; i < result.length; i++) {
      let questionItem: SexAndRepHealthPersonQuestion = {
        ID: result[i].ID,
        CODIGO: result[i].CODIGO,
        NOMBRE: result[i].NOMBRE,
        ESTADO: result[i].ESTADO,
        OPTIONS: [],
      };
      let options = await this.getQuestionOptions(result[i].ID);
      for (let question of options) {
        questionItem.OPTIONS.push(
          question as SexAndRepHealthPersonQuestionOption,
        );
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
      schema: [FNCCONREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects('FNCCONREP')
          .filtered(`FNCELEREP_ID = ${QuestionID}`);
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
  getItemsForQuestionSelect(
    code: string,
    questions: SexAndRepHealthPersonQuestion[],
  ) {
    let item: SelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({
            value: option.ID.toString(),
            label: option.NOMBRE,
            item: null,
          });
        }
        item.children.unshift({value: '-1', label: 'Seleccione', item: null});
      }
    }
    return item;
  }

  /**
   *
   * @param code
   * @param questions
   */
  getItemsForQuestionMultiSelect(
    code: string,
    questions: SexAndRepHealthPersonQuestion[],
  ) {
    let item: MultiSelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({id: option.ID, name: option.NOMBRE, item: null});
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
  getQuestionlabel(code: string, questions: SexAndRepHealthPersonQuestion[]) {
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
  async saveQuestionOption(answeroption: FNCSALREP_FNCCONREP[]) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNCSALREP_FNCCONREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNCSALREP_FNCCONREPSCHEMA)
          .filtered(
            `FNCSALREP_ID = ${answeroption[0].FNCSALREP_ID} AND FNCELEREP_ID = ${answeroption[0].FNCELEREP_ID}`,
          );
        console.log('registros ya en base de datos', options.length);
        realm.write(() => {
          realm.delete(options);
          for (let i = 0; i < answeroption.length; i++) {
            console.log('option ', answeroption[i]);
            realm.create(DataBaseSchemas.FNCSALREP_FNCCONREPSCHEMA, {
              FNCCONREP_ID: answeroption[i].FNCCONREP_ID,
              FNCSALREP_ID: answeroption[i].FNCSALREP_ID,
              FNCELEREP_ID: answeroption[i].FNCELEREP_ID,
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
   * @param FNCSALREP_ID
   * @param FNCELEREP_ID
   */
  async getAnswerOneOption(FNCSALREP_ID: any, FNCELEREP_ID: any) {
    const result = await Realm.open({
      schema: [FNCSALREP_FNCCONREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(
          `FNCSALREP_ID = ${FNCSALREP_ID} AND FNCELEREP_ID = ${FNCELEREP_ID}`,
        );
        let items = realm
          .objects(DataBaseSchemas.FNCSALREP_FNCCONREPSCHEMA)
          .filtered(
            `FNCSALREP_ID = ${FNCSALREP_ID} AND FNCELEREP_ID = ${FNCELEREP_ID}`,
          );
        console.warn('items getAnswerOneOption ', items.length);
        if (items.length > 0) {
          return items[0].FNCCONREP_ID;
        } else {
          return '';
        }
      })
      .catch((error) => {
        return error;
      });
    return result;
  }

  /**
   *
   * @param FNCSALREP_ID
   * @param FNCELEREP_ID
   */
  async deleteAnswerForQuestion(FNCSALREP_ID: number, FNCELEREP_ID: number) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNCSALREP_FNCCONREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNCSALREP_FNCCONREPSCHEMA)
          .filtered(
            `FNCSALREP_ID = ${FNCSALREP_ID} AND FNCELEREP_ID = ${FNCELEREP_ID}`,
          );
        console.log('borrar ', options.length);
        realm.write(() => {
          realm.delete(options);
        });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  /**
   *
   * @param FNCSALREP_ID
   * @param FNCELEREP_ID
   */
  async getAnswerMultiSelect(FNCSALREP_ID: any, FNCELEREP_ID: any) {
    const result = await Realm.open({
      schema: [FNCSALREP_FNCCONREPSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(
          `FNCSALREP_ID = ${FNCSALREP_ID} AND FNCELEREP_ID = ${FNCELEREP_ID}`,
        );
        let items = realm
          .objects(DataBaseSchemas.FNCSALREP_FNCCONREPSCHEMA)
          .filtered(
            `FNCSALREP_ID = ${FNCSALREP_ID} AND FNCELEREP_ID = ${FNCELEREP_ID}`,
          );
        console.warn('items getAnswerMultiSelect ', items.length);
        return items.map((item: any) => {
          return item.FNCCONREP_ID;
        });
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
}
