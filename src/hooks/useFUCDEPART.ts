import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCDEPART} from '../types';

// Hook for managing and accessing (CRUD)
export function useFUCDEPART() {
  const [listFUCDEPART, setlist] = useState<FUCDEPART[]>([]);
  const [itemFUCDEPART, setFUCDEPART] = useState<FUCDEPART>();
  const [countFUCDEPART, setCount] = useState<number>(0);
  const [loadingFUCDEPART, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCDEPART() {
    return database.getAllFromEntity('FUCDEPART').then(setlist);
  }
  async function createFUCDEPART(newItem: FUCDEPART): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FUCPAIS_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FUCPAIS_ID,
    ];
    return await database
      .executeQuery('FUCDEPART', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCDEPART').then(setCount);
  }
  function deleteFUCDEPART(itemToDelete: FUCDEPART): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCDEPART', 'ID', itemToDelete.ID)
        .then(getAllFUCDEPART);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  function getDeptfromPais(PAIS_ID: number) {
    let statement = `SELECT * FROM {0} WHERE FUCPAIS_ID = ${PAIS_ID}`;
    database.executeQuery('FUCDEPART', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCDEPART[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO, FUCPAIS_ID} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          FUCPAIS_ID: FUCPAIS_ID,
        });
      }
      setlist(items);
    });
  }
  async function selectFUCDEPART(list: FUCDEPART) {
    setFUCDEPART(list);
  }
  async function syncFUCDEPART() {
    setLoading(true);
    await database.clearEntity('FUCDEPART');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCDEPART');
    result.data.map((item: any) => {
      createFUCDEPART({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUCPAIS_ID: item.fucpaisId.id,
      });
    });
    setLoading(false);
  }
  return {
    itemFUCDEPART,
    listFUCDEPART,
    countFUCDEPART,
    loadingFUCDEPART,
    createFUCDEPART,
    deleteFUCDEPART,
    selectFUCDEPART,
    syncFUCDEPART,
    getAllFUCDEPART,
    getDeptfromPais,
  };
}
