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
const FVCCONVIVSCHEMA = {
  name: 'FVCCONVIV',
  properties: {
    ID: 'int',
    CODIGO: 'string',
    TIPO: 'string',
    NOMBRE: 'string',
  },
};

export const allCatalogs = () => new Promise((resolve, reject) => {
  Realm.open({
    schema: [FVCCONVIVSCHEMA],
    schemaVersion: 1,
  }).then(realm => {
    let servicios = realm.objects('FVCCONVIV');
    console.log('Response realm: ', servicios);
    resolve(servicios);
  }).catch((error) => {
    console.log('Error listando');
    reject(error);
  });
});

export default class DataBaseProvider {
  async open() {
    await Realm.open({
      schemaVersion: 1,
      schema: [UserSchema, FNCTIPIDENSCHEMA, FVBENCUESSCHEMA, FVCCONVIVSCHEMA],
    }).then((realm) => {
      realm.write(() => {

        let allCatalogs = realm.objects('FVCCONVIV');
        realm.delete(allCatalogs); // Deletes

        realm.create('FVCCONVIV', {ID:1,	CODIGO:'1', TIPO: 'TENENCIA VIVIENDA', NOMBRE:'PROPIA'} );
        realm.create('FVCCONVIV', {ID:2,	CODIGO:'1', TIPO: 'TENENCIA VIVIENDA', NOMBRE:'ARRIENDO'} );
        realm.create('FVCCONVIV', {ID:3,	CODIGO:'1', TIPO: 'TENENCIA VIVIENDA', NOMBRE:'CASA FAMILIAR'} );
        realm.create('FVCCONVIV', {ID:4,	CODIGO:'1', TIPO: 'TENENCIA VIVIENDA', NOMBRE:'POSADA'} );
        realm.create('FVCCONVIV', {ID:5,	CODIGO:'1', TIPO: 'TENENCIA VIVIENDA', NOMBRE:'COMPARTIDA'} );
        realm.create('FVCCONVIV', {ID:6,	CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'TEJA'} );
        realm.create('FVCCONVIV', {ID:7,	CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'ETERNIT'} );
        realm.create('FVCCONVIV', {ID:8,	CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'ZINC'} );
        realm.create('FVCCONVIV', {ID:9,	CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'PAJA'} );
        realm.create('FVCCONVIV', {ID:10, CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'PALMA'} );
        realm.create('FVCCONVIV', {ID:11, CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'CARTON'} );
        realm.create('FVCCONVIV', {ID:12, CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'PLANCHA CEMENTO'} );
        realm.create('FVCCONVIV', {ID:13, CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'CABUYA'} );
        realm.create('FVCCONVIV', {ID:14, CODIGO:'2', TIPO: 'MATERIAL TECHO', NOMBRE:'CAPTUS'} );
        
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
