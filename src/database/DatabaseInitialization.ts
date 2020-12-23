import SQLite from 'react-native-sqlite-storage';

export class DatabaseInitialization {
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.
  public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 1;
    console.log('Beginning database updates...');

    // First: create tables if they do not already exist
    return database
      .transaction(this.createTables)
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database);
      })
      .then((version) => {
        dbVersion = version;
        console.log('Current database version is: ' + dbVersion);

        // Perform DB updates based on this version

        // This is included as an example of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion1Inserts);
        }
        // otherwise,
        return;
      })
      .then(() => {
        if (dbVersion < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        // otherwise,
        return;
      });
  }

  // Perform initial setup of the database tables
  private createTables(transaction: SQLite.Transaction) {
    // DANGER! For dev only
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql('DROP TABLE IF EXISTS FVCELEVIV;');
    }
    // List table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FVCELEVIV(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        DIRECCION TEXT,
        PRINCIPAL INTEGER,
        ESTADO INTEGER,
        FUCUNICUI_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FVCCONVIV(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FVCELEVIV_ID INTEGER,
        FOREIGN KEY ( FVCELEVIV_ID ) REFERENCES FVCELEVIV ( ID )
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCPAIS(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        CODIGO_POSTAL TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCDEPART(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FUCPAIS_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCMUNICI(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FUCDEPART_ID INTEGER,
        FUCTIPMUN_ID INTEGER,
        FOREIGN KEY ( FUCDEPART_ID ) REFERENCES FUCDEPART ( ID )
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCTIPMUN(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCTIPTER(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCRESGUA(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FUCMUNICI_ID INTEGER,
        FUCTIPRES_ID INTEGER,
        FUCTERCRI_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCTIPTER_FUCRESGUA(
        ID INTEGER PRIMARY KEY NOT NULL,
        FUCTIPTER_ID INTEGER,
        FUCRESGUA_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCBARVER(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FUCRESGUA_ID INTEGER,
        FUCZONA_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCTIPRES(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCUNICUI(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        REPS TEXT,
        ESTADO INTEGER DEFAULT 0
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCZONA(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCPAREN(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCTIPIDE(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCGENERO(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        COD_FF TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCLUNIND(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        COD_FF TEXT,
        ESTADO INTEGER,
        FNCPUEIND_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCPUEIND(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        COD_FF TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCOCUPAC(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        COD_FF TEXT,
        ESTADO INTEGER,
        FNCOCUSUB_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCZONCUI(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FUBSEDCUI_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCOCUSUB(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FNCOCUSUP_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCELEPER(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        SECCION TEXT
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCCONPER(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FNCELEPER_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUCZONCUI_FUCBARVER(
        ID INTEGER PRIMARY KEY NOT NULL,
        FUCZONCUI_ID INTEGER,
        FUCBARVER_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCPERSON_FNCCONPER(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FNCPERSON_ID INTEGER,
        FNCCONPER_ID INTEGER,
        FNCELEPER_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNBNUCVIV_FVCCONVIV(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        WEB_ID TEXT DEFAULT NULL,
        FNBNUCVIV_ID INTEGER,
        FVCCONVIV_ID INTEGER,
        FVCELEVIV_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNBNUCVIV_FNCPERSON(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        WEB_ID TEXT DEFAULT NULL,
        FNBNUCVIV_ID INTEGER,
        FNCPERSON_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FUBUBIVIV(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        WEB_ID TEXT DEFAULT NULL,
        CODIGO TEXT,
        DIRECCION TEXT,
        COORDENADA_X TEXT,
        COORDENADA_Y TEXT,
        FVBENCUES_ID INTEGER,
        FUCZONCUI_FUCBARVER_ID INTEGER,
        ESTADO INTEGER DEFAULT 0
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCELESAL(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        SECCION TEXT,
        REQUERIDO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCCONSAL(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FNCELESAL_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCELEPER(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        SECCION TEXT,
        REQUERIDO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCCONPER(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FNCELEPER_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCDESARM(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCOCUPAC(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        CODIGO_FF TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FNCOCUSUB_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCELEREP(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        SECCION TEXT,
        REQUERIDO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCCONREP(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FNCELEREP_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCPUEIND(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCPAREN(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCORGANI(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER,
        FNCREGION_ID INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCTIPIDE(
        ID INTEGER PRIMARY KEY NOT NULL,
        CODIGO TEXT,
        NOMBRE TEXT,
        ESTADO INTEGER
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNBNUCVIV(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        WEB_ID TEXT DEFAULT NULL,
        CODIGO TEXT,
        OBSERVACION TEXT,
        HUMO_CASA BOOLEAN,
        HUMO_DENTRO BOOLEAN,
        ACCESO_INTERNET BOOLEAN,
        RIESGO BOOLEAN,
        RESIDUO_BOR TEXT,
        RESIDUO_PELIGROSO TEXT,
        ANIMAL_VACUNADO INTEGER,
        ANIMAL_NOVACUNADO INTEGER,
        TOTAL_ANIMAL INTEGER,
        FVBENCUES_ID INTEGER,
        LUGAR_COCINA TEST,
        FUBUBIVIV_ID INTEGER,
        ESTADO INTEGER DEFAULT 0,
        FOREIGN KEY ( FUBUBIVIV_ID ) REFERENCES FUBUBIVIV ( ID )
      );
    `);
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS FNCPERSON(
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        CODIGO TEXT,
        IDENTIFICACION TEXT,
        PRIMER_NOMBRE TEXT,
        SEGUNDO_NOMBRE TEXT,
        PRIMER_APELLIDO TEXT,
        SEGUNDO_APELLIDO TEXT,
        FECHA_NACIMIENTO TEXT,
        TEL_CELULAR TEXT,
        TEL_ALTERNO TEXT,
        CORREO_ELECTRONICO TEXT,
        FECHA_ACTIVIDAD TEXT,
        FECHA_CREACION TEXT,
        FNCTIPIDE_ID INTEGER,
        FNCORGANI_ID INTEGER,
        FNCLUNIND_ID INTEGER,
        FNCOCUPAC_ID INTEGER,
        FUCMUNICI_ID INTEGER,
        FNCPAREN_ID INTEGER,
        FNCGENERO_ID INTEGER,
        FVBENCUES_ID INTEGER,
        FNCPUEIND_ID INTEGER,
        ESTADO INTEGER DEFAULT 0
      );
    `);
    // ListItem table
    // transaction.executeSql(`
    //   CREATE TABLE IF NOT EXISTS ListItem(
    //     item_id INTEGER PRIMARY KEY NOT NULL,
    //     list_id INTEGER,
    //     text TEXT,
    //     done INTEGER DEFAULT 0,
    //     FOREIGN KEY ( list_id ) REFERENCES List ( list_id )
    //   );
    // `);

    // Version table
    transaction.executeSql(`
      CREATE TABLE IF NOT EXISTS Version(
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER
      );
    `);
  }

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    return database
      .executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1;')
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch((error) => {
        console.log(`No version set. Returning 0. Details: ${error}`);
        return 0;
      });
  }

  // Once the app has shipped, use the following functions as a template for updating the database:
  /*
    // This function should be called when the version of the db is < 1
    private preVersion1Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 1 DB inserts");

        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");

        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
    }

    // This function should be called when the version of the db is < 2
    private preVersion2Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 2 DB inserts");
        
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");

        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
    }
    */
}
