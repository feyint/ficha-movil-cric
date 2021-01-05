/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCELESAL} from '../types';

export function useFNCELESAL() {
  const [listFNCELESAL, setlist] = useState<FNCELESAL[]>([]);
  const [itemFNCELESAL, setFNCELESAL] = useState<FNCELESAL>();
  const [countFNCELESAL, setCount] = useState<number>(0);
  const [loadingFNCELESAL, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCELESAL() {
    return database.getAllFromEntity('FNCELESAL', 'NOMBRE').then(setlist);
  }
  async function createFNCELESAL(newItem: FNCELESAL): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database.executeQuery('FNCELESAL', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCELESAL').then(setCount);
  }
  function deleteFNCELESAL(itemToDelete: FNCELESAL): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCELESAL', 'ID', itemToDelete.ID)
        .then(getAllFNCELESAL);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCELESAL(list: FNCELESAL) {
    setFNCELESAL(list);
  }
  async function syncFNCELESAL() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('Fncelesal');
    result.data.map(async (item: any) => {
      await createFNCELESAL({
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
    itemFNCELESAL,
    listFNCELESAL,
    countFNCELESAL,
    loadingFNCELESAL,
    createFNCELESAL,
    deleteFNCELESAL,
    selectFNCELESAL,
    syncFNCELESAL,
    getAllFNCELESAL,
  };
}
