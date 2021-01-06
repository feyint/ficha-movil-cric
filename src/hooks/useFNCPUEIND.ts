import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCPUEIND} from '../types';

export function useFNCPUEIND() {
  const [listFNCPUEIND, setlist] = useState<FNCPUEIND[]>([]);
  const [itemFNCPUEIND, setFNCPUEIND] = useState<FNCPUEIND>();
  const [countFNCPUEIND, setCount] = useState<number>(0);
  const [loadingFNCPUEIND, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCPUEIND() {
    return database.getAllFromEntity('FNCPUEIND', 'NOMBRE').then(setlist);
  }
  async function createFNCPUEIND(newItem: FNCPUEIND): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database.executeQuery('FNCPUEIND', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCPUEIND').then(setCount);
  }
  function deleteFNCPUEIND(itemToDelete: FNCPUEIND): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCPUEIND', 'ID', itemToDelete.ID)
        .then(getAllFNCPUEIND);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCPUEIND(list: FNCPUEIND) {
    setFNCPUEIND(list);
  }
  function getPuebloByID(id: number) {
    let item: any = null;
    for (let i = 0; i < listFNCPUEIND.length; i++) {
      if (listFNCPUEIND[i].ID == id) {
        item = listFNCPUEIND[i];
      }
    }
    return item;
  }
  async function syncFNCPUEIND() {
    setLoading(true);
    await database.clearEntity('FNCPUEIND');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCPUEIND');
    result.data.map(async (item: any) => {
      await createFNCPUEIND({
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
    itemFNCPUEIND,
    listFNCPUEIND,
    countFNCPUEIND,
    loadingFNCPUEIND,
    createFNCPUEIND,
    deleteFNCPUEIND,
    selectFNCPUEIND,
    syncFNCPUEIND,
    getPuebloByID,
    getAllFNCPUEIND,
  };
}
