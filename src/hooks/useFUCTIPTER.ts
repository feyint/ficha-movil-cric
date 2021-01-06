import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCTIPTER} from '../types';

// Hook for managing and accessing (CRUD)
export function useFUCTIPTER() {
  const [listFUCTIPTER, setItem] = useState<FUCTIPTER[]>([]);
  const [itemFUCTIPTER, setFUCTIPTER] = useState<FUCTIPTER>();
  const [countFUCTIPTER, setCount] = useState<number>(0);
  const [loadingFUCTIPTER, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCTIPTER() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('FUCTIPTER').then(setItem);
  }
  async function createFUCTIPTER(newItem: FUCTIPTER): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database
      .executeQuery('FUCTIPTER', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCTIPTER').then(setCount);
  }
  function deleteFUCTIPTER(itemToDelete: FUCTIPTER): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCTIPTER', 'ID', itemToDelete.ID)
        .then(getAllFUCTIPTER);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCTIPTER(list: FUCTIPTER) {
    setFUCTIPTER(list);
  }
  async function syncFUCTIPTER() {
    setLoading(true);
    await database.clearEntity('FUCTIPTER');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCTIPTER');
    result.data.map((item: any) => {
      createFUCTIPTER({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
  }
  return {
    itemFUCTIPTER,
    listFUCTIPTER,
    countFUCTIPTER,
    loadingFUCTIPTER,
    createFUCTIPTER,
    deleteFUCTIPTER,
    selectFUCTIPTER,
    syncFUCTIPTER,
    getAllFUCTIPTER,
  };
}
