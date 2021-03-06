import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCOCUPAC} from '../types';

export function useFNCOCUPAC() {
  const [listFNCOCUPAC, setlist] = useState<FNCOCUPAC[]>([]);
  const [itemFNCOCUPAC, setFNCOCUPAC] = useState<FNCOCUPAC>();
  const [countFNCOCUPAC, setCount] = useState<number>(0);
  const [loadingFNCOCUPAC, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCOCUPAC() {
    return database.getAllFromEntity('FNCOCUPAC', 'NOMBRE').then(setlist);
  }
  async function createFNCOCUPAC(newItem: FNCOCUPAC): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, CODIGO_FF, FNCOCUSUB_ID) 
    VALUES (?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.CODIGO_FF,
      newItem.FNCOCUSUB_ID,
    ];
    return await database.executeQuery('FNCOCUPAC', statement, params);
  }
  async function bulkFNCOCUPAC(newItems: Array<FNCOCUPAC>): Promise<void> {
    let statementValues = '(?, ?, ?, ?, ?, ?),'.repeat(newItems.length);
    statementValues = statementValues.substr(0, statementValues.length - 1);
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, CODIGO_FF, FNCOCUSUB_ID) 
    VALUES ${statementValues}; `;
    let params: any[] = [];
    newItems.forEach((newItem) => {
      params.push(newItem.ID);
      params.push(newItem.CODIGO);
      params.push(newItem.NOMBRE);
      params.push(newItem.ESTADO);
      params.push(newItem.CODIGO_FF);
      params.push(newItem.FNCOCUSUB_ID);
    });
    return await database
      .executeQuery('FNCOCUPAC', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCOCUPAC').then(setCount);
  }
  function deleteFNCOCUPAC(itemToDelete: FNCOCUPAC): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCOCUPAC', 'ID', itemToDelete.ID)
        .then(getAllFNCOCUPAC);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCOCUPAC(list: FNCOCUPAC) {
    setFNCOCUPAC(list);
  }
  async function syncFNCOCUPAC() {
    setLoading(true);
    await database.clearEntity('FNCOCUPAC');
    let service = new SyncCatalogService();
    let result = await service.getEntity('Fncocupac');
    let items: Array<FNCOCUPAC> = [];
    for (let i = 0; i < result.data.length; i++) {
      const item = result.data[i];
      items.push({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        CODIGO_FF: item.codigoFf,
        FNCOCUSUB_ID: item.fncocusubId.id,
      });
      if (items.length > 100) {
        await bulkFNCOCUPAC(items);
        items = [];
      }
    }
    if (items.length > 0) {
      await bulkFNCOCUPAC(items);
    }
    setLoading(false);
    countEntity();
  }
  function getOcupacionByID(id: number) {
    let item: any = null;
    for (let i = 0; i < listFNCOCUPAC.length; i++) {
      if (listFNCOCUPAC[i].ID == id) {
        item = listFNCOCUPAC[i];
      }
    }
    return item;
  }
  return {
    itemFNCOCUPAC,
    listFNCOCUPAC,
    countFNCOCUPAC,
    loadingFNCOCUPAC,
    createFNCOCUPAC,
    deleteFNCOCUPAC,
    selectFNCOCUPAC,
    syncFNCOCUPAC,
    getOcupacionByID,
    getAllFNCOCUPAC,
    bulkFNCOCUPAC,
  };
}
