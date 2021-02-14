import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SystemParameterEnum} from '../core/utils/SystemParameters';
import {SyncCatalogService} from '../services';
import {SGCSISPAR} from '../types';

// Hook for managing and accessing (CRUD)
export function useSGCSISPAR() {
  const [listSGCSISPAR, setItem] = useState<SGCSISPAR[]>([]);
  const [itemSGCSISPAR, setSGCSISPAR] = useState<SGCSISPAR>();
  const [countSGCSISPAR, setCount] = useState<number>(0);
  const [loadingSGCSISPAR, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllSGCSISPAR() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('SGCSISPAR').then(setItem);
  }
  async function createSGCSISPAR(newItem: SGCSISPAR): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, VALOR, ESTADO) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.VALOR,
      newItem.ESTADO,
    ];
    return await database
      .executeQuery('SGCSISPAR', statement, params)
      .then(countEntity);
  }
  async function getByCode(parameter: SystemParameterEnum) {
    let statement = `SELECT * FROM SGCSISPAR s WHERE s.CODIGO  = '${SystemParameterEnum[parameter]}'`;
    return await database
      .executeQuery('SGCSISPAR', statement)
      .then((results) => {
        const count = results.rows.length;
        const items: SGCSISPAR[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {ID, CODIGO, VALOR, NOMBRE, ESTADO} = row;
          items.push({
            ID,
            CODIGO,
            VALOR,
            NOMBRE,
            ESTADO,
          });
        }
        return items[0];
      });
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('SGCSISPAR').then(setCount);
  }
  function deleteSGCSISPAR(itemToDelete: SGCSISPAR): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('SGCSISPAR', 'ID', itemToDelete.ID)
        .then(getAllSGCSISPAR);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectSGCSISPAR(list: SGCSISPAR) {
    setSGCSISPAR(list);
  }
  async function syncSGCSISPAR() {
    setLoading(true);
    await database.clearEntity('SGCSISPAR');
    let service = new SyncCatalogService();
    let result = await service.getEntity('Sgcsispar');
    result.data.map((item: any) => {
      createSGCSISPAR({
        ID: item.id,
        CODIGO: item.codigo,
        VALOR: item.valor,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
  }
  return {
    itemSGCSISPAR,
    listSGCSISPAR,
    countSGCSISPAR,
    loadingSGCSISPAR,
    createSGCSISPAR,
    deleteSGCSISPAR,
    selectSGCSISPAR,
    syncSGCSISPAR,
    getAllSGCSISPAR,
    getByCode,
  };
}
