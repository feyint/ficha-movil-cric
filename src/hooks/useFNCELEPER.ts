import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCELEPER} from '../types';

export function useFNCELEPER() {
  const [listFNCELEPER, setlist] = useState<FNCELEPER[]>([]);
  const [itemFNCELEPER, setFNCELEPER] = useState<FNCELEPER>();
  const [countFNCELEPER, setCount] = useState<number>(0);
  const [loadingFNCELEPER, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCELEPER() {
    return database.getAllFromEntity('FNCELEPER', 'NOMBRE').then(setlist);
  }
  async function createFNCELEPER(newItem: FNCELEPER): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database.executeQuery('FNCELEPER', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCELEPER').then(setCount);
  }
  function deleteFNCELEPER(itemToDelete: FNCELEPER): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCELEPER', 'ID', itemToDelete.ID)
        .then(getAllFNCELEPER);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCELEPER(list: FNCELEPER) {
    setFNCELEPER(list);
  }
  async function syncFNCELEPER() {
    setLoading(true);
    await database.clearEntity('FNCELEPER');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCELEPER');
    result.data.map(async (item: any) => {
      await createFNCELEPER({
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
    itemFNCELEPER,
    listFNCELEPER,
    countFNCELEPER,
    loadingFNCELEPER,
    createFNCELEPER,
    deleteFNCELEPER,
    selectFNCELEPER,
    syncFNCELEPER,
    getAllFNCELEPER,
  };
}
