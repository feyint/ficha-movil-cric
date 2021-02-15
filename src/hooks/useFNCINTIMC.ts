import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {PickerType} from '../core/utils/types';
import {SyncCatalogService} from '../services';
import {FNCINTIMC} from '../types';

// Hook for managing and accessing (CRUD)
export function useFNCINTIMC() {
  const [listFNCINTIMC, setItem] = useState<FNCINTIMC[]>([]);
  const [itemFNCINTIMC, setFNCINTIMC] = useState<FNCINTIMC>();
  const [countFNCINTIMC, setCount] = useState<number>(0);
  const [loadingFNCINTIMC, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCINTIMC() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('FNCINTIMC').then(setItem);
  }
  async function createFNCINTIMC(newItem: FNCINTIMC): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, VALOR_INF,VALOR_SUP, ESTADO, FSCSEMAFO_ID) 
    VALUES (?, ?, ?, ?, ?,?,?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.VALOR_INF,
      newItem.VALOR_SUP,
      newItem.ESTADO,
      newItem.FSCSEMAFO_ID,
    ];
    return await database
      .executeQuery('FNCINTIMC', statement, params)
      .then(countEntity);
  }
  async function getIMC(imc: number) {
    for (let i = 0; i < listFNCINTIMC.length; i++) {
      const item = listFNCINTIMC[i];
      if (imc >= item.VALOR_INF && imc <= item.VALOR_SUP) {
        return item;
      }
    }
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCINTIMC').then(setCount);
  }
  function deleteFNCINTIMC(itemToDelete: FNCINTIMC): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCINTIMC', 'ID', itemToDelete.ID)
        .then(getAllFNCINTIMC);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCINTIMC(list: FNCINTIMC) {
    setFNCINTIMC(list);
  }
  async function syncFNCINTIMC() {
    setLoading(true);
    await database.clearEntity('FNCINTIMC');
    let service = new SyncCatalogService();
    let result = await service.getEntity('Fncintimc');
    result.data.map((item: any) => {
      createFNCINTIMC({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        VALOR_INF: item.valorInf,
        VALOR_SUP: item.valorSup,
        ESTADO: item.estado,
        FSCSEMAFO_ID: item.fscsemafoId.id,
      });
    });
    setLoading(false);
  }
  function getImcPicker() {
    let item: PickerType[] = [];
    for (let i = 0; i < listFNCINTIMC.length; i++) {
      item.push({
        value: listFNCINTIMC[i].ID.toString(),
        label: listFNCINTIMC[i].NOMBRE,
        item: listFNCINTIMC[i],
      });
    }
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  }
  return {
    itemFNCINTIMC,
    listFNCINTIMC,
    countFNCINTIMC,
    loadingFNCINTIMC,
    createFNCINTIMC,
    deleteFNCINTIMC,
    selectFNCINTIMC,
    syncFNCINTIMC,
    getAllFNCINTIMC,
    getIMC,
    getImcPicker,
  };
}
