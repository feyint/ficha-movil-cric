import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCPAIS} from '../types';

// Hook for managing and accessing (CRUD)
export function useFUCPAIS() {
  const [listFUCPAIS, setlist] = useState<FUCPAIS[]>([]);
  const [itemFUCPAIS, setFUCPAIS] = useState<FUCPAIS>();
  const [countFUCPAIS, setCount] = useState<number>(0);
  const [loadingFUCPAIS, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCPAIS() {
    return database.getAllFromEntity('FUCPAIS').then(setlist);
  }
  async function createFUCPAIS(newItem: FUCPAIS): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database
      .executeQuery('FUCPAIS', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCPAIS').then(setCount);
  }
  function deleteFUCPAIS(itemToDelete: FUCPAIS): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCPAIS', 'ID', itemToDelete.ID)
        .then(getAllFUCPAIS);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCPAIS(list: FUCPAIS) {
    setFUCPAIS(list);
  }
  async function syncFUCPAIS() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCPAIS');
    result.data.map((item: any) => {
      createFUCPAIS({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
  }
  return {
    itemFUCPAIS,
    listFUCPAIS,
    countFUCPAIS,
    loadingFUCPAIS,
    createFUCPAIS,
    deleteFUCPAIS,
    selectFUCPAIS,
    syncFUCPAIS,
    getAllFUCPAIS,
  };
}
