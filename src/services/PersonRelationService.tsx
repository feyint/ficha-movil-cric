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
    const result = await Realm.open({
      schema: [FNBNUCVIV_FNCPERSONSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        realm.write(() => {
          let inserted = realm.create(
            DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA,
            item,
          );
          return inserted;
        });
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return result;
  }
}
