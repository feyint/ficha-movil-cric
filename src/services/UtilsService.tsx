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
}
