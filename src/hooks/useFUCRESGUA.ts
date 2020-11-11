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
  function getFilterFUCRESGUA(FUCMUNICI: number, FUCTIPRES: number) {
    let statement = `SELECT * FROM {0} WHERE FUCMUNICI_ID = ${FUCMUNICI} 
    AND FUCTIPRES_ID = ${FUCTIPRES}`;
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
      setItem(items);
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
    result.data.map((item: any) => {
      createFUCRESGUA({
        ID: item.id,
        CODIGO: item.codigo,
        CODIGO_FF: item.codigoFf,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCMUNICI_ID: item.fucmuniciId.id,
        FUCTIPRES_ID: item.fuctipresId.id,
        FUCTERCRI_ID: item.fuctercriId.id,
      });
    });
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
  };
}
