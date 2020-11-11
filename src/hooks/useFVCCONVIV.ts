import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FVCCONVIV} from '../types';

// Hook for managing and accessing (CRUD)
export function useFVCCONVIV() {
  const [listFVCCONVIV, setlist] = useState<FVCCONVIV[]>([]);
  const [itemFVCCONVIV, setFVCCONVIV] = useState<FVCCONVIV>();
  const [countFVCCONVIV, setCount] = useState<number>(0);
  const [loadingFVCCONVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function refreshListOfFVCCONVIV() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('FVCCONVIV').then(setlist);
  }
  async function createFVCCONVIV(newItem: FVCCONVIV): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FVCELEVIV_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FVCELEVIV_ID,
    ];
    return await database
      .executeQuery('FVCCONVIV', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FVCCONVIV').then(setCount);
  }
  function deleteFVCCONVIV(itemToDelete: FVCCONVIV): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteFVCCONVIV(itemToDelete)
        .then(refreshListOfFVCCONVIV);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFVCCONVIV(list: FVCCONVIV) {
    setFVCCONVIV(list);
  }
  async function syncFVCCONVIV() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FVCCONVIV');
    result.data.map((item: any) => {
      createFVCCONVIV({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FVCELEVIV_ID: item.fvcelevivId.id,
      });
    });
    setLoading(false);
  }
  return {
    itemFVCCONVIV,
    listFVCCONVIV,
    countFVCCONVIV,
    loadingFVCCONVIV,
    createFVCCONVIV,
    deleteFVCCONVIV,
    selectFVCCONVIV,
    syncFVCCONVIV,
  };
}
