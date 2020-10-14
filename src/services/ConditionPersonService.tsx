import {
  FNCELEPERSCHEMA,
  FNCCONPERSCHEMA,
  schemaVersion,
  FNCPERSONSCHEMA,
  FNCPERSON_FNCCONPERSCHEMA,
  DataBaseSchemas,
  FNCPARENSCHEMA,
  FNCOCUPACSCHEMA,
  FNCORGANISCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  ConditionPersonQuestion,
  ConditionPersonQuestionOption,
} from '../modules/person/manage/state/types';
import {SelectSchema, MultiSelectSchema} from '../core/utils/types';
import {capitalizeFirstLetter} from '../core/utils/utils';
import {FNCPERSON_FNCCONPER} from '../state/person/types';

export default class ConditionPersonService {
  /**
   *
   * @param questionsQuery
   */
  async getQuestionWithOptions(questionsQuery?: any[]) {
    let questionItems: ConditionPersonQuestion[] = [];
    const result = await Realm.open({
      schema: [FNCELEPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let servicios;
        if (questionsQuery) {
          const query = questionsQuery
            .map((id) => `CODIGO = "${id}"`)
            .join(' OR ');
          servicios = realm.objects('FNCELEPER').filtered(`${query}`);
        } else {
          servicios = realm.objects('FNCELEPER');
        }
        return servicios;
      })
      .catch((error) => {
        return error;
      });
    for (let i = 0; i < result.length; i++) {
      let questionItem: ConditionPersonQuestion = {
        ID: result[i].ID,
        CODIGO: result[i].CODIGO,
        NOMBRE: result[i].NOMBRE,
        ESTADO: result[i].ESTADO,
        OPTIONS: [],
      };
      let options = await this.getQuestionOptions(result[i].ID);
      for (let question of options) {
        questionItem.OPTIONS.push(question as ConditionPersonQuestionOption);
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
      schema: [FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects('FNCCONPER')
          .filtered(`FNCELEPER_ID = ${QuestionID}`);
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
    questions: ConditionPersonQuestion[],
    //key: string,
  ) {
    let item: SelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          let itemChild = {
            value: option.ID.toString(),
            label: option.NOMBRE,
            item: null,
          };
          item.children.push(itemChild);
          //console.log(itemChild);
        }
        item.children.unshift({value: '-1', label: 'Seleccione', item: null});
      }
    }
    return item;
  }
  getItemsForQuestionSelectLanguaje(
    code: string,
    questions: ConditionPersonQuestion[],
    selectedLanguaje: string,
  ) {
    let item: SelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code && questions[i].NOMBRE !== 'ESPAÑOL') {
        item.id = questions[i].ID;
        item.name = capitalizeFirstLetter(questions[i].NOMBRE);
        for (let option of questions[i].OPTIONS) {
          item.children.push({
            value: option.ID.toString(),
            label: option.NOMBRE,
            item: null,
          });
          if (option.NOMBRE == 'ESPAÑOL') {
            item.children.pop();
          }
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
    questions: ConditionPersonQuestion[],
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
  getQuestionlabel(code: string, questions: ConditionPersonQuestion[]) {
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
  async saveQuestionOption(answeroption: FNCPERSON_FNCCONPER[]) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${answeroption[0].FNCPERSON_ID} AND FNCELEPER_ID = ${answeroption[0].FNCELEPER_ID}`,
          );
        realm.write(() => {
          realm.delete(options);
          for (let i = 0; i < answeroption.length; i++) {
            //console.log('option ', answeroption[i]);
            let result = realm.create(
              DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA,
              {
                FNCCONPER_ID: answeroption[i].FNCCONPER_ID,
                FNCPERSON_ID: answeroption[i].FNCPERSON_ID,
                FNCELEPER_ID: answeroption[i].FNCELEPER_ID,
                SYNCSTATE: answeroption[i].SYNCSTATE,
              },
            );
          }
        });
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  /**
   *
   * @param FNCPERSON_ID
   * @param FNCELEPER_ID
   */
  async getAnswerOneOption(FNCPERSON_ID: any, FNCELEPER_ID: any) {
    const result = await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
          );
        if (items.length > 0) {
          return items[0].FNCCONPER_ID;
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
   * @param FNCPERSON_ID
   * @param FNCELEPER_ID
   */
  async deleteAnswerForQuestion(FNCPERSON_ID: number, FNCELEPER_ID: number) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
          );
        //console.log('borrar ', options.length);
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
   * @param FNCPERSON_ID
   * @param FNCELEPER_ID
   */
  async getAnswerMultiSelect(FNCPERSON_ID: any, FNCELEPER_ID: any) {
    const result = await Realm.open({
      schema: [FNCPERSON_FNCCONPERSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        /* console.log(
          `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
        ); */
        let items = realm
          .objects(DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA)
          .filtered(
            `FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`,
          );
        //console.warn('items getAnswerMultiSelect ', items.length);
        return items.map((item: any) => {
          return item.FNCCONPER_ID;
        });
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async getOrganiList() {
    const result = await Realm.open({
      schema: [FNCORGANISCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let itemsSelect: {label: any; value: any}[] = [];
        let items = realm.objects('FNCORGANI');
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
  async getOcupacList() {
    const result = await Realm.open({
      schema: [FNCOCUPACSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let itemsSelect: {label: any; value: any}[] = [];
        let items = realm.objects('FNCOCUPAC');
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
  async getParentList() {
    const result = await Realm.open({
      schema: [FNCPARENSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let itemsSelect: {label: any; value: any}[] = [];
        let items = realm.objects('FNCPAREN');
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
