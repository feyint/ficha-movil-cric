import Realm from 'realm';
export enum DataBaseSchemas {
  UserSchema = 'User',
  FNCTIPIDENSCHEMA = 'FNCTIPIDEN', // tipo de identificacion
  FVBENCUESSCHEMA = 'FVBENCUESSCHEMA',
  FVCCONVIVSCHEMA = 'FVCCONVIV', //respuestas housing
  FVCELEVIVSCHEMA = 'FVCELEVIV', //preguntas housing
  FUBUBIVIVSCHEMA = 'FUBUBIVIV', //ubicacion vivienda
  FNBNUCVIV_FVCCONVIVSCHEMA = 'FNBNUCVIV_FVCCONVIV', // respuestas nucleo familiar
  FNBNUCVIVSCHEMA = 'FNBNUCVIV', // nucleo familiar
  FNCPERSONSCHEMA = 'FNCPERSON', // persona
  FNBNUCVIV_FNCPERSONSCHEMA = 'FNBNUCVIV_FNCPERSON', // relacion entre persona y nucleo familiar
  FUCDEPARTSCHEMA = 'FUCDEPART', // departamento
  FUCMUNICISCHEMA = 'FUCMUNICI', // municipios
  FUCTIPTERSCHEMA = 'FUCTIPTER', // tipo territorio
  FUCRESGUASCHEMA = 'FUCRESGUA', // resguardo
  FUCBARVERSCHEMA = 'FUCBARVER', // barrio vereda
  FUCZONASCHEMA = 'FUCZONA', // barrio vereda
  FUCUNICUISCHEMA = 'FUCUNICUI', // unidad de cuidado
  FUCZONCUI_FUCBARVERSCHEMA = 'FUCZONCUI_FUCBARVER', // unidad de cuidado
  FUCZONCUISCHEMA = 'FUCZONCUI', // Zona de cuidado
  FNCELESALSCHEMA = 'FNCELESAL', //Preguntas salud
  FNCCONSALSCHEMA = 'FNCCONSAL', //respuestas salud
  FNCELEPERSCHEMA = 'FNCELEPER', //preguntas
  FNCCONPERSCHEMA = 'FNCCONPER', //respuestas
  FNCDESARMSCHEMA = 'FNCDESARM',
  FNCGENEROSCHEMA = 'FNCGENERO',
  FNBINFSAL_FNCCONSALSCHEMA = 'FNBINFSAL_FNCCONSAL',
  FNCPERSON_FNCCONPERSCHEMA = 'FNCPERSON_FNCCONPER',
  FNCELEREPSCHEMA = 'FNCELEREP',
  FNCCONREPSCHEMA = 'FNCCONREP',
  FNCSALREP_FNCCONREPSCHEMA = 'FNCSALREP_FNCCONREP',
  FNCSALREPSCHEMA = 'FNCSALREP',
}
export const schemaVersion = 11;
export const UserSchema = {
  name: DataBaseSchemas.UserSchema,
  properties: {
    userid: 'int',
    firstName: 'string',
    lastname: 'string',
    email: 'string',
    username: 'string',
    identificationType: 'int',
    identification: 'string',
  },
};
export const FNCTIPIDENSCHEMA = {
  name: DataBaseSchemas.FNCTIPIDENSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
  },
};
//-----------------------------------------------------------
export const FNCPERSONSCHEMA = {
  name: DataBaseSchemas.FNCPERSONSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    IDENTIFICACION: 'string',
    PRIMER_NOMBRE: 'string',
    SEGUNDO_NOMBRE: 'string',
    PRIMER_APELLIDO: 'string',
    SEGUNDO_APELLIDO: 'string',
    FECHA_NACIMIENTO: 'date?',
    TEL_CELULAR: 'string?',
    TEL_ALTERNO: 'string?',
    CORREO_ELECTRONICO: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    USUARIO_DATA: 'string?',
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'date?',
    FNCTIPIDE_ID: 'int?',
    FNCORGANI_ID: 'int?',
    FNCLUNIND_ID: 'int?',
    FNCOCUPAC_ID: 'int?',
    FUCMUNICI_ID: 'int?',
    FNCPAREN_ID: 'int?',
    FNCGENERO_ID: 'int?',
  },
};
export const FNBNUCVIV_FNCPERSONSCHEMA = {
  name: DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA,
  properties: {
    FNBNUCVIV_ID: 'int',
    FNCPERSON_ID: 'int',
    ID: 'int?',
    SELECCION: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    USUARIO_DATA: 'string?',
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'string?',
  },
};
export const FNCELESALSCHEMA = {
  name: DataBaseSchemas.FNCELESALSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'bool',
  },
};
export const FNCELEPERSCHEMA = {
  name: DataBaseSchemas.FNCELEPERSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'bool',
  },
};
export const FNCELEREPSCHEMA = {
  name: DataBaseSchemas.FNCELEREPSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'bool',
  },
};
//-----------------------------------------------------------
export const FVBENCUESSCHEMA = {
  name: DataBaseSchemas.FVBENCUESSCHEMA,
  properties: {
    ID: 'int',
    IDENTIFICACION: 'string',
    NOMBRE: 'string',
    APELLIDO: 'string',
    FECHA_ACTIVIDAD: 'date',
    FECHA_CREACION: 'date',
  },
};
export const FVCCONVIVSCHEMA = {
  name: DataBaseSchemas.FVCCONVIVSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    FVCELEVIV_ID: 'int',
  },
};
export const FNCCONSALSCHEMA = {
  name: DataBaseSchemas.FNCCONSALSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    FNCELESAL_ID: 'int',
  },
};
export const FNCDESARMSCHEMA = {
  name: DataBaseSchemas.FNCDESARMSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    //FNCELESAL_ID: 'int',
  },
};
export const FNCCONPERSCHEMA = {
  name: DataBaseSchemas.FNCCONPERSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    FNCELEPER_ID: 'int',
  },
};
export const FNCCONREPSCHEMA = {
  name: DataBaseSchemas.FNCCONREPSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    FNCELEREP_ID: 'int',
  },
};
export const FVCELEVIVSCHEMA = {
  name: DataBaseSchemas.FVCELEVIVSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'bool',
  },
};
export const FNBNUCVIV_FVCCONVIVSCHEMA = {
  name: DataBaseSchemas.FNBNUCVIV_FVCCONVIVSCHEMA,
  properties: {
    FNBNUCVIV_ID: 'int',
    FVCCONVIV_ID: 'int',
    FVCELEVIV_ID: 'int',
    ID: 'int?',
    SELECCION: 'string?',
    SYNCSTATE: 'int',
  },
};
export const FUBUBIVIVSCHEMA = {
  name: DataBaseSchemas.FUBUBIVIVSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    DIRECCION: 'string',
    COORDENADA_X: 'string',
    COORDENADA_Y: 'string',
    NUM_NUCLEOS: {type: 'int', default: 0},
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'string?',
    USUARIO_DATA: 'string?',
    FUCBARVER_ID: 'int',
    FUCZONCUI_ID: 'int?',
  },
};
export const FNBNUCVIVSCHEMA = {
  name: DataBaseSchemas.FNBNUCVIVSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    HUMO_CASA: 'bool?',
    ORIGEN_DATA: 'string?',
    USUARIO_DATA: 'string?',
    RESIDUO_BOR: 'string?',
    RESIDUO_PELIGROSO: 'string?',
    ANIMAL_VACUNADO: 'int?',
    ANIMAL_NOVACUNADO: 'int?',
    RIESGO: 'bool?',
    OBSERVACION: 'string?',
    LUGAR_COCINA: 'string?',
    HUMO_DENTRO: 'string?',
    ACCESO_INTERNET: 'bool?',
    TOTAL_ANIMAL: 'int?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    FUBUBIVIV_ID: 'int',
  },
};
export const FNCSALREPSCHEMA = {
  name: DataBaseSchemas.FNCSALREPSCHEMA,
  properties: {
    ID: 'int',
    EDAD_PRIMERA_REGLA: 'int?',
    GRAVIDEZ: 'int?',
    PARIDEZ: 'int?',
    ABORTO: 'int?',
    CESAREA: 'string?',
    NACIDOS_VIVOS: 'int?',
    NACIDOS_MUERTOS: 'int?',
    PARTO_ULTIMO: {type: 'date', default: new Date()},
    ULTIMA_REGLA: {type: 'date', default: new Date()},
    EDAD_GESTACION: 'string?',
    PARTO_ESTIMADO: {type: 'date', default: new Date()},
    PRESENCIA_FAM: 'int?',
    SEROLOGIA: 'int?',
    VIH: 'int?',
    RESUL_CITOLOGIA: 'string?',
    ACCION_CITOLOGIA: 'int?',
    RESUL_PROSTATA: 'string?',
    ACCION_PROSTATA: 'int?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    USUARIO_DATA: 'string?',
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'string?',
    FNCPERSON_ID: 'int',
  },
};
export const FUCDEPARTSCHEMA = {
  name: DataBaseSchemas.FUCDEPARTSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    FUCPAIS_ID: 'int',
  },
};
export const FUCMUNICISCHEMA = {
  name: DataBaseSchemas.FUCMUNICISCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    FUCTIPMUN_ID: 'int',
    FUCDEPART_ID: 'int',
  },
};
export const FUCTIPTERSCHEMA = {
  name: DataBaseSchemas.FUCTIPTERSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
  },
};
export const FUCRESGUASCHEMA = {
  name: DataBaseSchemas.FUCRESGUASCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    FUCMUNICI_ID: 'int',
    FUCTIPRES_ID: 'int',
    FUCTERCRI_ID: 'int',
  },
};
export const FUCBARVERSCHEMA = {
  name: DataBaseSchemas.FUCBARVERSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    FUCRESGUA_ID: 'int',
    FUCZONCUI_ID: 'int',
    FUCZONA_ID: 'int',
  },
};
export const FUCZONASCHEMA = {
  name: DataBaseSchemas.FUCZONASCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
  },
};
export const FUCUNICUISCHEMA = {
  name: DataBaseSchemas.FUCUNICUISCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'string?',
    REPS: 'string?',
  },
};
export const FUCZONCUISCHEMA = {
  name: DataBaseSchemas.FUCZONCUISCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    ESTADO: 'int',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'string?',
    CODIGO_FF: 'string',
    FUCSEDCUI_ID: 'int',
  },
};
export const FUCZONCUI_FUCBARVERSCHEMA = {
  name: DataBaseSchemas.FUCZONCUI_FUCBARVERSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    FUCZONCUI_ID: 'int',
    FUCBARVER_ID: 'int',
    SELECCION: 'string?',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'string?',
  },
};
export const FNBINFSAL_FNCCONSALSCHEMA = {
  name: DataBaseSchemas.FNBINFSAL_FNCCONSALSCHEMA,
  properties: {
    ID: 'int?',
    FNCCONSAL_ID: 'int',
    FNBINFSAL_ID: 'int',
    FNCELESAL_ID: 'int',
    SYNCSTATE: 'int',
  },
};
export const FNCPERSON_FNCCONPERSCHEMA = {
  name: DataBaseSchemas.FNCPERSON_FNCCONPERSCHEMA,
  properties: {
    ID: 'int?',
    FNCCONPER_ID: 'int',
    FNCPERSON_ID: 'int',
    FNCELEPER_ID: 'int',
    SYNCSTATE: 'int',
  },
};
export const FNCSALREP_FNCCONREPSCHEMA = {
  name: DataBaseSchemas.FNCSALREP_FNCCONREPSCHEMA,
  properties: {
    ID: 'int?',
    FNCCONREP_ID: 'int',
    FNCSALREP_ID: 'int',
    FNCELEREP_ID: 'int',
    SYNCSTATE: 'int',
  },
};
export const FNCGENEROSCHEMA = {
  name: DataBaseSchemas.FNCGENEROSCHEMA,
  primaryKey: 'ID',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    COD_FF: 'string',
    ESTADO: 'int?',
    USUARIO_DATA: 'string?',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'string?',
  },
};
export const allCatalogs = () =>
  new Promise((resolve, reject) => {
    Realm.open({
      schema: [FVCCONVIVSCHEMA],
      schemaVersion: 1,
    })
      .then((realm) => {
        let servicios = realm.objects('FVCCONVIV');
        console.log('Response realm: ', servicios);
        resolve(servicios);
      })
      .catch((error) => {
        console.log('Error listando');
        reject(error);
      });
  });

