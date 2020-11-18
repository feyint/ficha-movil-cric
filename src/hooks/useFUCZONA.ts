import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCZONA} from '../types';

// Hook for managing and accessing (CRUD)
export function useFUCZONA() {
  const [listFUCZONA, setItem] = useState<FUCZONA[]>([]);
  const [itemFUCZONA, setFUCZONA] = useState<FUCZONA>();
  const [countFUCZONA, setCount] = useState<number>(0);
  const [loadingFUCZONA, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCZONA() {
    return database.getAllFromEntity('FUCZONA').then(setItem);
  }
  function filterFUCZONA(_id: number, single = false) {
    let statement = `SELECT * FROM {0} WHERE ID = ${_id}`;
    database.executeQuery('FUCZONA', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCZONA[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO, CODIGO_FF} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          CODIGO_FF: CODIGO_FF,
        });
      }
      if (single) {
        setFUCZONA(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  async function createFUCZONA(newItem: FUCZONA): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, CODIGO_FF) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.CODIGO_FF,
    ];
    return await database.executeQuery('FUCZONA', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCZONA').then(setCount);
  }
  function deleteFUCZONA(itemToDelete: FUCZONA): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCZONA', 'ID', itemToDelete.ID)
        .then(getAllFUCZONA);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCZONA(list: FUCZONA) {
    setFUCZONA(list);
  }
  async function syncFUCZONA() {
    setLoading(true);
    await database.clearEntity('FUCZONA');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCZONA');
    result.data.map((item: any) => {
      createFUCZONA({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        CODIGO_FF: item.codigoFf,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCZONA,
    listFUCZONA,
    countFUCZONA,
    loadingFUCZONA,
    createFUCZONA,
    deleteFUCZONA,
    selectFUCZONA,
    syncFUCZONA,
    getAllFUCZONA,
    filterFUCZONA,
  };
}
