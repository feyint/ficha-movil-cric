import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {MultiSelectSchema, PickerType} from '../core/utils/types';
import {SyncCatalogService} from '../services';
import {FNCCONPER} from '../types';

export function useFNCCONPER() {
  const [listFNCCONPER, setlist] = useState<FNCCONPER[]>([]);
  const [itemFNCCONPER, setFNCCONPER] = useState<FNCCONPER>();
  const [countFNCCONPER, setCount] = useState<number>(0);
  const [loadingFNCCONPER, setLoading] = useState<boolean>(false);

  const database = useDatabase();
  useEffect(() => {
    // countEntity();
  }, []);
  function getAllFNCCONPER() {
    return database.getAllFromEntity('FNCCONPER').then(setlist);
  }
  async function getQuestionsOptions(questionCodes: string[]) {
    setLoading(true);
    let inQuery = questionCodes.toString();
    inQuery = inQuery.replace('[', '');
    inQuery = inQuery.replace(']', '');
    let statement = `
    SELECT q.CODIGO as QUESTIONCODE, o.* FROM FNCELEPER q 
    INNER JOIN FNCCONPER o ON q.ID = o.FNCELEPER_ID
    WHERE q.CODIGO  in (${inQuery})`;
    await database.executeQuery('FNCCONPER', statement).then((results) => {
      const count = results.rows.length;
      const items: FNCCONPER[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, ESTADO, NOMBRE, FNCELEPER_ID, QUESTIONCODE} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          ESTADO: ESTADO,
          NOMBRE: NOMBRE,
          FNCELEPER_ID: FNCELEPER_ID,
          QUESTIONCODE: QUESTIONCODE,
        });
      }
      setlist(items);
      setLoading(false);
    });
  }
  async function createFNCCONPER(newItem: FNCCONPER): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FNCELEPER_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FNCELEPER_ID,
    ];
    return await database.executeQuery('FNCCONPER', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCCONPER').then(setCount);
  }
  function deleteFNCCONPER(itemToDelete: FNCCONPER): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCCONPER', 'ID', itemToDelete.ID)
        .then(getAllFNCCONPER);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  function getMultiselect(code: string) {
    let item: MultiSelectSchema = {name: '', id: 0, children: []};
    item.id = parseInt(code, 10);
    for (let i = 0; i < listFNCCONPER.length; i++) {
      if (listFNCCONPER[i].QUESTIONCODE === code) {
        item.children.push({
          id: listFNCCONPER[i].ID,
          name: listFNCCONPER[i].NOMBRE,
          item: listFNCCONPER[i],
        });
      }
    }
    return item;
  }
  function getPicker(code: string) {
    let item: PickerType[] = [];
    for (let i = 0; i < listFNCCONPER.length; i++) {
      if (listFNCCONPER[i].QUESTIONCODE == code) {
        item.push({
          value: listFNCCONPER[i].ID.toString(),
          label: listFNCCONPER[i].NOMBRE,
          item: listFNCCONPER[i],
        });
      }
    }
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  }
  async function selectFNCCONPER(list: FNCCONPER) {
    setFNCCONPER(list);
  }
  async function syncFNCCONPER() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCCONPER');
    result.data.map(async (item: any) => {
      await createFNCCONPER({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCELEPER_ID: item.fnceleperId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCCONPER,
    listFNCCONPER,
    countFNCCONPER,
    loadingFNCCONPER,
    createFNCCONPER,
    deleteFNCCONPER,
    selectFNCCONPER,
    getPicker,
    syncFNCCONPER,
    getAllFNCCONPER,
    getQuestionsOptions,
    getMultiselect,
  };
}
