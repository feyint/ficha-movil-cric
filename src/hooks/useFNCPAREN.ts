import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCPAREN} from '../types';

// Hook for managing and accessing (CRUD)
export function useFNCPAREN() {
  const [listFNCPAREN, setlist] = useState<FNCPAREN[]>([]);
  const [itemFNCPAREN, setFNCPAREN] = useState<FNCPAREN>();
  const [countFNCPAREN, setCount] = useState<number>(0);
  const [loadingFNCPAREN, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCPAREN() {
    return database.getAllFromEntity('FNCPAREN', 'NOMBRE').then(setlist);
  }
  async function createFNCPAREN(newItem: FNCPAREN): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database.executeQuery('FNCPAREN', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCPAREN').then(setCount);
  }
  function deleteFNCPAREN(itemToDelete: FNCPAREN): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCPAREN', 'ID', itemToDelete.ID)
        .then(getAllFNCPAREN);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCPAREN(list: FNCPAREN) {
    setFNCPAREN(list);
  }
  async function syncFNCPAREN() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCPAREN');
    result.data.map(async (item: any) => {
      await createFNCPAREN({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCPAREN,
    listFNCPAREN,
    countFNCPAREN,
    loadingFNCPAREN,
    createFNCPAREN,
    deleteFNCPAREN,
    selectFNCPAREN,
    syncFNCPAREN,
    getAllFNCPAREN,
  };
}
