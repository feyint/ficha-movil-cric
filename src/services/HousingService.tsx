import {
  FNBNUCVIVSCHEMA,
  FUBUBIVIVSCHEMA,
  FVCELEVIVSCHEMA,
  schemaVersion,
  FVCCONVIVSCHEMA,
  DataBaseSchemas,
  FNBNUCVIV_FVCCONVIVSCHEMA,
  FNCPERSONSCHEMA,
  FUCZONCUISCHEMA,
  FNBNUCVIV_FNCPERSONSCHEMA,
  FUCZONCUI_FUCBARVERSCHEMA,
  FNCPARENSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
  HousingQuestion,
  HousingQuestionOption,
} from '../modules/housing/state/types';
import {FNBNUCVIV_FVCCONVIV, FUBUBIVIV, FNBNUCVIV} from '../state/house/types';
import {MultiSelectSchema, PickerType} from '../core/utils/types';
import {capitalizeFirstLetter, cloneResult} from '../core/utils/utils';
import {UtilsService} from '.';
import {FNCPERSON} from '../state/person/types';
import {FUCZONCUI} from '../modules/location/state/types';
import {PersonParametersConst} from '../core/utils/SystemParameters';
const HOUSECODE_INCREMENT = '0000';
export default class HousingService {
  utils: UtilsService;
  constructor() {
    this.utils = new UtilsService();
  }
  async getFamilies(HouseID: number) {
    const result = await Realm.open({
      schema: [FNBNUCVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects<FNBNUCVIV>('FNBNUCVIV')
          .filtered(`FUBUBIVIV_ID = ${HouseID}`);
        let rItems = cloneResult(items);
        return rItems;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async getHouses() {
    const result = await Realm.open({
      schema: [FUBUBIVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm.objects('FUBUBIVIV');
        let rItems = cloneResult(items);
        return rItems;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async SaveHouse(item: FUBUBIVIV) {
    let FUBUBIVIV_ID = await this.utils.getLastEntityID(
      DataBaseSchemas.FUBUBIVIVSCHEMA,
    );
    item.ID = FUBUBIVIV_ID;
    const result = await Realm.open({
      schema: [FUBUBIVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let result = realm.create(DataBaseSchemas.FUBUBIVIVSCHEMA, item);
        });
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async UpdateHouse(item: FUBUBIVIV) {
    const result = await Realm.open({
      schema: [FUBUBIVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let house: any = realm
          .objects('FUBUBIVIV')
          .filtered(`ID = ${item.ID}`)
          .sorted('ID', true)[0];
        if (house) {
          realm.write(() => {
            house.CODIGO = item.CODIGO;
            house.DIRECCION = item.DIRECCION;
            house.COORDENADA_X = item.COORDENADA_X;
            house.COORDENADA_Y = item.COORDENADA_Y;
            house.FUCBARVER_ID = item.FUCBARVER_ID;
            house.FUCZONCUI_ID = item.FUCZONCUI_ID;
            house.FECHA_ACTIVIDAD = new Date();
          });
        }
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async SaveFNBNUCVIV(item: FNBNUCVIV) {
    let FNBNUCVIV_ID = await this.utils.getLastEntityID(
      DataBaseSchemas.FNBNUCVIVSCHEMA,
    );
    item.ID = FNBNUCVIV_ID;
    const result = await Realm.open({
      schema: [FNBNUCVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let result = realm.create('FNBNUCVIV', item);
          return result;
        });
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return item;
  }
  async SaveFNBNUCVIVPropiety(
    FNBNUCVIVID: number,
    propiety: string,
    value: any,
  ) {
    const result = await Realm.open({
      schema: [FNBNUCVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let item: any = realm
            .objects(DataBaseSchemas.FNBNUCVIVSCHEMA)
            .filtered(`ID = ${FNBNUCVIVID}`)
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
  async getLasHouseCode(code: string) {
    const result = await Realm.open({
      schema: [FUBUBIVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let increment = '';
        let item: any = realm
          .objects('FUBUBIVIV')
          .filtered(`CODIGO BEGINSWITH "${code}"`)
          .sorted('CODIGO', true)[0];
        if (item) {
          let values = item.CODIGO.split('-');
          increment = this.incrementNumber(values[1]);
        } else {
          increment = this.incrementNumber('0');
        }
        return increment;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async getLastNucleoCode(code: string) {
    const result = await Realm.open({
      schema: [FNBNUCVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let increment = '';
        let item: any = realm
          .objects(DataBaseSchemas.FNBNUCVIVSCHEMA)
          .filtered(`CODIGO BEGINSWITH "${code}"`)
          .sorted('CODIGO', true)[0];
        if (item) {
          let values = item.CODIGO.split('-');
          increment = '' + (parseInt(values[2], 10) + 1);
        } else {
          increment = '1';
        }
        return increment;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  incrementNumber(numberstring) {
    let number = parseInt(numberstring, 10) + 1;
    let initial = HOUSECODE_INCREMENT.substring(
      0,
      HOUSECODE_INCREMENT.length - number.toString().length,
    );
    let code = initial + number;
    return code;
  }
  async getFNBNUCVIVPersons(FNBNUCVIV_ID: number) {
    const result = await Realm.open({
      schema: [FNBNUCVIV_FNCPERSONSCHEMA, FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let persons: FNCPERSON[] = [];
        let items: any = realm
          .objects(DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA)
          .filtered(`FNBNUCVIV_ID = ${FNBNUCVIV_ID}`);
        for (let i of items) {
          let person: any = realm
            .objects(DataBaseSchemas.FNCPERSONSCHEMA)
            .filtered(`ID = ${i.FNCPERSON_ID}`)[0];
          let rItems = cloneResult(person, true);
          if (rItems) {
            persons.push(rItems);
          }
        }
        return persons;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async getFNBNUCVIVPersonsParent(FNBNUCVIV_ID: number) {
    const result = await Realm.open({
      schema: [FNBNUCVIV_FNCPERSONSCHEMA, FNCPERSONSCHEMA, FNCPARENSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let alreadyHead = 0;
        let parentHeaderID = 0;
        let items: any = realm
          .objects(DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA)
          .filtered(`FNBNUCVIV_ID = ${FNBNUCVIV_ID}`);
        if (items.length > 0) {
          let paren = realm
            .objects(DataBaseSchemas.FNCPARENSCHEMA)
            .filtered(
              `CODIGO = '${PersonParametersConst.fncpersonparentheadercode}'`,
            )[0];
          if (paren) {
            parentHeaderID = paren.ID;
          }
        }
        for (let i of items) {
          let person: any = realm
            .objects(DataBaseSchemas.FNCPERSONSCHEMA)
            .filtered(`ID = ${i.FNCPERSON_ID}`)[0];
          if (person) {
            if (person.FNCPAREN_ID == parentHeaderID) {
              alreadyHead = person.FNCPAREN_ID;
            }
          }
        }
        return alreadyHead;
      })
      .catch((error) => {
        console.error(error);
        return 0;
      });
    return result;
  }
  async getFUCZONCUI(FUCBARVER_ID: number) {
    const result = await Realm.open({
      schema: [FUCZONCUI_FUCBARVERSCHEMA, FUCZONCUISCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let zonacuidados: FUCZONCUI[] = [];
        let items: any = realm
          .objects(DataBaseSchemas.FUCZONCUI_FUCBARVERSCHEMA)
          .filtered(`FUCBARVER_ID = ${FUCBARVER_ID}`);
        for (let i of items) {
          let zonacuidado: any = realm
            .objects(DataBaseSchemas.FUCZONCUISCHEMA)
            .filtered(`ID = ${i.FUCZONCUI_ID}`)[0];
          if (zonacuidado) {
            zonacuidados.push(zonacuidado);
          }
        }
        return zonacuidados;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return result;
  }
  async getQuestionWithOptions(questionsQuery?: any[]) {
    let questionItems: HousingQuestion[] = [];
    const result = await Realm.open({
      schema: [FVCELEVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let servicios;
        if (questionsQuery) {
          const query = questionsQuery
            .map((id) => `CODIGO = "${id}"`)
            .join(' OR ');
          let rItems = realm.objects('FVCELEVIV').filtered(`${query}`);
          servicios = cloneResult(rItems);
        } else {
          let rItems = realm.objects('FVCELEVIV');
          servicios = cloneResult(rItems);
        }
        return servicios;
      })
      .catch((error) => {
        console.error(error);
        return [];
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
  async saveQuestionOption(answeroption: FNBNUCVIV_FVCCONVIV[]) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNBNUCVIV_FVCCONVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNBNUCVIV_FVCCONVIVSCHEMA)
          .filtered(
            `FNBNUCVIV_ID = ${answeroption[0].FNBNUCVIV_ID} AND FVCELEVIV_ID = ${answeroption[0].FVCELEVIV_ID}`,
          );
        realm.write(() => {
          realm.delete(options);
          for (let i = 0; i < answeroption.length; i++) {
            realm.create(DataBaseSchemas.FNBNUCVIV_FVCCONVIVSCHEMA, {
              FNBNUCVIV_ID: answeroption[i].FNBNUCVIV_ID,
              FVCCONVIV_ID: answeroption[i].FVCCONVIV_ID,
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
  async deleteAnswerForQuestion(FNBNUCVIV_ID: number, FVCELEVIV_ID: number) {
    //TODO consultar si ya existe
    await Realm.open({
      schema: [FNBNUCVIV_FVCCONVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let options = realm
          .objects(DataBaseSchemas.FNBNUCVIV_FVCCONVIVSCHEMA)
          .filtered(
            `FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`,
          );
        realm.write(() => {
          realm.delete(options);
        });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  getItemsForQuestionSelect(code: string, questions: HousingQuestion[]) {
    let item: PickerType[] = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        for (let option of questions[i].OPTIONS) {
          item.push({
            value: option.ID.toString(),
            label: option.NOMBRE,
            item: option,
          });
        }
        item.unshift({value: '-1', label: 'Seleccione', item: null});
      }
    }
    return item;
  }
  getItemsForQuestionMultiSelect(code: string, questions: HousingQuestion[]) {
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
  getQuestionlabel(code: string, questions: HousingQuestion[]) {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].CODIGO === code) {
        return capitalizeFirstLetter(questions[i].NOMBRE);
      }
    }
  }

  async getAnswerMultiSelect(FNBNUCVIV_ID: any, FVCELEVIV_ID: any) {
    const result = await Realm.open({
      schema: [FNBNUCVIV_FVCCONVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        console.log(
          `FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`,
        );
        let items = realm
          .objects(DataBaseSchemas.FNBNUCVIV_FVCCONVIVSCHEMA)
          .filtered(
            `FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`,
          );
        console.warn('items getAnswerMultiSelect ', items.length);
        return items.map((item: any) => {
          return item.FVCCONVIV_ID;
        });
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async getAnswerOneOption(FNBNUCVIV_ID: any, FVCELEVIV_ID: any) {
    const result = await Realm.open({
      schema: [FNBNUCVIV_FVCCONVIVSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects(DataBaseSchemas.FNBNUCVIV_FVCCONVIVSCHEMA)
          .filtered(
            `FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`,
          );
        if (items.length > 0) {
          return items[0].FVCCONVIV_ID;
        } else {
          return '';
        }
      })
      .catch((error) => {
        console.error(error);
        return '';
      });
    return result;
  }
}
