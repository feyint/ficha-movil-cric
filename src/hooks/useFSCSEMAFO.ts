import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FSCSEMAFO} from '../types';

// Hook for managing and accessing (CRUD)
export function useFSCSEMAFO() {
  const [listFSCSEMAFO, setItem] = useState<FSCSEMAFO[]>([]);
  const [itemFSCSEMAFO, setFSCSEMAFO] = useState<FSCSEMAFO>();
  const [countFSCSEMAFO, setCount] = useState<number>(0);
  const [loadingFSCSEMAFO, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFSCSEMAFO() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('FSCSEMAFO').then(setItem);
  }
  async function createFSCSEMAFO(newItem: FSCSEMAFO): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database
      .executeQuery('FSCSEMAFO', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FSCSEMAFO').then(setCount);
  }
  function deleteFSCSEMAFO(itemToDelete: FSCSEMAFO): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FSCSEMAFO', 'ID', itemToDelete.ID)
        .then(getAllFSCSEMAFO);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFSCSEMAFO(list: FSCSEMAFO) {
    setFSCSEMAFO(list);
  }
  async function syncFSCSEMAFO() {
    setLoading(true);
    await database.clearEntity('FSCSEMAFO');
    let service = new SyncCatalogService();
    let result = await service.getEntity('Fscsemafo');
    result.data.map((item: any) => {
      createFSCSEMAFO({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
  }
  return {
    itemFSCSEMAFO,
    listFSCSEMAFO,
    countFSCSEMAFO,
    loadingFSCSEMAFO,
    createFSCSEMAFO,
    deleteFSCSEMAFO,
    selectFSCSEMAFO,
    syncFSCSEMAFO,
    getAllFSCSEMAFO,
  };
}
