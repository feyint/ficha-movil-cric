import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCCONPER} from '../types';

export function useFNCCONPER() {
  const [listFNCCONPER, setlist] = useState<FNCCONPER[]>([]);
  const [itemFNCCONPER, setFNCCONPER] = useState<FNCCONPER>();
  const [countFNCCONPER, setCount] = useState<number>(0);
  const [loadingFNCCONPER, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCCONPER() {
    return database.getAllFromEntity('FNCCONPER').then(setlist);
  }
  async function createFNCCONPER(newItem: FNCCONPER): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FNCELEPER_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FNCELEPER_ID,
    ];
    return await database.executeQuery('FNCCONPER', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCCONPER').then(setCount);
  }
  function deleteFNCCONPER(itemToDelete: FNCCONPER): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCCONPER', 'ID', itemToDelete.ID)
        .then(getAllFNCCONPER);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCCONPER(list: FNCCONPER) {
    setFNCCONPER(list);
  }
  async function syncFNCCONPER() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCCONPER');
    result.data.map(async (item: any) => {
      await createFNCCONPER({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCELEPER_ID: item.fnceleperId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCCONPER,
    listFNCCONPER,
    countFNCCONPER,
    loadingFNCCONPER,
    createFNCCONPER,
    deleteFNCCONPER,
    selectFNCCONPER,
    syncFNCCONPER,
    getAllFNCCONPER,
  };
}
