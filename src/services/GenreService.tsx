import {
  schemaVersion,
  DataBaseSchemas,
  FNCGENEROSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {FNCGENERO} from '../state/person/types';

export default class GenreService {
  async get(ID: number) {
    let item = await Realm.open({
      schema: [FNCGENEROSCHEMA],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let entity: any = realm
          .objects(DataBaseSchemas.FNCGENEROSCHEMA)
          .filtered(`ID = ${ID}`)
          .sorted('ID', true)[0];
        return entity as FNCGENERO;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    return item;
  }
}
