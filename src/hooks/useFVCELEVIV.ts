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
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?); `;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return database
      .executeQuery('FVCELEVIV', statement, params)
      .then(countEntity);
  }
  async function bulkFVCELEVIV(newItems: Array<FVCELEVIV>): Promise<void> {
    let statementValues = '(?, ?, ?, ?),'.repeat(newItems.length);
    statementValues = statementValues.substr(0, statementValues.length - 1);
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES ${statementValues}; `;
    let params: any[] = [];
    newItems.forEach((newItem) => {
      params.push(newItem.ID);
      params.push(newItem.CODIGO);
      params.push(newItem.NOMBRE);
      params.push(newItem.ESTADO);
    });
    return await database
      .executeQuery('FVCELEVIV', statement, params)
      .then(countEntity);
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
    await database.clearEntity('FVCELEVIV');
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FVCELEVIV');
    let items: Array<FVCELEVIV> = [];
    for (let i = 0; i < result.data.length; i++) {
      const item = result.data[i];
      items.push({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
      if (items.length > 100) {
        await bulkFVCELEVIV(items);
        items = [];
      }
    }
    if (items.length > 0) {
      await bulkFVCELEVIV(items);
    }
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
    bulkFVCELEVIV,
  };
}
