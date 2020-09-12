
import {
    FNCELESALSCHEMA,
    FNCCONSALSCHEMA,
    schemaVersion,
    FNCPERSONSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import { PersonQuestion, PersonQuestionOption } from '../modules/person/manage/state/types';
import { SelectSchema, MultiSelectSchema } from '../core/utils/types';
import { capitalizeFirstLetter } from '../core/utils/utils';

export default class PersonService {

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
}
