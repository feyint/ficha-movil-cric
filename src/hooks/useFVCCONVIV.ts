import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {PickerType} from '../core/utils/types';
import {SyncCatalogService} from '../services';
import {FVCCONVIV} from '../types';

export function useFVCCONVIV() {
  const [listFVCCONVIV, setlist] = useState<FVCCONVIV[]>([]);
  const [itemFVCCONVIV, setFVCCONVIV] = useState<FVCCONVIV>();
  const [countFVCCONVIV, setCount] = useState<number>(0);
  const [loadingFVCCONVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function refreshListOfFVCCONVIV() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('FVCCONVIV').then(setlist);
  }
  async function createFVCCONVIV(newItem: FVCCONVIV): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FVCELEVIV_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FVCELEVIV_ID,
    ];
    return await database
      .executeQuery('FVCCONVIV', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FVCCONVIV').then(setCount);
  }
  function deleteFVCCONVIV(itemToDelete: FVCCONVIV): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteFVCCONVIV(itemToDelete)
        .then(refreshListOfFVCCONVIV);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFVCCONVIV(list: FVCCONVIV) {
    setFVCCONVIV(list);
  }
  function getQuestionsOptions(questionCodes: string[]) {
    let inQuery = questionCodes.toString();
    inQuery = inQuery.replace('[', '');
    inQuery = inQuery.replace(']', '');
    let statement = `
    SELECT q.CODIGO as QUESTIONCODE, o.* FROM FVCELEVIV q 
    INNER JOIN FVCCONVIV o ON q.ID = o.FVCELEVIV_ID
    WHERE q.CODIGO  in (${inQuery})`;
    database.executeQuery('FVCELEVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FVCCONVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, ESTADO, NOMBRE, FVCELEVIV_ID, QUESTIONCODE} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          ESTADO: ESTADO,
          NOMBRE: NOMBRE,
          FVCELEVIV_ID: FVCELEVIV_ID,
          QUESTIONCODE: QUESTIONCODE,
        });
      }
      setlist(items);
    });
  }
  function getFVCCONVIVpicker(code: string) {
    let item: PickerType[] = [];
    for (let i = 0; i < listFVCCONVIV.length; i++) {
      if (listFVCCONVIV[i].QUESTIONCODE == code) {
        item.push({
          value: listFVCCONVIV[i].ID.toString(),
          label: listFVCCONVIV[i].NOMBRE,
          item: listFVCCONVIV[i],
        });
      }
    }
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  }
  async function syncFVCCONVIV() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FVCCONVIV');
    result.data.map((item: any) => {
      createFVCCONVIV({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FVCELEVIV_ID: item.fvcelevivId.id,
      });
    });
    setLoading(false);
  }
  return {
    itemFVCCONVIV,
    listFVCCONVIV,
    countFVCCONVIV,
    loadingFVCCONVIV,
    createFVCCONVIV,
    deleteFVCCONVIV,
    selectFVCCONVIV,
    syncFVCCONVIV,
    getQuestionsOptions,
    getFVCCONVIVpicker,
  };
}
