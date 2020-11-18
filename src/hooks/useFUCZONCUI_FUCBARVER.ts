import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCZONCUI_FUCBARVER} from '../types';

export function useFUCZONCUI_FUCBARVER() {
  const [listFUCZONCUI_FUCBARVER, setItem] = useState<FUCZONCUI_FUCBARVER[]>([]);
  const [itemFUCZONCUI_FUCBARVER, setFUCZONCUI_FUCBARVER] = useState<
    FUCZONCUI_FUCBARVER
  >();
  const [countFUCZONCUI_FUCBARVER, setCount] = useState<number>(0);
  const [loadingFUCZONCUI_FUCBARVER, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
    createFUCZONCUI_FUCBARVER({
      ID: 1,
      FUCBARVER_ID: 2,
      FUCZONCUI_ID: 1,
    });
  }, []);
  function getAllFUCZONCUI_FUCBARVER() {
    return database.getAllFromEntity('FUCZONCUI_FUCBARVER').then(setItem);
  }
  function filterFUCZONCUI_FUCBARVER(id: number, single = false) {
    let statement = `SELECT * FROM {0} WHERE ID = ${id}`;
    database.executeQuery('FUCZONCUI_FUCBARVER', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCZONCUI_FUCBARVER[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, FUCBARVER_ID, FUCZONCUI_ID} = row;
        items.push({
          ID: ID,
          FUCBARVER_ID: FUCBARVER_ID,
          FUCZONCUI_ID: FUCZONCUI_ID,
        });
      }
      if (single) {
        setFUCZONCUI_FUCBARVER(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  async function createFUCZONCUI_FUCBARVER(
    newItem: FUCZONCUI_FUCBARVER,
  ): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, FUCBARVER_ID, FUCZONCUI_ID) 
    VALUES (?, ?, ?);`;
    let params = [newItem.ID, newItem.FUCBARVER_ID, newItem.FUCZONCUI_ID];
    return await database.executeQuery(
      'FUCZONCUI_FUCBARVER',
      statement,
      params,
    );
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCZONCUI_FUCBARVER').then(setCount);
  }
  function deleteFUCZONCUI_FUCBARVER(
    itemToDelete: FUCZONCUI_FUCBARVER,
  ): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCZONCUI_FUCBARVER', 'ID', itemToDelete.ID)
        .then(getAllFUCZONCUI_FUCBARVER);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCZONCUI_FUCBARVER(list: FUCZONCUI_FUCBARVER) {
    setFUCZONCUI_FUCBARVER(list);
  }
  async function syncFUCZONCUI_FUCBARVER() {
    setLoading(true);
    await database.clearEntity('FUCZONCUI_FUCBARVER');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCZONCUI_FUCBARVER');
    result.data.map((item: any) => {
      createFUCZONCUI_FUCBARVER({
        ID: item.id,
        FUCBARVER_ID: item.fucbarverId.id,
        FUCZONCUI_ID: item.fuczonaId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCZONCUI_FUCBARVER,
    listFUCZONCUI_FUCBARVER,
    countFUCZONCUI_FUCBARVER,
    loadingFUCZONCUI_FUCBARVER,
    createFUCZONCUI_FUCBARVER,
    deleteFUCZONCUI_FUCBARVER,
    selectFUCZONCUI_FUCBARVER,
    syncFUCZONCUI_FUCBARVER,
    getAllFUCZONCUI_FUCBARVER,
    filterFUCZONCUI_FUCBARVER,
  };
}
