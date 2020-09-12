/* eslint-disable prettier/prettier */
import {
    FNBNUCVIVSCHEMA,
    FUBUBIVIVSCHEMA,
    FVCELEVIVSCHEMA,
    schemaVersion,
    FVCCONVIVSCHEMA,
    DataBaseSchemas,
    FNBNUCVIV_FVCCONVIVSCHEMA,
    FNCPERSONSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {
    HousingQuestion,
    HousingQuestionOption,
} from '../modules/housing/state/types';
import {
    PersonQuestion, PersonQuestionOption,
} from '../modules/person/manage/state/types';
import { FNBNUCVIV_FVCCONVIV } from '../state/house/types';
import { SelectSchema, MultiSelectSchema } from '../core/utils/types';
import { capitalizeFirstLetter } from '../core/utils/utils';

export default class PersonService {
    async getFamilies(HouseID: number) {
        const result = await Realm.open({
            schema: [FNBNUCVIVSCHEMA],
            schemaVersion: schemaVersion,
        }).then((realm) => {
            let items = realm
                .objects('FNBNUCVIV')
                .filtered(`FUBUBIVIV_ID = ${HouseID}`);
            return items;
        }).catch((error) => {
            return error;
        });
        return result;
    }
    async getHouses() {
        const result = await Realm.open({
            schema: [FUBUBIVIVSCHEMA],
            schemaVersion: schemaVersion,
        }).then((realm) => {
            let items = realm
                .objects('FUBUBIVIV');
            return items;
        }).catch((error) => {
            return error;
        });
        return result;
    }
    async getPersons() {
        const result = await Realm.open({
            schema: [FNCPERSONSCHEMA],
            schemaVersion: schemaVersion,
        }).then((realm) => {
            let items = realm
                .objects('FNCPERSON');
            console.log('persona items', items);
            for (let i of items) {
                console.log('persona items for', i);
            }
            return items;
        }).catch((error) => {
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
                    servicios = realm.objects('FVCELEVIV').filtered(`${query}`);
                } else {
                    servicios = realm.objects('FVCELEVIV');
                }
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
                console.log('registros ya en base de datos', options.length);
                realm.write(() => {
                    realm.delete(options);
                    for (let i = 0; i < answeroption.length; i++) {
                        console.log('option ', answeroption[i]);
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
    getItemsForQuestionSelect(code: string, questions: HousingQuestion[]) {
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
        console.log('ddddd ', item);
        return item;
    }
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
    getQuestionlabel(code: string, questions: PersonQuestion[]) {
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
                console.log(`FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`);
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
                console.log(`aaaaaaaaaaa FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`);
                let items = realm
                    .objects(DataBaseSchemas.FNBNUCVIV_FVCCONVIVSCHEMA)
                    .filtered(
                        `FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`,
                    );
                console.warn('items getAnswerMultiSelect ', items.length);
                if (items.length > 0) {
                    return items[0].FVCCONVIV_ID;
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