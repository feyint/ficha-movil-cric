import Realm from 'realm';
//    type PropertyType = string | 'bool' | 'int' | 'float' | 'double' | 'string' | 'data' | 'date' | 'list' | 'linkingObjects';
const UserSchema = {
  name: 'User',
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
const FNCTIPIDENSCHEMA = {
  name: 'FNCTIPIDEN',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    NOMBRE: 'string',
    FECHA_ACTIVIDAD: 'date',
    FECHA_CREACION: 'date',
  },
};
const FVBENCUESSCHEMA = {
  name: 'FVBENCUES',
  properties: {
    ID: 'int',
    IDENTIFICACION: 'string',
    NOMBRE: 'string',
    APELLIDO: 'string',
    FECHA_ACTIVIDAD: 'date',
    FECHA_CREACION: 'date',
  },
};
export default class DataBaseProvider {
  async open() {
    await Realm.open({
      schemaVersion: 1,
      schema: [UserSchema, FNCTIPIDENSCHEMA, FVBENCUESSCHEMA],
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
      });
    });
  }
}
