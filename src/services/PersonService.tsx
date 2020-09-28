import {
  FNCELESALSCHEMA,
  FNCCONSALSCHEMA,
  schemaVersion,
  FNCPERSONSCHEMA,
  FNBINFSAL_FNCCONSALSCHEMA,
  DataBaseSchemas,
  FNCGENEROSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  PersonQuestion,
  PersonQuestionOption,
} from '../modules/person/manage/state/types';
import {SelectSchema, MultiSelectSchema} from '../core/utils/types';
import {capitalizeFirstLetter} from '../core/utils/utils';
import {FNBINFSAL_FNCCONSAL, FNCPERSON} from '../state/person/types';
import {UtilsService} from '.';

export default class PersonService {
  async SaveFNCPERSON(item: FNCPERSON) {
    let utils = new UtilsService();
    let FNCPERSON_ID = await utils.getLastEntityID(
      DataBaseSchemas.FNCPERSONSCHEMA,
    );
    let FNCPERSON_CODIGO = await this.getLasPersonCode();
    item.ID = FNCPERSON_ID;
    item.FECHA_CREACION = new Date();
    item.CODIGO = FNCPERSON_CODIGO;
    const result = await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let inserted = realm.create('FNCPERSON', item);
          console.error('CREATED ', inserted);
          return inserted;
        });
      })
      .catch((error) => {
        console.error('error FNCPERSON ', error);
        return error;
      });
    console.error('INSERT ITEM ', result);
    return item;
  }
  async UpdateFNCPERSON(item: FNCPERSON) {
    console.error('llega a ctualizar');
    const result = await Realm.open({
      schema: [FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let person: any = realm
          .objects(DataBaseSchemas.FNCPERSONSCHEMA)
          .filtered(`ID = ${item.ID}`)
          .sorted('ID', true)[0];
        console.log('person ', person);
        if (person) {
          realm.write(() => {
            console.error('person ', person);
            console.error('item ', item);
            // person.CODIGO = item.CODIGO;
            // person.IDENTIFICACION = item.IDENTIFICACION;
            // person.PRIMER_NOMBRE = item.PRIMER_NOMBRE;
            // person.SEGUNDO_NOMBRE = item.SEGUNDO_NOMBRE;
            // person.PRIMER_APELLIDO = item.PRIMER_APELLIDO;
            // person.SEGUNDO_APELLIDO = item.SEGUNDO_APELLIDO;
            // person.FECHA_NACIMIENTO = item.FECHA_NACIMIENTO;
            // person.EDAD = item.EDAD;
            // person.EDAD_VISITA = item.EDAD_VISITA;
            // person.TEL_CELULAR = item.TEL_CELULAR;
            // person.TEL_ALTERNO = item.TEL_ALTERNO;
            // person.CORREO_ELECTRONICO = item.CORREO_ELECTRONICO;
            // person.FECHA_ACTIVIDAD = new Date();
            // person.FNCTIPIDE_ID = item.FNCTIPIDE_ID;
            // person.FNCORGANI_ID = item.FNCORGANI_ID;
            // person.FNCLUNIND_ID = item.FNCLUNIND_ID;
            // person.FNCOCUPAC_ID = item.FNCOCUPAC_ID;
            // person.FUCMUNICI_ID = item.FUCMUNICI_ID;
            // person.FNCPAREN_ID = item.FNCPAREN_ID;
            // person.FNCGENERO_ID = item.FNCGENERO_ID;
          });
        }
      })
      .catch((error) => {
        console.error('error FNCPERSON ', error);
        return error;
      });
    return item;
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
        console.error('errrorrr ', error);
        return error;
      });
    return result;
  }
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
  async getGenderList() {
    const result = await Realm.open({
      schema: [FNCGENEROSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let itemsSelect: {label: any; value: any}[] = [];
        let items = realm.objects('FNCGENERO');
        for (let item of items) {
          itemsSelect.push({
            label: item.NOMBRE,
            value: item.ID,
          });
        }
        itemsSelect.unshift({label: 'Seleccione', value: '-1'});
        return itemsSelect;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return result;
  }
}
