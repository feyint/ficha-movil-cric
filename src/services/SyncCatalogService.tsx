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
import {HttpProvider} from '../providers';
import {Alert} from 'react-native';

export default class SyncCatalogService {
  async getEntity(name: string): Promise<{totalItems: number; data: any[]}> {
    try {
      return await HttpProvider.post('common/v1/entity', {
        entityName:
          name.substr(0, 1).toUpperCase() +
          name.substr(1, name.length - 1).toLowerCase(),
      });
    } catch (error) {
      Alert.alert('Ocurrio un error', 'con la entidad : ' + name);
      console.log(error);
      return {totalItems: 0, data: []};
    }
  }

  async syncEntities() {
    let itemFVCELEVIV: any = await this.getEntity('FVCELEVIV');
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

    let itemFVCCONVIV: any = await this.getEntity('FVCCONVIV');
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
    let itemFNCDESARM: any = await this.getEntity('FNCDESARM');
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
    let itemFNCOCUPAC: any = await this.getEntity('FNCOCUPAC');
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
    let itemFNCELESAL: any = await this.getEntity('FNCELESAL');
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
    let itemFNCCONSAL: any = await this.getEntity('FNCCONSAL');
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
    let itemFNCELEPER: any = await this.getEntity('FNCELEPER');
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
    let itemFNCELEREP: any = await this.getEntity('FNCELEREP');
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
    let itemFNCCONPER: any = await this.getEntity('FNCCONPER');
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
    let itemFNCCONREP: any = await this.getEntity('FNCCONREP');
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
    let itemFNCPUEIND: any = await this.getEntity('FNCPUEIND');
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
    let itemFNCORGANI: any = await this.getEntity('FNCORGANI');
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
    let itemFUCDEPART: any = await this.getEntity('FUCDEPART');
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
    let itemFUCMUNICISCHEMAs: any = await this.getEntity('FUCMUNICI');
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
    let itemFUCPAISSCHEMAs: any = await this.getEntity('FUCPAIS');
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
    let itemFUCTIPTERSCHEMAs: any = await this.getEntity('FUCTIPTER');
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
    let itemFUCRESGUASCHEMAs: any = await this.getEntity('FUCRESGUA');
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
    let itemFUCBARVERSCHEMAs: any = await this.getEntity('FUCBARVER');
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
    let itemFUCZONASCHEMAs: any = await this.getEntity('FUCZONA');
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
    let itemFNCGENEROs: any = await this.getEntity('FNCGENERO');
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
    let itemFUCUNICUISCHEMAs: any = await this.getEntity('FUCUNICUI');
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
    let itemFUCZONCUISCHEMAs: any = await this.getEntity('FUCZONCUI');
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
    let itemFNCLUNINDs: any = await this.getEntity('FNCLUNIND');
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
    let itemFNCPARENs: any = await this.getEntity('FNCPAREN');
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
    let itemFNCTIPIDEs: any = await this.getEntity('FNCTIPIDE');
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
    }
  }
}
