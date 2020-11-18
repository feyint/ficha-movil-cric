import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCELEREP} from '../types';

export function useFNCELEREP() {
  const [listFNCELEREP, setlist] = useState<FNCELEREP[]>([]);
  const [itemFNCELEREP, setFNCELEREP] = useState<FNCELEREP>();
  const [countFNCELEREP, setCount] = useState<number>(0);
  const [loadingFNCELEREP, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCELEREP() {
    return database.getAllFromEntity('FNCELEREP').then(setlist);
  }
  async function createFNCELEREP(newItem: FNCELEREP): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database.executeQuery('FNCELEREP', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCELEREP').then(setCount);
  }
  function deleteFNCELEREP(itemToDelete: FNCELEREP): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCELEREP', 'ID', itemToDelete.ID)
        .then(getAllFNCELEREP);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCELEREP(list: FNCELEREP) {
    setFNCELEREP(list);
  }
  async function syncFNCELEREP() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCELEREP');
    result.data.map(async (item: any) => {
      await createFNCELEREP({
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
    itemFNCELEREP,
    listFNCELEREP,
    countFNCELEREP,
    loadingFNCELEREP,
    createFNCELEREP,
    deleteFNCELEREP,
    selectFNCELEREP,
    syncFNCELEREP,
    getAllFNCELEREP,
  };
}
