import {
  FNCELESALSCHEMA,
  FNCCONSALSCHEMA,
  schemaVersion,
  FNCPERSONSCHEMA,
  FNBINFSAL_FNCCONSALSCHEMA,
  DataBaseSchemas,
  FNCGENEROSCHEMA,
  FNCPARENSCHEMA,
  FNCTIPIDESCHEMA,
  FNBNUCVIV_FNCPERSONSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  PersonQuestion,
  PersonQuestionOption,
} from '../modules/person/manage/state/types';
import {SelectSchema, MultiSelectSchema} from '../core/utils/types';
import {capitalizeFirstLetter} from '../core/utils/utils';
import {FNBINFSAL_FNCCONSAL, FNBNUCVIV_FNCPERSON, FNCPERSON} from '../state/person/types';
import {UtilsService} from '.';
import PersonRelationService from './PersonRelationService';

export default class PersonService {
  async SaveFNCPERSON(item: FNCPERSON, familyID: number) {
    let utils = new UtilsService();
    let FNCPERSON_ID = await utils.getLastEntityID(
      DataBaseSchemas.FNCPERSONSCHEMA,
    );
    let FNCPERSON_CODIGO = await this.getLasPersonCode();
    item.ID = FNCPERSON_ID;
    item.FECHA_CREACION = new Date();
    item.CODIGO = FNCPERSON_CODIGO;
    const result = await Realm.open({
      schema: [FNCPERSONSCHEMA, FNBNUCVIV_FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let inserted = realm.create('FNCPERSON', item);
          if (inserted) {
            try {
              let nucleoPersona: FNBNUCVIV_FNCPERSON = {
                FNBNUCVIV_ID: familyID,
                FNCPERSON_ID: inserted.ID,
                ID: -1,
              };
              let personRelation: PersonRelationService = new PersonRelationService();
              let asociated = personRelation.SaveFNBNUCVIV_FNCPERSON(
                nucleoPersona,
              );
              if (!asociated) {
                realm.delete(inserted);
              }
            } catch (error) {
              realm.delete(inserted);
            }
          }
          return inserted;
        });
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return item;
  }
  async UpdateFNCPERSON(item: any) {
    await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let person: any = realm
          .objects(DataBaseSchemas.FNCPERSONSCHEMA)
          .filtered(`ID = ${item.ID}`)
          .sorted('ID', true)[0];
        if (person) {
          realm.write(() => {
            for (const key of Object.keys(item)) {
              if (key in person && key !== 'ID') {
                // or obj1.hasOwnProperty(key)
                person[key] = item[key];
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
  async getPersonbyIdentification(
    identification: any,
    identificationType: any,
  ) {
    let result = await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let query = `IDENTIFICACION = '${identification}'`;
        if (identificationType) {
          query = `IDENTIFICACION = '${identification}' AND FNCTIPIDE_ID = ${identificationType}`;
        }
        let person = realm
          .objects(DataBaseSchemas.FNCPERSONSCHEMA)
          .filtered(query);
        if (person.length > 0) {
          let items: FNCPERSON[] = [];
          for (let item of person) {
            items.push(item);
          }
          return items[0];
        }
      })
      .catch((error) => {
        console.error(error);
        return undefined;
      });
    return result;
  }
  async getLasPersonCode() {
    const result = await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let increment = 1;
        let item: any = realm
          .objects(DataBaseSchemas.FNCPERSONSCHEMA)
          .sorted('CODIGO', true)[0];
        if (item) {
          increment = parseInt(item.ID, 10) + 1;
        }
        return JSON.stringify(increment);
      })
      .catch((error) => {
        console.error(error);
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
    let item: SelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({
            value: option.ID.toString(),
            label: option.NOMBRE,
            item: option,
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
  getItemsForQuestionMultiSelect(code: string, questions: PersonQuestion[]) {
    let item: MultiSelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({
            id: option.ID,
            name: option.NOMBRE,
            item: option,
          });
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
   * @param FNCELESAL_ID
   */
  async getAnswerOneOption(FNBINFSAL_ID: any, FNCELESAL_ID: any) {
    const result = await Realm.open({
      schema: [FNBINFSAL_FNCCONSALSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(
          `FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FNCELESAL_ID}`,
        );
        let items: any = realm
          .objects(DataBaseSchemas.FNBINFSAL_FNCCONSALSCHEMA)
          .filtered(
            `FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FNCELESAL_ID}`,
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

  /**
   *
   * @param FNBINFSAL_ID
   * @param FNCELESAL_ID
   */
  async deleteAnswerForQuestion(FNBINFSAL_ID: number, FNCELESAL_ID: number) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNBINFSAL_FNCCONSALSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNBINFSAL_FNCCONSALSCHEMA)
          .filtered(
            `FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FNCELESAL_ID}`,
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
   * @param FNBINFSAL_ID
   * @param FNCELESAL_ID
   */
  async getAnswerMultiSelect(FNBINFSAL_ID: any, FNCELESAL_ID: any) {
    const result = await Realm.open({
      schema: [FNBINFSAL_FNCCONSALSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(
          `FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FNCELESAL_ID}`,
        );
        let items = realm
          .objects(DataBaseSchemas.FNBINFSAL_FNCCONSALSCHEMA)
          .filtered(
            `FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FNCELESAL_ID}`,
          );
        console.warn('items getAnswerMultiSelect ', items.length);
        return items.map((item: any) => {
          return item.FNCCONSAL_ID;
        });
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async SaveFNCPERSONPropiety(
    FNCPERSONID: number,
    propiety: string,
    value: any,
  ) {
    const result = await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let item: any = realm
            .objects(DataBaseSchemas.FNCPERSONSCHEMA)
            .filtered(`ID = ${FNCPERSONID}`)
            .sorted('ID', true)[0];
          if (item) {
            item[propiety] = value;
            return true;
          } else {
            return false;
          }
        });
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return result;
  }
  async getSelectList(entity: string) {
    const result = await Realm.open({
      schema: [FNCGENEROSCHEMA, FNCPARENSCHEMA, FNCTIPIDESCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let itemsSelect: {label: any; value: any; item: any}[] = [];
        let items = realm.objects(entity);
        for (let item of items) {
          itemsSelect.push({
            label: item.NOMBRE,
            value: item.ID,
            item: item,
          });
        }
        itemsSelect.unshift({label: 'Seleccione', value: '-1', item: null});
        return itemsSelect;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return result;
  }
}