export default class DataBaseProvider {
  async open() {
    await Realm.open({
      schemaVersion: schemaVersion,
      schema: [
        UserSchema,
        FNCTIPIDENSCHEMA,
        FVBENCUESSCHEMA,
        FVCCONVIVSCHEMA,
        FVCELEVIVSCHEMA,
        FUBUBIVIVSCHEMA,
        FNBNUCVIVSCHEMA,
        FNBNUCVIV_FVCCONVIVSCHEMA,
        FUCDEPARTSCHEMA,
        FUCMUNICISCHEMA,
        FUCTIPTERSCHEMA,
        FUCRESGUASCHEMA,
        FUCBARVERSCHEMA,
        FUCZONASCHEMA,
        FUCUNICUISCHEMA,
        FUCZONCUISCHEMA,
        FNCPERSONSCHEMA,
        FNCELESALSCHEMA,
        FNCCONSALSCHEMA,
        FNCELEPERSCHEMA,
        FNCCONPERSCHEMA,
        FNCDESARMSCHEMA,
        FNBINFSAL_FNCCONSALSCHEMA,
        FNCPERSON_FNCCONPERSCHEMA,
        FNCELEREPSCHEMA,
        FNCCONREPSCHEMA,
        FNCSALREP_FNCCONREPSCHEMA,
        FNCSALREPSCHEMA,
        FNCGENEROSCHEMA,
        FNBNUCVIV_FNCPERSONSCHEMA,
        FUCZONCUI_FUCBARVERSCHEMA,
      ],
    }).then((realm) => {
      realm.write(() => {
        realm.create('FUCZONCUI_FUCBARVER', {
          ID: 1,
          FUCZONCUI_ID: 1,
          FUCBARVER_ID: 2,
        });
        realm.create('User', {
          userid: 1,
          firstName: 'Luis',
          lastname: 'Roa',
          email: 'felipperoan@gmail.com',
          username: 'felipe',
          identificationType: 1,
          identification: '1061809552',
        });
        realm.create('FUCBARVER', {
          ID: 2,
          CODIGO: 'CODBV_2',
          NOMBRE: 'Barrio vereda 2',
          ESTADO: 1,
          FUCRESGUA_ID: 1925,
          FUCZONCUI_ID: 1,
          FUCZONA_ID: 1,
        });
        realm.create('FNCGENERO', {
          ID: 1,
          CODIGO: 'F',
          NOMBRE: 'Femenino',
          COD_FF: '1',
          ESTADO: 1,
        });
        realm.create('FNCGENERO', {
          ID: 2,
          CODIGO: 'M',
          NOMBRE: 'Masculino',
          COD_FF: '2',
          ESTADO: 1,
        });

        // realm.create(DataBaseSchemas.FUBUBIVIVSCHEMA, {
        //   ID: 123,
        //   CODIGO: 'CODVIVI1',
        //   DIRECCION: 'Calle 34CN',
        //   COORDENADA_X: 12345,
        //   COORDENADA_Y: 12345,
        //   HUMO_CASA: false,
        //   NUM_NUCLEOS: 0,
        //   FECHA_ACTIVIDAD: new Date(),
        //   FECHA_CREACION: new Date(),
        //   ORIGEN_DATA: 'string',
        //   USUARIO_DATA: 'string',
        //   FUCBARVER_ID: 1,
        //   RESIDUO_BOR: 'string',
        // });
        //****************************************************************** */
        /*try {
          realm.create(DataBaseSchemas.FNCPERSONSCHEMA, {
            ID: 12345,
            CODIGO: 'PERSON001',
            IDENTIFICACION: 1061729337,
            PRIMER_NOMBRE: 'ANDRES',
            SEGUNDO_NOMBRE: 'FELIPE',
            PRIMER_APELLIDO: 'GUTIERREZ',
            SEGUNDO_APELLIDO: 'VIVAS',
            FECHA_NACIMIENTO: new Date(),
            EDAD: 30,
            EDAD_VISITA: 30,
            TEL_CEDULAR: 3192424333,
            TEL_ALTERNO: 8342595,
            CORREO_ELECTRONICO: 'LINKON90@GMAIL.COM',
            FECHA_ACTIVIDAD: new Date(),
            USUARIO_DATA: 'string',
            FECHA_CREACION: new Date(),
            ORIGEN_DATA: new Date(),
            FNCTIPIDE_ID: 1,
            FNCORGANI_ID: 1,
            FNCLUNIND_ID: 1,
            FNCOCUPAC_ID: 1,
            FUCMUNICI_ID: 1,
            FNCPAREN_ID: 1,
            FNCGENERO_ID: 1,
          });
        } catch (error) {}
        */
        //****************************************************************** */
        // realm.create(DataBaseSchemas.FNBNUCVIVSCHEMA, {
        //   ID: 1,
        //   CODIGO: 'CODVIVI1_100-NF01',
        //   HUMO_CASA: false,
        //   FECHA_ACTIVIDAD: new Date(),
        //   FECHA_CREACION: new Date(),
        //   ORIGEN_DATA: 'string',
        //   USUARIO_DATA: 'string',
        //   FUCBARVER_ID: 1,
        //   RESIDUO_BOR: 'string',
        //   RESIDUO_PELIGROSO: 'string',
        //   ANIMAL_VACUNADO: 1,
        //   ANIMAL_NOVACUNADO: 1,
        //   RIESGO: false,
        //   OBSERVACION: '',
        //   LUGAR_COCINA: '',
        //   HUMO_DENTRO: '',
        //   ACCESO_INTERNET: false,
        //   TOTAL_ANIMAL: 1,
        //   FUBUBIVIV_ID: 123,
        //   FUBUBIVIV_CODE: 'CODVIVI1',
        // });
      });
    });
  }
  async countEntity(entity: string) {
    let count = await Realm.open({
      schemaVersion: schemaVersion,
      schema: [
        FNCTIPIDENSCHEMA,
        FVBENCUESSCHEMA,
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
        FNCELEREPSCHEMA,
        FNCCONREPSCHEMA,
      ],
    }).then((realm) => {
      let count = realm.objects(entity).length;
      realm.close();
      return count;
    });
    return count;
  }
}
