import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {MultiSelectSchema, PickerType} from '../core/utils/types';
import { capitalizeFirstLetter } from '../core/utils/utils';
import {SyncCatalogService} from '../services';
import {FNCCONREP, FNCELEREP} from '../types';

export function useFNCCONREP() {
  const [listFNCCONREP, setlist] = useState<FNCCONREP[]>([]);
  const [listFNCELEREP, setlistLabel] = useState<FNCELEREP[]>([]);
  const [itemFNCCONREP, setFNCCONREP] = useState<FNCCONREP>();
  const [countFNCCONREP, setCount] = useState<number>(0);
  const [loadingFNCCONREP, setLoading] = useState<boolean>(false);

  const database = useDatabase();
  useEffect(() => {
    // countEntity();
  }, []);
  function getAllFNCCONREP() {
    return database.getAllFromEntity('FNCCONREP').then(setlist);
  }
  function getLabel(code: string) {
    for (let i = 0; i < listFNCELEREP.length; i++) {
      if (listFNCELEREP[i].CODIGO === code) {
        return capitalizeFirstLetter(listFNCELEREP[i].NOMBRE);
      }
    }
  }
  async function getQuestionsOptions(questionCodes: string[]) {
    setLoading(true);
    let inQuery = questionCodes.toString();
    inQuery = inQuery.replace('[', '');
    inQuery = inQuery.replace(']', '');
    let statement = `
    SELECT q.CODIGO as QUESTIONCODE, q.NOMBRE as QUESTIONNAME, o.* FROM FNCELEREP q 
    INNER JOIN FNCCONREP o ON q.ID = o.FNCELEREP_ID
    WHERE q.CODIGO  in (${inQuery})`;
    await database.executeQuery('FNCCONREP', statement).then((results) => {
      const count = results.rows.length;
      const items: FNCCONREP[] = [];
      const labels: FNCELEREP[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          ESTADO,
          NOMBRE,
          FNCELEREP_ID,
          QUESTIONCODE,
          QUESTIONNAME,
        } = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          ESTADO: ESTADO,
          NOMBRE: NOMBRE,
          FNCELEREP_ID: FNCELEREP_ID,
          QUESTIONCODE: QUESTIONCODE,
        });
        labels.push({
          CODIGO: QUESTIONCODE,
          NOMBRE: QUESTIONNAME,
        });
      }
      setlist(items);
      setlistLabel(labels);
      setLoading(false);
    });
  }
  async function createFNCCONREP(newItem: FNCCONREP): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FNCELEREP_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FNCELEREP_ID,
    ];
    return await database.executeQuery('FNCCONREP', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCCONREP').then(setCount);
  }
  function deleteFNCCONREP(itemToDelete: FNCCONREP): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCCONREP', 'ID', itemToDelete.ID)
        .then(getAllFNCCONREP);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  function getMultiselect(code: string) {
    let item: MultiSelectSchema = {name: '', id: 0, children: []};
    item.id = parseInt(code, 10);
    for (let i = 0; i < listFNCCONREP.length; i++) {
      if (listFNCCONREP[i].QUESTIONCODE === code) {
        item.children.push({
          id: listFNCCONREP[i].ID,
          name: listFNCCONREP[i].NOMBRE,
          item: listFNCCONREP[i],
        });
      }
    }
    return item;
  }
  function getPicker(code: string) {
    let item: PickerType[] = [];
    for (let i = 0; i < listFNCCONREP.length; i++) {
      if (listFNCCONREP[i].QUESTIONCODE == code) {
        item.push({
          value: listFNCCONREP[i].ID.toString(),
          label: listFNCCONREP[i].NOMBRE,
          item: listFNCCONREP[i],
        });
      }
    }
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  }
  async function selectFNCCONREP(list: FNCCONREP) {
    setFNCCONREP(list);
  }
  async function syncFNCCONREP() {
    setLoading(true);
    await database.clearEntity('FNCCONREP');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCCONREP');
    result.data.map(async (item: any) => {
      await createFNCCONREP({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCELEREP_ID: item.fncelerepId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCCONREP,
    listFNCCONREP,
    countFNCCONREP,
    loadingFNCCONREP,
    createFNCCONREP,
    deleteFNCCONREP,
    selectFNCCONREP,
    getPicker,
    getLabel,
    syncFNCCONREP,
    getAllFNCCONREP,
    getQuestionsOptions,
    getMultiselect,
  };
}
