import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FVCELEVIV} from '../types';

// Hook for managing and accessing (CRUD)
export function useFVCELEVIV() {
  const [listFVCELEVIV, setlist] = useState<FVCELEVIV[]>([]);
  const [itemFVCELEVIV, setFVCELEVIV] = useState<FVCELEVIV>();
  const [countFVCELEVIV, setCount] = useState<number>(0);
  const [loadingFVCELEVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function refreshListOfFVCELEVIV() {
    // Query all  from the DB, then store them as state
    return database.getAllFVCELEVIVs().then(setlist);
  }
  function createFVCELEVIV(newItem: FVCELEVIV): Promise<void> {
    return database.createFVCELEVIV(newItem).then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FVCELEVIV').then(setCount);
  }
  function deleteFVCELEVIV(itemToDelete: FVCELEVIV): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteFVCELEVIV(itemToDelete)
        .then(refreshListOfFVCELEVIV);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFVCELEVIV(list: FVCELEVIV) {
    setFVCELEVIV(list);
  }
  async function syncFVCELEVIV() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FVCELEVIV');
    result.data.map((item: any) => {
      createFVCELEVIV({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
  }
  return {
    itemFVCELEVIV,
    listFVCELEVIV,
    countFVCELEVIV,
    loadingFVCELEVIV,
    createFVCELEVIV,
    deleteFVCELEVIV,
    selectFVCELEVIV,
    syncFVCELEVIV,
  };
}
