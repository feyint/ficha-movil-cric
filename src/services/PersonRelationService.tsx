import {
  schemaVersion,
  DataBaseSchemas,
  FNBNUCVIV_FNCPERSONSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {FNBNUCVIV_FNCPERSON} from '../state/person/types';
import {UtilsService} from '.';

export default class PersonRelationService {
  async SaveFNBNUCVIV_FNCPERSON(item: FNBNUCVIV_FNCPERSON) {
    let utils = new UtilsService();
    let FNCPERSON_ID = await utils.getLastEntityID(
      DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA,
    );
    item.ID = FNCPERSON_ID;
    let result = await Realm.open({
      schema: [FNBNUCVIV_FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let inserted: FNBNUCVIV_FNCPERSON = realm.create(
            DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA,
            item,
          );
          return inserted;
        });
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
    return result;
  }
  async countFNBNUCVIV_FNCPERSON(FNBNUCVIV_ID: number, FNCPERSON_ID: number) {
    const result = await Realm.open({
      schema: [FNBNUCVIV_FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm
          .objects(DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA)
          .filtered(
            `FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FNCPERSON_ID = ${FNCPERSON_ID}`,
          );
        return items.length > 0;
      })
      .catch((error) => {
        return false;
      });
    return result;
  }
}
