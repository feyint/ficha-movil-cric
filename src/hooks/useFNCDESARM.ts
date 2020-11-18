import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCDESARM} from '../types';

export function useFNCDESARM() {
  const [listFNCDESARM, setlist] = useState<FNCDESARM[]>([]);
  const [itemFNCDESARM, setFNCDESARM] = useState<FNCDESARM>();
  const [countFNCDESARM, setCount] = useState<number>(0);
  const [loadingFNCDESARM, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCDESARM() {
    return database.getAllFromEntity('FNCDESARM').then(setlist);
  }
  async function createFNCDESARM(newItem: FNCDESARM): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, COD_FF) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
    ];
    return await database.executeQuery('FNCDESARM', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCDESARM').then(setCount);
  }
  function deleteFNCDESARM(itemToDelete: FNCDESARM): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCDESARM', 'ID', itemToDelete.ID)
        .then(getAllFNCDESARM);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCDESARM(list: FNCDESARM) {
    setFNCDESARM(list);
  }
  async function syncFNCDESARM() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCDESARM');
    result.data.map(async (item: any) => {
      await createFNCDESARM({
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
    itemFNCDESARM,
    listFNCDESARM,
    countFNCDESARM,
    loadingFNCDESARM,
    createFNCDESARM,
    deleteFNCDESARM,
    selectFNCDESARM,
    syncFNCDESARM,
    getAllFNCDESARM,
  };
}
