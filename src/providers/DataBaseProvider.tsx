import Realm from 'realm';
export enum DataBaseSchemas {
  UserSchema = 'User',
  FNCTIPIDENSCHEMA = 'FNCTIPIDEN',
  FVBENCUESSCHEMA = 'FVBENCUESSCHEMA',
  FVCCONVIVSCHEMA = 'FVCCONVIV',
  FVCELEVIVSCHEMA = 'FVCELEVIV',
  FUBUBIVIVSCHEMA = 'FUBUBIVIV',
  FNBNUCVIV_FVCCONVIVSCHEMA = 'FNBNUCVIV_FVCCONVIV',
  FNBNUCVIVSCHEMA = 'FNBNUCVIV',
  FNCPERSONSCHEMA = 'FNCPERSON',
  FNBNUCVIV_FNCPERSONSCHEMA = 'FNBNUCVIV_FNCPERSON',
  FUCDEPARTSCHEMA = 'FUCDEPART', // departamento
  FUCMUNICISCHEMA = 'FUCMUNICI', // municipios
  FUCTIPTERSCHEMA = 'FUCTIPTER', // tipo territorio
  FUCRESGUASCHEMA = 'FUCRESGUA', // resguardo
  FUCBARVERSCHEMA = 'FUCBARVER', // barrio vereda
  FUCZONASCHEMA = 'FUCZONA', // barrio vereda
  FUCUNICUISCHEMA = 'FUCUNICUI', // unidad de cuidado
  FUCZONCUISCHEMA = 'FUCZONCUI', // Zona de cuidado
}
export const schemaVersion = 1;
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
    FECHA_ACTIVIDAD: 'date',
    FECHA_CREACION: 'date',
  },
};
//-----------------------------------------------------------
export const FNCPERSONSCHEMA = {
  name: DataBaseSchemas.FNCPERSONSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    IDENTIFICACION: 'int',
    PRIMER_NOMBRE: 'string',
    SEGUNDO_NOMBRE: 'string',
    PRIMER_APELLIDO: 'string',
    SEGUNDO_APELLIDO: 'string',
    FECHA_NACIMIENTO: 'date',
    EDAD: 'int',
    EDAD_VISITA: 'int',
    TEL_CEDULAR: 'int',
    TEL_ALTERNO: 'int',
    CORREO_ELECTRONICO: 'string',
    FECHA_ACTIVIDAD: {type: 'date', default: new Date()},
    USUARIO_DATA: 'string',
    FECHA_CREACION: {type: 'date', default: new Date()},
    ORIGEN_DATA: 'date',
    FNCTIPIDE_ID: 'int',
    FNCORGANI_ID: 'int',
    FNCLUNIND_ID: 'int',
    FNCOCUPAC_ID: 'int',
    FUCMUNICI_ID: 'int',
    FNCPAREN_ID: 'int',
    FNCGENERO_ID: 'int',
  },
};
export const FNBNUCVIV_FNCPERSONSCHEMA = {
  name: DataBaseSchemas.FNBNUCVIV_FNCPERSONSCHEMA,
  properties: {
    FNBNUCVIV_ID: 'int',
    FNCPERSON_ID: 'int',
    ID: 'int',
    SELECCION: 'string',
    FECHA_ACTIVIDAD: { type: 'date', default: new Date() },
    USUARIO_DATA: 'string',
    FECHA_CREACION: { type: 'date', default: new Date() },
    ORIGEN_DATA: 'string',
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
  properties: {
    ID: 'int',
    CODIGO: 'string',
    DIRECCION: 'string',
    COORDENADA_X: 'int',
    COORDENADA_Y: 'int',
    HUMO_CASA: 'bool',
    NUM_NUCLEOS: 'int',
    FECHA_ACTIVIDAD: { type: 'date', default: new Date() },
    FECHA_CREACION: { type: 'date', default: new Date() },
    ORIGEN_DATA: 'string',
    USUARIO_DATA: 'string',
    FUCBARVER_ID: 'int',
  },
};
export const FNBNUCVIVSCHEMA = {
  name: DataBaseSchemas.FNBNUCVIVSCHEMA,
  properties: {
    ID: 'int',
    CODIGO: 'string',
    HUMO_CASA: 'bool',
    ORIGEN_DATA: 'string',
    USUARIO_DATA: 'string',
    FUCBARVER_ID: 'int',
    RESIDUO_BOR: 'string',
    RESIDUO_PELIGROSO: 'string',
    ANIMAL_VACUNADO: 'int',
    ANIMAL_NOVACUNADO: 'int',
    RIESGO: 'bool',
    OBSERVACION: 'string',
    LUGAR_COCINA: 'string',
    HUMO_DENTRO: 'string',
    ACCESO_INTERNET: 'bool',
    TOTAL_ANIMAL: 'int',
    FECHA_ACTIVIDAD: { type: 'date', default: new Date() },
    FECHA_CREACION: { type: 'date', default: new Date() },
    FUBUBIVIV_ID: 'int',
    FUBUBIVIV_CODE: 'string',
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
    TIPRES: 'string',
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
    FUCTIPBAV_ID: 'int',
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
    ORIGEN_DATA: 'string',
    FUCUNICUI_ID: 'int',
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
      ],
    }).then((realm) => {
      realm.write(() => {
        realm.create('User', {
          userid: 1,
          firstName: 'Luis',
          lastname: 'Roa',
          email: 'felipperoan@gmail.com',
          username: 'felipe',
          identificationType: 1,
          identification: '1061809552',
        });
        realm.create(DataBaseSchemas.FUBUBIVIVSCHEMA, {
          ID: 123,
          CODIGO: 'CODVIVI1',
          DIRECCION: 'Calle 34CN',
          COORDENADA_X: 12345,
          COORDENADA_Y: 12345,
          HUMO_CASA: false,
          NUM_NUCLEOS: 0,
          FECHA_ACTIVIDAD: new Date(),
          FECHA_CREACION: new Date(),
          ORIGEN_DATA: 'string',
          USUARIO_DATA: 'string',
          FUCBARVER_ID: 1,
          RESIDUO_BOR: 'string',
        });
        //****************************************************************** */
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
        //****************************************************************** */
        realm.create(DataBaseSchemas.FNBNUCVIVSCHEMA, {
          ID: 1,
          CODIGO: 'CODVIVI1_100-NF01',
          HUMO_CASA: false,
          FECHA_ACTIVIDAD: new Date(),
          FECHA_CREACION: new Date(),
          ORIGEN_DATA: 'string',
          USUARIO_DATA: 'string',
          FUCBARVER_ID: 1,
          RESIDUO_BOR: 'string',
          RESIDUO_PELIGROSO: 'string',
          ANIMAL_VACUNADO: 1,
          ANIMAL_NOVACUNADO: 1,
          RIESGO: false,
          OBSERVACION: '',
          LUGAR_COCINA: '',
          HUMO_DENTRO: '',
          ACCESO_INTERNET: false,
          TOTAL_ANIMAL: 1,
          FUBUBIVIV_ID: 123,
          FUBUBIVIV_CODE: 'CODVIVI1',
        });
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
      ],
    }).then((realm) => {
      let count = realm.objects(entity).length;
      realm.close();
      return count;
    });
    return count;
  }
}
