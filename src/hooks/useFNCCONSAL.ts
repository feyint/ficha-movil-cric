import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {MultiSelectSchema, PickerType} from '../core/utils/types';
import {capitalizeFirstLetter} from '../core/utils/utils';
import {SyncCatalogService} from '../services';
import {FNCCONSAL} from '../types';

export function useFNCCONSAL() {
  const [listFNCCONSAL, setlist] = useState<FNCCONSAL[]>([]);
  const [itemFNCCONSAL, setFNCCONSAL] = useState<FNCCONSAL>();
  const [countFNCCONSAL, setCount] = useState<number>(0);
  const [loadingFNCCONSAL, setLoading] = useState<boolean>(false);

  const database = useDatabase();
  useEffect(() => {
    // countEntity();
  }, []);
  function getAllFNCCONSAL() {
    return database.getAllFromEntity('FNCCONSAL', 'NOMBRE').then(setlist);
  }
  function getLabel(code: string) {
    for (let i = 0; i < listFNCCONSAL.length; i++) {
      if (listFNCCONSAL[i].CODIGO === code) {
        return capitalizeFirstLetter(listFNCCONSAL[i].NOMBRE);
      }
    }
  }
  async function getQuestionsOptions(questionCodes: string[]) {
    setLoading(true);
    let inQuery = questionCodes.toString();
    inQuery = inQuery.replace('[', '');
    inQuery = inQuery.replace(']', '');
    let statement = `
    SELECT q.CODIGO as QUESTIONCODE, o.* FROM FNCELESAL q 
    INNER JOIN FNCCONSAL o ON q.ID = o.FNCELESAL_ID
    WHERE q.CODIGO  in (${inQuery})`;
    await database.executeQuery('FNCCONSAL', statement).then((results) => {
      const count = results.rows.length;
      const items: FNCCONSAL[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, ESTADO, NOMBRE, FNCELESAL_ID, QUESTIONCODE} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          ESTADO: ESTADO,
          NOMBRE: NOMBRE,
          FNCELESAL_ID: FNCELESAL_ID,
          QUESTIONCODE: QUESTIONCODE,
        });
      }
      setlist(items);
      setLoading(false);
    });
  }
  async function createFNCCONSAL(newItem: FNCCONSAL): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FNCELESAL_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FNCELESAL_ID,
    ];
    return await database.executeQuery('FNCCONSAL', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCCONSAL').then(setCount);
  }
  function deleteFNCCONSAL(itemToDelete: FNCCONSAL): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCCONSAL', 'ID', itemToDelete.ID)
        .then(getAllFNCCONSAL);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  function getMultiselect(code: string) {
    let item: MultiSelectSchema = {name: '', id: 0, children: []};
    item.id = parseInt(code, 10);
    for (let i = 0; i < listFNCCONSAL.length; i++) {
      if (listFNCCONSAL[i].QUESTIONCODE === code) {
        item.children.push({
          id: listFNCCONSAL[i].ID,
          name: listFNCCONSAL[i].NOMBRE,
          item: listFNCCONSAL[i],
        });
      }
    }
    return item;
  }
  function getPicker(code: string) {
    let item: PickerType[] = [];
    for (let i = 0; i < listFNCCONSAL.length; i++) {
      if (listFNCCONSAL[i].QUESTIONCODE == code) {
        item.push({
          value: listFNCCONSAL[i].ID.toString(),
          label: listFNCCONSAL[i].NOMBRE,
          item: listFNCCONSAL[i],
        });
      }
    }
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  }
  async function selectFNCCONSAL(list: FNCCONSAL) {
    setFNCCONSAL(list);
  }
  async function syncFNCCONSAL() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCCONSAL');
    result.data.map(async (item: any) => {
      await createFNCCONSAL({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCELESAL_ID: item.FNCELESALId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCCONSAL,
    listFNCCONSAL,
    countFNCCONSAL,
    loadingFNCCONSAL,
    createFNCCONSAL,
    deleteFNCCONSAL,
    selectFNCCONSAL,
    getPicker,
    syncFNCCONSAL,
    getAllFNCCONSAL,
    getQuestionsOptions,
    getMultiselect,
    getLabel,
  };
}
