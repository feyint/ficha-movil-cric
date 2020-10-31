import {
  schemaVersion,
  FNCPERSONSCHEMA,
  FUBUBIVIVSCHEMA,
  FNBNUCVIVSCHEMA,
  FNBNUCVIV_FNCPERSONSCHEMA,
  FNCSALREPSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';

export default class UtilsService {
  async getLastEntityID(entity: string, attribute = 'ID') {
    const result = await Realm.open({
      schema: [
        FNCPERSONSCHEMA,
        FUBUBIVIVSCHEMA,
        FNBNUCVIVSCHEMA,
        FNBNUCVIV_FNCPERSONSCHEMA,
        FNCSALREPSCHEMA,
      ],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let increment = 1;
        let item: any = realm.objects(entity).sorted(attribute, true)[0];
        if (item) {
          increment = item.ID + 1;
        }
        return increment;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
  async getFilterEntity(
    name: string,
    schema: any,
    _columnFilter: any = null,
    _value: any = null,
    _columnFilter2: any = null,
    _value2: any = null,
    first: boolean = false,
  ) {
    const result = await Realm.open({
      schema: [schema],
      schemaVersion: schemaVersion,
    })
      .then((realm) => {
        let items = realm.objects(name);
        let query = '';
        if (_columnFilter && _value) {
          query = `${_columnFilter} = ${_value}`;
        }
        if (_columnFilter2 && _value2) {
          query = query + ` AND ${_columnFilter2} = ${_value2}`;
        }
        if (query.length > 0) {
          items = items.filtered(query);
        }
        if (first) {
          return items[0];
        }
        return items;
      })
      .catch((error) => {
        return error;
      });
    return result;
  }
}
