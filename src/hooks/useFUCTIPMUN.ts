import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCTIPMUN} from '../types';

export function useFUCTIPMUN() {
  const [listFUCTIPMUN, setItem] = useState<FUCTIPMUN[]>([]);
  const [itemFUCTIPMUN, setFUCTIPMUN] = useState<FUCTIPMUN>();
  const [countFUCTIPMUN, setCount] = useState<number>(0);
  const [loadingFUCTIPMUN, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCTIPMUN() {
    return database.getAllFromEntity('FUCTIPMUN').then(setItem);
  }
  function getFilterFUCTIPMUN(
    FUCMUNICI: number,
    FUCTIPTER: number,
    single = false,
  ) {
    let statement = `SELECT f.* FROM FUCTIPTER_FUCTIPMUN ff
    INNER JOIN FUCTIPMUN f ON f.ID  = ff.FUCTIPMUN_ID 
    WHERE  ff.FUCTIPTER_ID  = ${FUCTIPTER} AND FUCMUNICI_ID = ${FUCMUNICI}`;
    database.executeQuery('FUCTIPMUN', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCTIPMUN[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
        });
      }
      if (single) {
        setFUCTIPMUN(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  async function createFUCTIPMUN(newItem: FUCTIPMUN): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    let params = [newItem.ID, newItem.CODIGO, newItem.NOMBRE, newItem.ESTADO];
    return await database.executeQuery('FUCTIPMUN', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCTIPMUN').then(setCount);
  }
  function deleteFUCTIPMUN(itemToDelete: FUCTIPMUN): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCTIPMUN', 'ID', itemToDelete.ID)
        .then(getAllFUCTIPMUN);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCTIPMUN(list: FUCTIPMUN) {
    setFUCTIPMUN(list);
  }
  async function syncFUCTIPMUN() {
    setLoading(true);
    await database.clearEntity('FUCTIPMUN');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCTIPMUN');
    result.data.map((item: any) => {
      createFUCTIPMUN({
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
    itemFUCTIPMUN,
    listFUCTIPMUN,
    countFUCTIPMUN,
    loadingFUCTIPMUN,
    createFUCTIPMUN,
    deleteFUCTIPMUN,
    selectFUCTIPMUN,
    syncFUCTIPMUN,
    getAllFUCTIPMUN,
    getFilterFUCTIPMUN,
  };
}
