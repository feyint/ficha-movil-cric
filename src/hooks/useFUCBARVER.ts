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
    result.data.map((item: any) => {
      createFUCBARVER({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCRESGUA_ID: item.fucresguaId.id,
        FUCZONA_ID: item.fuczonaId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCBARVER,
    listFUCBARVER,
    countFUCBARVER,
    loadingFUCBARVER,
    createFUCBARVER,
    deleteFUCBARVER,
    selectFUCBARVER,
    syncFUCBARVER,
    getAllFUCBARVER,
    filterFUCBARVER,
  };
}
