import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCLUNIND} from '../types';

export function useFNCLUNIND() {
  const [listFNCLUNIND, setlist] = useState<FNCLUNIND[]>([]);
  const [itemFNCLUNIND, setFNCLUNIND] = useState<FNCLUNIND>();
  const [countFNCLUNIND, setCount] = useState<number>(0);
  const [loadingFNCLUNIND, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCLUNIND() {
    return database.getAllFromEntity('FNCLUNIND', 'NOMBRE').then(setlist);
  }
  async function createFNCLUNIND(newItem: FNCLUNIND): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FNCPUEIND_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FNCPUEIND_ID,
    ];
    return await database.executeQuery('FNCLUNIND', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCLUNIND').then(setCount);
  }
  function deleteFNCLUNIND(itemToDelete: FNCLUNIND): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCLUNIND', 'ID', itemToDelete.ID)
        .then(getAllFNCLUNIND);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCLUNIND(list: FNCLUNIND) {
    setFNCLUNIND(list);
  }
  async function syncFNCLUNIND() {
    setLoading(true);
    await database.clearEntity('FNCLUNIND');
    let service = new SyncCatalogService();
    let result = await service.getEntity('Fnclunind');
    result.data.map(async (item: any) => {
      await createFNCLUNIND({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCPUEIND_ID: item.fncpueindId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCLUNIND,
    listFNCLUNIND,
    countFNCLUNIND,
    loadingFNCLUNIND,
    createFNCLUNIND,
    deleteFNCLUNIND,
    selectFNCLUNIND,
    syncFNCLUNIND,
    getAllFNCLUNIND,
  };
}
