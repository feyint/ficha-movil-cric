import Realm from 'realm';
export enum DataBaseSchemas {
  UserSchema = 'User',
  FNCTIPIDENSCHEMA = 'FNCTIPIDEN',
  FVBENCUESSCHEMA = 'FVBENCUESSCHEMA',
  FVCCONVIVSCHEMA = 'FVCCONVIV',
  FVCELEVIVSCHEMA = 'FVCELEVIV',
  FUBUBIVIVSCHEMA = 'FUBUBIVIV',
  FVBVIVIEN_FVCCONVIVSCHEMA = 'FVBVIVIEN_FVCCONVIV',
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
export const FVBVIVIEN_FVCCONVIV = {
  name: DataBaseSchemas.FVBVIVIEN_FVCCONVIVSCHEMA,
  properties: {
    FVBVIVIEN_CODE: 'string',
    FVCELEVIV_CODE: 'string',
    FVCCONVIV_CODE: 'string',
    FVCCONVIV_ID: 'int',
    FVBVIVIEN_ID: 'int',
    FVCELEVIV_ID: 'int',
    SYNCSTATE: 'int',
  },
};
//type PropertyType = string | 'bool' | 'int' | 'float' | 'double' | 'string' | 'data' | 'date' | 'list' | 'linkingObjects';
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
    FECHA_ACTIVIDAD: 'date',
    FECHA_CREACION: 'date',
    ORIGEN_DATA: 'string',
    USUARIO_DATA: 'string',
    FUCBARVER_ID: 'int',
    RESIDUO_BOR: 'string',
    RESIDUO_PELIGROSO: 'string',
    ANIMAL_VACUNADO: 'int',
    ANIMAL_NOVACUNADO: 'int',
    RIESGO: 'bool',
    OBSERVACION: 'string',
    FUCUNICUI_ID: 'int',
    FVBENCUES_ID: 'int',
    LUGAR_COCINA: 'string',
    HUMO_DENTRO: 'string',
    ACCESO_INTERNET: 'bool',
    TOTAL_ANIMAL: 'int',
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
        FVBVIVIEN_FVCCONVIV,
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
        realm.create('FUBUBIVIV', {
          ID: 123,
          CODIGO: 'CODVIV10001',
          DIRECCION: 'Calle 34CN',
          COORDENADA_X: 12345,
          COORDENADA_Y: 12345,
          HUMO_CASA: false,
          NUM_NUCLEOS: 10,
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
          OBSERVACION: 'string',
          FUCUNICUI_ID: 1,
          FVBENCUES_ID: 1,
          LUGAR_COCINA: 'string',
          HUMO_DENTRO: 'string',
          ACCESO_INTERNET: true,
          TOTAL_ANIMAL: 10,
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
      ],
    }).then((realm) => {
      let count = realm.objects(entity).length;
      realm.close();
      return count;
    });
    return count;
  }
}
