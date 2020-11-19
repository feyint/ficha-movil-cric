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
  FNCELEPERSCHEMA,
  FNCCONPERSCHEMA,
  FNCDESARMSCHEMA,
  FNCOCUPACSCHEMA,
  FNCELEREPSCHEMA,
  FNCCONREPSCHEMA,
  FUCPAISSCHEMA,
  FNCLUNINDSCHEMA,
  FNCPUEINDSCHEMA,
  FNCORGANISCHEMA,
  FNCPARENSCHEMA,
  FNCTIPIDESCHEMA,
  FNCGENEROSCHEMA,
} from '../providers/DataBaseProvider';
import Realm from 'realm';
import {HttpProvider} from '../providers';
import {Alert} from 'react-native';

export default class SyncCatalogService {
  async getEntity(name: string): Promise<{totalItems: number; data: any[]}> {
    try {
      return await HttpProvider.post('common/v1/entity', {
        entityName: name,
      });
    } catch (error) {
      Alert.alert('Ocurrio un error', 'con la entidad : ' + name);
      console.log(error);
      return {totalItems: 0, data: []};
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
        FNCELEPERSCHEMA,
        FNCCONPERSCHEMA,
        FNCDESARMSCHEMA,
        FNCOCUPACSCHEMA,
        FNCELEREPSCHEMA,
        FNCCONREPSCHEMA,
        FUCPAISSCHEMA,
        FNCPUEINDSCHEMA,
        FNCPARENSCHEMA,
        FNCTIPIDESCHEMA,
        FNCGENEROSCHEMA,
      ],
      schemaVersion: schemaVersion,
    }).then((realm) => {
      realm.write(() => {
        let itemsFVCCONVIV = realm.objects('FVCCONVIV');
        let itemFVCELEVIV = realm.objects('FVCELEVIV');
        let itemFUCDEPART = realm.objects('FUCDEPART');
        let itemFUCMUNICI = realm.objects('FUCMUNICI');
        let itemFUCTIPTER = realm.objects('FUCTIPTER');
        let itemFUCRESGUA = realm.objects('FUCRESGUA');
        // let itemFUCBARVER = realm.objects('FUCBARVER');
        let itemFUCZONA = realm.objects('FUCZONA');
        let itemFNCGENERO = realm.objects('FNCGENERO');
        let itemFUCZONCUI = realm.objects('FUCZONCUI');
        let itemFUCUNICUI = realm.objects('FUCUNICUI');
        let itemFUCPAISSCHEMA = realm.objects('FUCPAIS');
        realm.delete(itemsFVCCONVIV);
        realm.delete(itemFVCELEVIV);
        realm.delete(itemFUCDEPART);
        realm.delete(itemFUCMUNICI);
        realm.delete(itemFUCTIPTER);
        realm.delete(itemFUCRESGUA);
        //  realm.delete(itemFUCBARVER);
        realm.delete(itemFUCZONA);
        realm.delete(itemFNCGENERO);
        realm.delete(itemFUCZONCUI);
        realm.delete(itemFUCUNICUI);
        realm.delete(itemFUCPAISSCHEMA);
        let itemFNCELESAL = realm.objects('FNCELESAL');
        let itemFNCCONSAL = realm.objects('FNCCONSAL');
        let itemFNCELEPER = realm.objects('FNCELEPER');
        let itemFNCCONPER = realm.objects('FNCCONPER');
        let itemFNCELEREP = realm.objects('FNCELEREP');
        let itemFNCCONREP = realm.objects('FNCCONREP');
        let itemFNCDESARM = realm.objects('FNCDESARM');
        let itemFNCPUEIND = realm.objects('FNCPUEIND');
        let itemFNCOCUPAC = realm.objects('FNCOCUPAC');
        let itemFNCPAREN = realm.objects('FNCPAREN');
        let itemFNCTIPIDE = realm.objects('FNCTIPIDE');
        realm.delete(itemsFVCCONVIV);
        realm.delete(itemFVCELEVIV);
        realm.delete(itemFNCELESAL);
        realm.delete(itemFNCCONSAL);
        realm.delete(itemFNCELEPER);
        realm.delete(itemFNCCONPER);
        realm.delete(itemFNCDESARM);
        realm.delete(itemFNCELEREP);
        realm.delete(itemFNCCONREP);
        realm.delete(itemFNCPUEIND);
        realm.delete(itemFNCOCUPAC);
        realm.delete(itemFNCPAREN);
        realm.delete(itemFNCTIPIDE);
      });
      realm.close();
    });
  }
  async syncEntities() {
    let itemFVCELEVIV: any = await this.getEntity({entityName: 'FVCELEVIV'});
    const FVCELEVIVSchema = itemFVCELEVIV.data.map((item: any) => {
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
    const FVCCONVIVSchema = itemFVCCONVIV.data.map((item: any) => {
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
    let itemFNCDESARM: any = await this.getEntity({entityName: 'FNCDESARM'});
    const FNCDESARMSchema = itemFNCDESARM.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        //FNCELESAL_ID: item.fncelesalId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCDESARMSCHEMA,
      FNCDESARMSCHEMA,
      FNCDESARMSchema,
    );
    let itemFNCOCUPAC: any = await this.getEntity({entityName: 'FNCOCUPAC'});
    const FNCOCUPACSchema = itemFNCOCUPAC.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado === 1 ? true : false,
        FNCOCUSUB_ID: item.fncocusubId.id,
        //CODIGO_FF: item.codigoff,     //Error: Missing value for property 'FNCOCUPAC.CODIGO_FF'
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCOCUPACSCHEMA,
      FNCOCUPACSCHEMA,
      FNCOCUPACSchema,
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
    let itemFNCELEPER: any = await this.getEntity({entityName: 'FNCELEPER'});
    const FNCELEPERSchema = itemFNCELEPER.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado === 1 ? true : false,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCELEPERSCHEMA,
      FNCELEPERSCHEMA,
      FNCELEPERSchema,
    );
    let itemFNCELEREP: any = await this.getEntity({entityName: 'FNCELEREP'});
    const FNCELEREPSchema = itemFNCELEREP.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado === 1 ? true : false,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCELEREPSCHEMA,
      FNCELEREPSCHEMA,
      FNCELEREPSchema,
    );
    let itemFNCCONPER: any = await this.getEntity({entityName: 'FNCCONPER'});
    const FNCCONPERSchema = itemFNCCONPER.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCELEPER_ID: item.fnceleperId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCCONPERSCHEMA,
      FNCCONPERSCHEMA,
      FNCCONPERSchema,
    );
    let itemFNCCONREP: any = await this.getEntity({entityName: 'FNCCONREP'});
    const FNCCONREPSchema = itemFNCCONREP.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCELEREP_ID: item.fncelerepId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCCONREPSCHEMA,
      FNCCONREPSCHEMA,
      FNCCONREPSchema,
    );
    let itemFNCPUEIND: any = await this.getEntity({entityName: 'FNCPUEIND'});
    const FNCPUEINDSchema = itemFNCPUEIND.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado === 1 ? true : false,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCPUEINDSCHEMA,
      FNCPUEINDSCHEMA,
      FNCPUEINDSchema,
    );
    let itemFNCORGANI: any = await this.getEntity({entityName: 'FNCORGANI'});
    const FNCORGANISchema = itemFNCORGANI.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado === 1 ? true : false,
        //FNCREGION_ID: item.fncregionId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCORGANISCHEMA,
      FNCORGANISCHEMA,
      FNCORGANISchema,
    );
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
    let itemFUCPAISSCHEMAs: any = await this.getEntity({
      entityName: 'FUCPAIS',
    });
    const FUCPAISSCHEMAs = itemFUCPAISSCHEMAs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        CODIGO_POSTAL: item.codigoPostal,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCPAISSCHEMA,
      FUCPAISSCHEMA,
      FUCPAISSCHEMAs,
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
      const FUCBARVERSCHEMAs = itemFUCBARVERSCHEMAs.data.map((item: any) => {
        return {
          ID: item.id,
          CODIGO: item.codigo,
          NOMBRE: item.nombre,
          ESTADO: item.estado,
          FUCRESGUA_ID: item.fucresguaId.id,
          FUCZONA_ID: item.fuczonaId.id,
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
    const FUCZONASCHEMAs = itemFUCZONASCHEMAs.data.map((item: any) => {
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
    let itemFNCGENEROs: any = await this.getEntity({
      entityName: 'FNCGENERO',
    });
    const FNCGENEROs = itemFNCGENEROs.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCGENEROSCHEMA,
      FNCGENEROSCHEMA,
      FNCGENEROs,
    );
    let itemFUCUNICUISCHEMAs: any = await this.getEntity({
      entityName: 'FUCUNICUI',
    });
    const FUCUNICUISCHEMAs = itemFUCUNICUISCHEMAs.data.map((item: any) => {
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
    const FUCZONCUISCHEMAs = itemFUCZONCUISCHEMAs.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCSEDCUI_ID: item.fubsedcuiId.id,
        CODIGO_FF: item.codigoFf,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FUCZONCUISCHEMA,
      FUCZONCUISCHEMA,
      FUCZONCUISCHEMAs,
    );
    let itemFNCLUNINDs: any = await this.getEntity({
      entityName: 'FNCLUNIND',
    });
    const FNCLUNINDs = itemFNCLUNINDs.data.map((item: any) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCPUEIND_ID: item.fncpueindId.id,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCLUNINDSCHEMA,
      FNCLUNINDSCHEMA,
      FNCLUNINDs,
    );
    let itemFNCPARENs: any = await this.getEntity({
      entityName: 'FNCPAREN',
    });
    const FNCPARENs = itemFNCPARENs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCPARENSCHEMA,
      FNCPARENSCHEMA,
      FNCPARENs,
    );
    let itemFNCTIPIDEs: any = await this.getEntity({
      entityName: 'FNCTIPIDE',
    });
    const FNCTIPIDEs = itemFNCTIPIDEs.data.map((item) => {
      return {
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      };
    });
    await this.syncSaveEntities(
      DataBaseSchemas.FNCTIPIDESCHEMA,
      FNCTIPIDESCHEMA,
      FNCTIPIDEs,
    );
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
            try {
              realm.create(type, item);
            } catch (error) {}
          }
        });
        realm.close();
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
          realm.close();
          resolve(servicios);
        })
        .catch((error) => {
          console.log('Error listando');
          reject(error);
        });
    });
  }
}
