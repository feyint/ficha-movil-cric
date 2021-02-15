import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {PickerType} from '../core/utils/types';
import {SyncCatalogService} from '../services';
import {FNCINTTEA} from '../types';

// Hook for managing and accessing (CRUD)
export function useFNCINTTEA() {
  const [listFNCINTTEA, setItem] = useState<FNCINTTEA[]>([]);
  const [itemFNCINTTEA, setFNCINTTEA] = useState<FNCINTTEA>();
  const [countFNCINTTEA, setCount] = useState<number>(0);
  const [loadingFNCINTTEA, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCINTTEA() {
    // Query all  from the DB, then store them as state
    return database.getAllFromEntity('FNCINTTEA').then(setItem);
  }
  async function createFNCINTTEA(newItem: FNCINTTEA): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, PAS_INFERIOR,PAS_SUPERIOR,PAD_INFERIOR, PAD_SUPERIOR,  ESTADO, FSCSEMAFO_ID) 
    VALUES (?, ?, ?, ?, ?,?,?, ? , ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.PAS_INFERIOR,
      newItem.PAS_SUPERIOR,
      newItem.PAD_INFERIOR,
      newItem.PAD_SUPERIOR,
      newItem.ESTADO,
      newItem.FSCSEMAFO_ID,
    ];
    return await database
      .executeQuery('FNCINTTEA', statement, params)
      .then(countEntity);
  }
  async function getIMC(imc: number) {
    for (let i = 0; i < listFNCINTTEA.length; i++) {
      const item = listFNCINTTEA[i];
      if (imc >= item.PAS_INFERIOR && imc <= item.PAS_SUPERIOR) {
        return item;
      }
    }
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCINTTEA').then(setCount);
  }
  function deleteFNCINTTEA(itemToDelete: FNCINTTEA): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCINTTEA', 'ID', itemToDelete.ID)
        .then(getAllFNCINTTEA);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCINTTEA(list: FNCINTTEA) {
    setFNCINTTEA(list);
  }
  async function syncFNCINTTEA() {
    setLoading(true);
    await database.clearEntity('FNCINTTEA');
    let service = new SyncCatalogService();
    let result = await service.getEntity('Fncinttea');
    result.data.map((item: any) => {
      createFNCINTTEA({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        PAS_INFERIOR: item.pasInferior,
        PAS_SUPERIOR: item.pasSuperior,
        PAD_INFERIOR: item.padInferior,
        PAD_SUPERIOR: item.padSuperior,
        ESTADO: item.estado,
        FSCSEMAFO_ID: item.fscsemafoId.id,
      });
    });
    setLoading(false);
  }
  function getImcPicker() {
    let item: PickerType[] = [];
    for (let i = 0; i < listFNCINTTEA.length; i++) {
      item.push({
        value: listFNCINTTEA[i].ID.toString(),
        label: listFNCINTTEA[i].NOMBRE,
        item: listFNCINTTEA[i],
      });
    }
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  }
  return {
    itemFNCINTTEA,
    listFNCINTTEA,
    countFNCINTTEA,
    loadingFNCINTTEA,
    createFNCINTTEA,
    deleteFNCINTTEA,
    selectFNCINTTEA,
    syncFNCINTTEA,
    getAllFNCINTTEA,
    getIMC,
    getImcPicker,
  };
}
