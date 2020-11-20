import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCRESGUA} from '../types';

export function useFUCRESGUA() {
  const [listFUCRESGUA, setItem] = useState<FUCRESGUA[]>([]);
  const [itemFUCRESGUA, setFUCRESGUA] = useState<FUCRESGUA>();
  const [countFUCRESGUA, setCount] = useState<number>(0);
  const [loadingFUCRESGUA, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCRESGUA() {
    return database.getAllFromEntity('FUCRESGUA').then(setItem);
  }
  function getFilterFUCRESGUA(
    FUCMUNICI: number,
    FUCTIPTER: number,
    single = false,
  ) {
    let statement = `SELECT f.* FROM FUCTIPTER_FUCRESGUA ff
    INNER JOIN FUCRESGUA f ON f.ID  = ff.FUCRESGUA_ID 
    WHERE  ff.FUCTIPTER_ID  = ${FUCTIPTER} AND FUCMUNICI_ID = ${FUCMUNICI}`;
    database.executeQuery('FUCRESGUA', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCRESGUA[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          CODIGO_FF,
          NOMBRE,
          ESTADO,
          FUCMUNICI_ID,
          FUCTIPRES_ID,
          FUCTERCRI_ID,
        } = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          FUCMUNICI_ID: FUCMUNICI_ID,
          FUCTIPRES_ID: FUCTIPRES_ID,
          CODIGO_FF: CODIGO_FF,
          FUCTERCRI_ID: FUCTERCRI_ID,
        });
      }
      if (single) {
        setFUCRESGUA(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  async function createFUCRESGUA(newItem: FUCRESGUA): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, CODIGO_FF,  NOMBRE, ESTADO, FUCMUNICI_ID, FUCTIPRES_ID, FUCTERCRI_ID) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.CODIGO_FF,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FUCMUNICI_ID,
      newItem.FUCTIPRES_ID,
      newItem.FUCTERCRI_ID,
    ];
    return await database.executeQuery('FUCRESGUA', statement, params);
  }
  async function bulkFUCRESGUA(newItems: Array<FUCRESGUA>): Promise<void> {
    let statementValues = '(?, ?, ?, ?, ?, ?, ?, ?),'.repeat(newItems.length);
    statementValues = statementValues.substr(0, statementValues.length - 1);
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, CODIGO_FF,  NOMBRE, ESTADO, FUCMUNICI_ID, FUCTIPRES_ID, FUCTERCRI_ID) 
    VALUES ${statementValues}; `;
    let params: any[] = [];
    newItems.forEach((newItem) => {
      params.push(newItem.ID);
      params.push(newItem.CODIGO);
      params.push(newItem.CODIGO_FF);
      params.push(newItem.NOMBRE);
      params.push(newItem.ESTADO);
      params.push(newItem.FUCMUNICI_ID);
      params.push(newItem.FUCTIPRES_ID);
      params.push(newItem.FUCTERCRI_ID);
    });
    return await database
      .executeQuery('FUCRESGUA', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCRESGUA').then(setCount);
  }
  function deleteFUCRESGUA(itemToDelete: FUCRESGUA): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCRESGUA', 'ID', itemToDelete.ID)
        .then(getAllFUCRESGUA);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCRESGUA(list: FUCRESGUA) {
    setFUCRESGUA(list);
  }
  async function syncFUCRESGUA() {
    setLoading(true);
    await database.clearEntity('FUCRESGUA');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCRESGUA');
    let items: Array<FUCRESGUA> = [];
    for (let i = 0; i < result.data.length; i++) {
      const item = result.data[i];
      items.push({
        ID: item.id,
        CODIGO: item.codigo,
        CODIGO_FF: item.codigoFf,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCMUNICI_ID: item.fucmuniciId.id,
        FUCTIPRES_ID: item.fuctipresId.id,
        FUCTERCRI_ID: item.fuctercriId.id,
      });
      if (items.length > 100) {
        await bulkFUCRESGUA(items);
        items = [];
      }
    }
    if (items.length > 0) {
      await bulkFUCRESGUA(items);
    }
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCRESGUA,
    listFUCRESGUA,
    countFUCRESGUA,
    loadingFUCRESGUA,
    createFUCRESGUA,
    deleteFUCRESGUA,
    selectFUCRESGUA,
    syncFUCRESGUA,
    getAllFUCRESGUA,
    getFilterFUCRESGUA,
    bulkFUCRESGUA,
  };
}
