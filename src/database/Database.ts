import SQLite from 'react-native-sqlite-storage';
import {DatabaseInitialization} from './DatabaseInitialization';
import {FVCELEVIV} from '../types/FVCELEVIV';
import {DATABASE} from './Constants';
//import {DropboxDatabaseSync} from '../sync/dropbox/DropboxDatabaseSync';
import {AppState, AppStateStatus} from 'react-native';
import {FVCCONVIV} from '../types/FVCCONVIV';

export interface Database {
  // Create
  createFVCELEVIV(item: FVCELEVIV): Promise<void>;
  // Count
  countEntity(entity: string): Promise<number>;
  // Read
  getAllFVCELEVIVs(): Promise<FVCELEVIV[]>;
  getAllFromEntity(
    entity: string,
    orderBy?: string,
    order?: 'ASC' | 'DESC',
  ): Promise<any[]>;
  // Delete
  clearEntity(entity: string): Promise<void>;
  // Delete
  deleteFVCELEVIV(item: FVCELEVIV): Promise<void>;
  deleteFVCCONVIV(item: FVCCONVIV): Promise<void>;
  deleteItem(entity: string, column: string, value: any): Promise<void>;
  executeQuery(
    table: string,
    statement: string,
    params?: any[] | undefined,
  ): Promise<any>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;
//const databaseSync: DropboxDatabaseSync = new DropboxDatabaseSync();

// Insert a new FVCELEVIV into the database
async function createFVCELEVIV(item: FVCELEVIV): Promise<void> {
  return getDatabase()
    .then((db) =>
      db.executeSql(
        `INSERT INTO FVCELEVIV 
        (ID, CODIGO, NOMBRE, ESTADO) 
        VALUES (?, ?, ?, ?); `,
        [item.ID, item.CODIGO, item.NOMBRE, item.ESTADO],
      ),
    )
    .then(([results]) => {
      const {insertId} = results;
      console.log(
        `[db] Added FVCELEVIV with title: "${item}"! InsertId: ${insertId}`,
      );
      // Queue database upload
      //return databaseSync.upload();
    });
}
async function executeQuery(
  table: string,
  statement: string,
  params?: any[] | undefined,
): Promise<SQLite.ResultSet> {
  return getDatabase()
    .then((db) => db.executeSql(statement.replace('{0}', table), params))
    .then(([results]) => {
      return results;
    });
}

// Get an array of all the FVCELEVIVs in the database
async function getAllFVCELEVIVs(): Promise<FVCELEVIV[]> {
  console.log('[db] Fetching FVCELEVIVs from the db...');
  return getDatabase()
    .then((db) =>
      // Get all the FVCELEVIVs, ordered by newest FVCELEVIVs first
      db.executeSql('SELECT * FROM FVCELEVIV ORDER BY ID DESC;'),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const FVCELEVIVs: FVCELEVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO} = row;
        console.log(`[db] FVCELEVIV title: ${NOMBRE}, id: ${ID}`);
        FVCELEVIVs.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
        });
      }
      return FVCELEVIVs;
    });
}
async function getAllFromEntity(
  entity: string,
  orderBy: string | undefined = undefined,
  order: 'ASC' | 'DESC' | undefined = undefined,
): Promise<any[]> {
  console.log(`[db] Fetching ${entity} from the db...`);
  if (orderBy && !order) {
    order = 'ASC';
  }
  let orderQuery = orderBy ? `ORDER BY ${orderBy} ${order}` : '';
  return getDatabase()
    .then((db) =>
      // Get all the FVCELEVIVs, ordered by newest FVCELEVIVs first
      db.executeSql(`SELECT * FROM ${entity} ${orderQuery};`),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      console.error(entity , count);
      const items: any[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        let item = {};
        for (const key of Object.keys(row)) {
          Object.assign(item, {[key]: row[key]});
        }
        items.push(item);
      }
      return items;
    });
}
// Get an array of all the FVCELEVIVs in the database
async function countEntity(entity: string): Promise<number> {
  console.log(`[db] Fetching ${entity} from the db...`);
  return getDatabase()
    .then((db) =>
      // Get all the FVCELEVIVs, ordered by newest FVCELEVIVs first
      db.executeSql(`SELECT COUNT(*) as count FROM ${entity};`),
    )
    .then(([results]) => {
      if (results === undefined) {
        return 0;
      }
      const row = results.rows.item(0);
      const {count} = row;
      return count;
    });
}
async function deleteFVCELEVIV(item: FVCELEVIV): Promise<void> {
  console.log(
    `[db] Deleting FVCELEVIV titled: "${item.NOMBRE}" with id: ${item.ID}`,
  );
  return getDatabase()
    .then((db) => {
      // Delete FVCELEVIV items first, then delete the FVCELEVIV itself
      return db
        .executeSql('DELETE FROM FVCELEVIV WHERE ID = ?;', [item.ID])
        .then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted FVCELEVIV: "${item.NOMBRE}"!`);

      // Queue database upload
      //return databaseSync.upload();
    });
}
async function deleteFVCCONVIV(item: FVCCONVIV): Promise<void> {
  console.log(
    `[db] Deleting FVCCONVIV titled: "${item.NOMBRE}" with id: ${item.ID}`,
  );
  return getDatabase()
    .then((db) => {
      // Delete FVCELEVIV items first, then delete the FVCELEVIV itself
      return db
        .executeSql('DELETE FROM FVCCONVIV WHERE ID = ?;', [item.ID])
        .then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted FVCCONVIV: "${item.NOMBRE}"!`);

      // Queue database upload
      //return databaseSync.upload();
    });
}
async function deleteItem(
  entity: string,
  column: string,
  value: any,
): Promise<void> {
  console.log(
    `[db] Deleting ${entity} titled: "${column}" with value: ${value}`,
  );
  return getDatabase()
    .then((db) => {
      // Delete FVCELEVIV items first, then delete the FVCELEVIV itself
      return db
        .executeSql(`DELETE FROM ${entity} WHERE ${column} = ?;`, [value])
        .then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted ${entity}: "${value}"!`);

      // Queue database upload
      //return databaseSync.upload();
    });
}
async function clearEntity(entity: string): Promise<void> {
  console.log(`[db] Deleting ${entity} `);
  return getDatabase()
    .then((db) => {
      // Delete ITEM
      return db.executeSql(`DELETE FROM ${entity};`).then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted ${entity}`);
      // Queue database upload
      //return databaseSync.upload();
    });
}

// "Private" helpers

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);
  if (databaseInstance) {
    console.log(
      '[db] Database is already open: returning the existing instance',
    );
    return databaseInstance;
  }
  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: 'default',
  });
  console.log('[db] Database open!');
  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);
  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  const status = await databaseInstance.close();
  console.log('[db] Database closed.');
  databaseInstance = undefined;
}

// FVCELEVIVen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active';
console.log('[db] Adding Listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log('[db] App has gone to the background - closing DB connection.');
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  createFVCELEVIV,
  countEntity,
  getAllFVCELEVIVs,
  deleteFVCELEVIV,
  deleteFVCCONVIV,
  clearEntity,
  executeQuery,
  getAllFromEntity,
  deleteItem,
};
