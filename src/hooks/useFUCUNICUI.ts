import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCUNICUI} from '../types';

// Hook for managing and accessing (CRUD)
export function useFUCUNICUI() {
  const [listFUCUNICUI, setItem] = useState<FUCUNICUI[]>([]);
  const [itemFUCUNICUI, setFUCUNICUI] = useState<FUCUNICUI>();
  const [countFUCUNICUI, setCount] = useState<number>(0);
  const [loadingFUCUNICUI, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCUNICUI() {
    return database.getAllFromEntity('FUCUNICUI').then(setItem);
  }
  function filterFUCUNICUI(_id: number, single = false) {
    let statement = `SELECT * FROM {0} WHERE ID = ${_id}`;
    database.executeQuery('FUCUNICUI', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCUNICUI[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO, REPS} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          REPS: REPS,
        });
      }
      if (single) {
        setFUCUNICUI(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  async function createFUCUNICUI(newItem: FUCUNICUI): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, REPS) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.REPS,
    ];
    return await database.executeQuery('FUCUNICUI', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCUNICUI').then(setCount);
  }
  function deleteFUCUNICUI(itemToDelete: FUCUNICUI): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCUNICUI', 'ID', itemToDelete.ID)
        .then(getAllFUCUNICUI);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCUNICUI(list: FUCUNICUI) {
    setFUCUNICUI(list);
  }
  async function syncFUCUNICUI() {
    setLoading(true);
    await database.clearEntity('FUCUNICUI');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCUNICUI');
    result.data.map((item: any) => {
      createFUCUNICUI({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        REPS: item.reps,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCUNICUI,
    listFUCUNICUI,
    countFUCUNICUI,
    loadingFUCUNICUI,
    createFUCUNICUI,
    deleteFUCUNICUI,
    selectFUCUNICUI,
    syncFUCUNICUI,
    getAllFUCUNICUI,
    filterFUCUNICUI,
  };
}
