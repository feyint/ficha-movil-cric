import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCZONCUI} from '../types';

export function useFUCZONCUI() {
  const [listFUCZONCUI, setItem] = useState<FUCZONCUI[]>([]);
  const [itemFUCZONCUI, setFUCZONCUI] = useState<FUCZONCUI>();
  const [countFUCZONCUI, setCount] = useState<number>(0);
  const [loadingFUCZONCUI, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFUCZONCUI() {
    return database.getAllFromEntity('FUCZONCUI').then(setItem);
  }
  function filterFUCZONCUI(FUCBARVER: number) {
    let statement = `
     SELECT FUCZONCUI.* FROM {0}
     INNER JOIN FUCZONCUI_FUCBARVER ON 
     FUCZONCUI_FUCBARVER.FUCZONCUI_ID = FUCZONCUI.ID
     WHERE FUCBARVER_ID = ${FUCBARVER}`;
    database.executeQuery('FUCZONCUI', statement).then((results) => {
      const count = results.rows.length;
      const items: FUCZONCUI[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, NOMBRE, ESTADO, FUBSEDCUI_ID} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          NOMBRE: NOMBRE,
          ESTADO: ESTADO,
          FUBSEDCUI_ID: FUBSEDCUI_ID,
        });
      }
      setItem(items);
    });
  }
  async function createFUCZONCUI(newItem: FUCZONCUI): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FUBSEDCUI_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FUBSEDCUI_ID,
    ];
    return await database.executeQuery('FUCZONCUI', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCZONCUI').then(setCount);
  }
  function deleteFUCZONCUI(itemToDelete: FUCZONCUI): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FUCZONCUI', 'ID', itemToDelete.ID)
        .then(getAllFUCZONCUI);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFUCZONCUI(list: FUCZONCUI) {
    setFUCZONCUI(list);
  }

  async function syncFUCZONCUI() {
    await database.clearEntity('FUCZONCUI');
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCZONCUI');
    result.data.map((item: any) => {
      createFUCZONCUI({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FUBSEDCUI_ID: item.fubsedcuiId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCZONCUI,
    listFUCZONCUI,
    countFUCZONCUI,
    loadingFUCZONCUI,
    createFUCZONCUI,
    deleteFUCZONCUI,
    selectFUCZONCUI,
    syncFUCZONCUI,
    getAllFUCZONCUI,
    filterFUCZONCUI,
  };
}
