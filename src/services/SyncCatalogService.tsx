import DataBaseProvider, {
  FVCCONVIVSCHEMA,
  schemaVersion,
  FVCELEVIVSCHEMA,
  DataBaseSchemas,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {HttpProvider} from '../providers';

export default class SyncCatalogService {
  async getEntity(data: any) {
    return await HttpProvider.post('common/v1/entity', data);
  }
  async countEntities(entity: string) {
    let db = new DataBaseProvider();
    return await db.countEntity(entity);
  }
  async clearEntities() {
    await Realm.open({
      schema: [FVCCONVIVSCHEMA, FVCELEVIVSCHEMA],
      schemaVersion: schemaVersion,
    }).then((realm) => {
      realm.write(() => {
        let itemsFVCCONVIV = realm.objects('FVCCONVIV');
        let itemFVCELEVIV = realm.objects('FVCELEVIV');
        realm.delete(itemsFVCCONVIV);
        realm.delete(itemFVCELEVIV);
      });
    });
  }
  async syncEntities() {
    let itemFVCELEVIV: any = await this.getEntity({entityName: 'FVCELEVIV'});
    const FVCELEVIVSchema = itemFVCELEVIV.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FVCELEVIVSCHEMA,
      FVCELEVIVSCHEMA,
      FVCELEVIVSchema,
    );

    let itemFVCCONVIV: any = await this.getEntity({entityName: 'FVCCONVIV'});
    const FVCCONVIVSchema = itemFVCCONVIV.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FVCELEVIV_ID: item.fvcelevivId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FVCCONVIVSCHEMA,
      FVCCONVIVSCHEMA,
      FVCCONVIVSchema,
    );
    // console.log('FVCELEVIV ', FVCELEVIVSchema);
  }
  async syncSaveEntities(type: string, schema: any, listItems: any[]) {
    await Realm.open({
      schema: [schema],
      schemaVersion: schemaVersion,
    }).then((realm) => {
      realm.write(() => {
        for (let i = 0; i < listItems.length; i++) {
          const item = listItems[i];
          console.log(type, ' ', item);
          realm.create(type, item);
        }
      });
      console.log('couuunt ', realm.objects(type).length);
    });
  }
  allServices() {
    return new Promise((resolve, reject) => {
      Realm.open({
        schema: [FVCCONVIVSCHEMA],
        schemaVersion: schemaVersion,
      })
        .then((realm) => {
          let servicios = realm.objects('FVCCONVIV');
          resolve(servicios);
        })
        .catch((error) => {})
        .catch((error) => {
          console.log('Error listando');
          reject(error);
        });
    });
  }
}
