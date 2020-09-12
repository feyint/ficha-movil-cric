import DataBaseProvider, {
  FVCCONVIVSCHEMA,
  schemaVersion,
  FVCELEVIVSCHEMA,
  DataBaseSchemas,
  FUCDEPARTSCHEMA,
  FUCMUNICISCHEMA,
  FUCTIPTERSCHEMA,
  FUCRESGUASCHEMA,
  FUCBARVERSCHEMA,
  FUCZONASCHEMA,
  FUCUNICUISCHEMA,
  FUCZONCUISCHEMA,
  FNCELESALSCHEMA,
  FNCCONSALSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {HttpProvider} from '../providers';

export default class SyncCatalogService {
  async getEntity(data: any) {
    try {
      return await HttpProvider.post('common/v1/entity', data);
    } catch (error) {
      console.log(error);
      return {data: []};
    }
  }
  async countEntities(entity: string) {
    let db = new DataBaseProvider();
    return await db.countEntity(entity);
  }
  async clearEntities() {
    await Realm.open({
      schema: [
        FVCCONVIVSCHEMA,
        FVCELEVIVSCHEMA,
        FNCELESALSCHEMA,
        FNCCONSALSCHEMA,
      ],
      schemaVersion: schemaVersion,
    }).then((realm) => {
      realm.write(() => {
        let itemsFVCCONVIV = realm.objects('FVCCONVIV');
        let itemFVCELEVIV = realm.objects('FVCELEVIV');
        let itemFNCELESAL = realm.objects('FNCELESAL');
        let itemFNCCONSAL = realm.objects('FNCCONSAL');
        realm.delete(itemsFVCCONVIV);
        realm.delete(itemFVCELEVIV);
        realm.delete(itemFNCELESAL);
        realm.delete(itemFNCCONSAL);
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
    let itemFNCELESAL: any = await this.getEntity({entityName: 'FNCELESAL'});
    const FNCELESALSchema = itemFNCELESAL.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado === 1 ? true : false,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCELESALSCHEMA,
      FNCELESALSCHEMA,
      FNCELESALSchema,
    );
    let itemFNCCONSAL: any = await this.getEntity({entityName: 'FNCCONSAL'});
    const FNCCONSALSchema = itemFNCCONSAL.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCELESAL_ID: item.fncelesalId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCCONSALSCHEMA,
      FNCCONSALSCHEMA,
      FNCCONSALSchema,
    );
    //-------------------------------------------

    //------------------------------------------------------------------------------------
    let itemFUCDEPART: any = await this.getEntity({entityName: 'FUCDEPART'});
    const FUCDEPARTSCHEMAs = itemFUCDEPART.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCPAIS_ID: item.fucpaisId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCDEPARTSCHEMA,
      FUCDEPARTSCHEMA,
      FUCDEPARTSCHEMAs,
    );
    let itemFUCMUNICISCHEMAs: any = await this.getEntity({
      entityName: 'FUCMUNICI',
    });
    const FUCMUNICISCHEMAs = itemFUCMUNICISCHEMAs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCTIPMUN_ID: item.fuctipmunId.id,
        FUCDEPART_ID: item.fucdepartId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCMUNICISCHEMA,
      FUCMUNICISCHEMA,
      FUCMUNICISCHEMAs,
    );
    let itemFUCTIPTERSCHEMAs: any = await this.getEntity({
      entityName: 'FUCTIPTER',
    });
    const FUCTIPTERSCHEMAs = itemFUCTIPTERSCHEMAs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCTIPTERSCHEMA,
      FUCTIPTERSCHEMA,
      FUCTIPTERSCHEMAs,
    );
    let itemFUCRESGUASCHEMAs: any = await this.getEntity({
      entityName: 'FUCRESGUA',
    });
    const FUCRESGUASCHEMAs = itemFUCRESGUASCHEMAs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        TIPRES: item.tipres,
        FUCMUNICI_ID: item.fucmuniciId.id,
        FUCTIPRES_ID: item.fuctipresId.id,
        FUCTERCRI_ID: item.fuctercriId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCRESGUASCHEMA,
      FUCRESGUASCHEMA,
      FUCRESGUASCHEMAs,
    );
    let itemFUCBARVERSCHEMAs: any = await this.getEntity({
      entityName: 'FUCBARVER',
    });
    if (itemFUCBARVERSCHEMAs && itemFUCBARVERSCHEMAs.data.length > 0) {
      const FUCBARVERSCHEMAs = itemFUCBARVERSCHEMAs.data.map((item) => {
        return {
          ID: item.id,
          CODIGO: item.codigo,
          NOMBRE: item.nombre,
          ESTADO: item.estado,
          FUCRESGUA_ID: item.fucresguaId.id,
          FUCZONCUI_ID: item.fuczoncuiId.id,
          FUCTIPBAV_ID: item.fuctipbavId.id,
        };
      });
      await this.syncSaveEntities(
        DataBaseSchemas.FUCBARVERSCHEMA,
        FUCBARVERSCHEMA,
        FUCBARVERSCHEMAs,
      );
    }
    let itemFUCZONASCHEMAs: any = await this.getEntity({
      entityName: 'FUCZONA',
    });
    const FUCZONASCHEMAs = itemFUCZONASCHEMAs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCZONASCHEMA,
      FUCZONASCHEMA,
      FUCZONASCHEMAs,
    );
    let itemFUCUNICUISCHEMAs: any = await this.getEntity({
      entityName: 'FUCUNICUI',
    });
    const FUCUNICUISCHEMAs = itemFUCUNICUISCHEMAs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        REPS: item.repes,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCUNICUISCHEMA,
      FUCUNICUISCHEMA,
      FUCUNICUISCHEMAs,
    );
    let itemFUCZONCUISCHEMAs: any = await this.getEntity({
      entityName: 'FUCZONCUI',
    });
    const FUCZONCUISCHEMAs = itemFUCZONCUISCHEMAs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCUNICUI_ID: item.fucunicuiId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCZONCUISCHEMA,
      FUCZONCUISCHEMA,
      FUCZONCUISCHEMAs,
    );
    // console.log('FVCELEVIV ', FVCELEVIVSchema);
  }
  async syncSaveEntities(type: string, schema: any, listItems: any[]) {
    if (listItems.length > 0) {
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
