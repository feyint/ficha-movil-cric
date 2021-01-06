import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCBARVER} from '../types';

// Hook for managing and accessing (CRUD)
export function useFUCBARVER() {
  const [listFUCBARVER, setItem] = useState<FUCBARVER[]>([]);
  const [itemFUCBARVER, setFUCBARVER] = useState<FUCBARVER>();
  const [countFUCBARVER, setCount] = useState<number>(0);
  const [loadingFUCBARVER, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCBARVER() {
    return database.getAllFromEntity('FUCBARVER').then(setItem);
  }
  function filterFUCBARVER(FUCRESGUA: number) {
    let statement = `SELECT * FROM {0} WHERE FUCRESGUA_ID = ${FUCRESGUA}`;
    database.executeQuery('FUCBARVER', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCBARVER[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO, FUCRESGUA_ID, FUCZONA_ID} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          FUCRESGUA_ID: FUCRESGUA_ID,
          FUCZONA_ID: FUCZONA_ID,
        });
      }
      setItem(items);
    });
  }
  function getFUCBARVERbyID(_id: number) {
    let statement = `SELECT * FROM {0} WHERE ID = ${_id}`;
    database.executeQuery('FUCBARVER', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCBARVER[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO, FUCRESGUA_ID, FUCZONA_ID} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          FUCRESGUA_ID: FUCRESGUA_ID,
          FUCZONA_ID: FUCZONA_ID,
        });
      }
      setFUCBARVER(items[0]);
    });
  }
  async function createFUCBARVER(newItem: FUCBARVER): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FUCRESGUA_ID, FUCZONA_ID) 
    VALUES (?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FUCRESGUA_ID,
      newItem.FUCZONA_ID,
    ];
    return await database.executeQuery('FUCBARVER', statement, params);
  }
  async function bulkFUCBARVER(newItems: Array<FUCBARVER>): Promise<void> {
    let statementValues = '(?, ?, ?, ?, ?, ?),'.repeat(newItems.length);
    statementValues = statementValues.substr(0, statementValues.length - 1);
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FUCRESGUA_ID, FUCZONA_ID) 
    VALUES ${statementValues}; `;
    let params: any[] = [];
    newItems.forEach((newItem) => {
      params.push(newItem.ID);
      params.push(newItem.CODIGO);
      params.push(newItem.NOMBRE);
      params.push(newItem.ESTADO);
      params.push(newItem.FUCRESGUA_ID);
      params.push(newItem.FUCZONA_ID);
    });
    return await database.executeQuery('FUCBARVER', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCBARVER').then(setCount);
  }
  function deleteFUCBARVER(itemToDelete: FUCBARVER): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCBARVER', 'ID', itemToDelete.ID)
        .then(getAllFUCBARVER);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCBARVER(list: FUCBARVER) {
    setFUCBARVER(list);
  }
  async function syncFUCBARVER() {
    setLoading(true);
    await database.clearEntity('FUCBARVER');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCBARVER');
    let items: Array<FUCBARVER> = [];
    for (let i = 0; i < result.data.length; i++) {
      const item = result.data[i];
      items.push({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCRESGUA_ID: item.fucresguaId.id,
        FUCZONA_ID: item.fuczonaId.id,
      });
      if (items.length > 100) {
        await bulkFUCBARVER(items);
        items = [];
      }
    }
    if (items.length > 0) {
      await bulkFUCBARVER(items);
    }
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCBARVER,
    listFUCBARVER,
    countFUCBARVER,
    loadingFUCBARVER,
    getFUCBARVERbyID,
    createFUCBARVER,
    deleteFUCBARVER,
    selectFUCBARVER,
    syncFUCBARVER,
    getAllFUCBARVER,
    filterFUCBARVER,
    bulkFUCBARVER
  };
}
