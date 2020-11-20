import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCMUNICI} from '../types';

// Hook for managing and accessing (CRUD)
export function useFUCMUNICI() {
  const [listFUCMUNICI, setlist] = useState<FUCMUNICI[]>([]);
  const [itemFUCMUNICI, setFUCMUNICI] = useState<FUCMUNICI>();
  const [countFUCMUNICI, setCount] = useState<number>(0);
  const [loadingFUCMUNICI, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCMUNICI() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('FUCMUNICI').then(setlist);
  }
  function getFUCMUNICIFromDept(DEPART_ID: number) {
    let statement = `SELECT * FROM {0} WHERE FUCDEPART_ID = ${DEPART_ID}`;
    database.executeQuery('FUCMUNICI', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCMUNICI[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO, FUCDEPART_ID, FUCTIPMUN_ID} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          FUCDEPART_ID: FUCDEPART_ID,
          FUCTIPMUN_ID: FUCTIPMUN_ID,
        });
      }
      setlist(items);
    });
  }
  function getDetails(_ID: number) {
    let statement = `
    SELECT m.ID, m.FUCDEPART_ID , d.FUCPAIS_ID FROM FUCMUNICI m 
    INNER JOIN FUCDEPART d ON m.FUCDEPART_ID = d.ID 
    WHERE  m.ID = ${_ID}`;
    return database.executeQuery('FUCMUNICI', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCMUNICI[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {FUCDEPART_ID, FUCPAIS_ID, ID} = row;
        items.push({
          ID: ID,
          FUCDEPART_ID: FUCDEPART_ID,
          FUCPAIS_ID: FUCPAIS_ID,
        });
      }
      return items[0];
    });
  }
  async function createFUCMUNICI(newItem: FUCMUNICI): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FUCTIPMUN_ID, FUCDEPART_ID) 
    VALUES (?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FUCTIPMUN_ID,
      newItem.FUCDEPART_ID,
    ];
    return await database
      .executeQuery('FUCMUNICI', statement, params)
      .then(countEntity);
  }
  async function bulkFUCMUNICI(newItems: Array<FUCMUNICI>): Promise<void> {
    let statementValues = '(?, ?, ?, ?, ?, ?),'.repeat(newItems.length);
    statementValues = statementValues.substr(0, statementValues.length - 1);
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FUCTIPMUN_ID, FUCDEPART_ID) 
    VALUES ${statementValues}; `;
    let params: any[] = [];
    newItems.forEach((newItem) => {
      params.push(newItem.ID);
      params.push(newItem.CODIGO);
      params.push(newItem.NOMBRE);
      params.push(newItem.ESTADO);
      params.push(newItem.FUCTIPMUN_ID);
      params.push(newItem.FUCDEPART_ID);
    });
    return await database
      .executeQuery('FUCMUNICI', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCMUNICI').then(setCount);
  }
  function deleteFUCMUNICI(itemToDelete: FUCMUNICI): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCMUNICI', 'ID', itemToDelete.ID)
        .then(getAllFUCMUNICI);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCMUNICI(list: FUCMUNICI) {
    setFUCMUNICI(list);
  }
  async function syncFUCMUNICI() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCMUNICI');
    let items: Array<FUCMUNICI> = [];
    for (let i = 0; i < result.data.length; i++) {
      const item = result.data[i];
      items.push({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCTIPMUN_ID: item.fuctipmunId.id,
        FUCDEPART_ID: item.fucdepartId.id,
      });
      if (items.length > 100) {
        await bulkFUCMUNICI(items);
        items = [];
      }
    }
    if (items.length > 0) {
      await bulkFUCMUNICI(items);
    }
    setLoading(false);
  }
  return {
    itemFUCMUNICI,
    listFUCMUNICI,
    countFUCMUNICI,
    loadingFUCMUNICI,
    createFUCMUNICI,
    deleteFUCMUNICI,
    selectFUCMUNICI,
    syncFUCMUNICI,
    getAllFUCMUNICI,
    getDetails,
    getFUCMUNICIFromDept,
    bulkFUCMUNICI,
  };
}
