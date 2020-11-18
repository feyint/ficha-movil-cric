import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCTIPRES} from '../types';

export function useFUCTIPRES() {
  const [listFUCTIPRES, setItem] = useState<FUCTIPRES[]>([]);
  const [itemFUCTIPRES, setFUCTIPRES] = useState<FUCTIPRES>();
  const [countFUCTIPRES, setCount] = useState<number>(0);
  const [loadingFUCTIPRES, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCTIPRES() {
    return database.getAllFromEntity('FUCTIPRES').then(setItem);
  }
  function getFilterFUCTIPRES(
    FUCMUNICI: number,
    FUCTIPTER: number,
    single = false,
  ) {
    let statement = `SELECT f.* FROM FUCTIPTER_FUCTIPRES ff
    INNER JOIN FUCTIPRES f ON f.ID  = ff.FUCTIPRES_ID 
    WHERE  ff.FUCTIPTER_ID  = ${FUCTIPTER} AND FUCMUNICI_ID = ${FUCMUNICI}`;
    database.executeQuery('FUCTIPRES', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCTIPRES[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, CODIGO_FF, NOMBRE, ESTADO} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          CODIGO_FF: CODIGO_FF,
        });
      }
      if (single) {
        setFUCTIPRES(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  async function createFUCTIPRES(newItem: FUCTIPRES): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, CODIGO_FF,  NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.CODIGO_FF,
      newItem.NOMBRE,
      newItem.ESTADO,
    ];
    return await database.executeQuery('FUCTIPRES', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCTIPRES').then(setCount);
  }
  function deleteFUCTIPRES(itemToDelete: FUCTIPRES): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCTIPRES', 'ID', itemToDelete.ID)
        .then(getAllFUCTIPRES);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCTIPRES(list: FUCTIPRES) {
    setFUCTIPRES(list);
  }
  async function syncFUCTIPRES() {
    setLoading(true);
    await database.clearEntity('FUCTIPRES');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCTIPRES');
    result.data.map((item: any) => {
      createFUCTIPRES({
        ID: item.id,
        CODIGO: item.codigo,
        CODIGO_FF: item.codigoFf,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCTIPRES,
    listFUCTIPRES,
    countFUCTIPRES,
    loadingFUCTIPRES,
    createFUCTIPRES,
    deleteFUCTIPRES,
    selectFUCTIPRES,
    syncFUCTIPRES,
    getAllFUCTIPRES,
    getFilterFUCTIPRES,
  };
}
