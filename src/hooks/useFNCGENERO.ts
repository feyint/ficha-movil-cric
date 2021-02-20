import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCGENERO} from '../types';

export function useFNCGENERO() {
  const [listFNCGENERO, setlist] = useState<FNCGENERO[]>([]);
  const [itemFNCGENERO, setFNCGENERO] = useState<FNCGENERO>();
  const [countFNCGENERO, setCount] = useState<number>(0);
  const [loadingFNCGENERO, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCGENERO() {
    return database.getAllFromEntity('FNCGENERO', 'NOMBRE').then(setlist);
  }
  async function createFNCGENERO(newItem: FNCGENERO): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, COD_FF) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.COD_FF,
    ];
    return await database.executeQuery('FNCGENERO', statement, params);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCGENERO').then(setCount);
  }
  function deleteFNCGENERO(itemToDelete: FNCGENERO): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCGENERO', 'ID', itemToDelete.ID)
        .then(getAllFNCGENERO);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function getbyID(GENREID: number) {
    let statement = `
      SELECT * FROM {0} WHERE ID = ${GENREID}`;
    return await database
      .executeQuery('FNCGENERO', statement)
      .then((results) => {
        const count = results.rows.length;
        const items: FNCGENERO[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {ID, CODIGO, COD_FF, ESTADO, NOMBRE} = row;
          items.push({
            ID,
            CODIGO,
            COD_FF,
            ESTADO,
            NOMBRE,
          });
        }
        setFNCGENERO(items[0]);
        return items[0];
      });
  }
  async function selectFNCGENERO(list: FNCGENERO) {
    setFNCGENERO(list);
  }
  async function syncFNCGENERO() {
    setLoading(true);
    await database.clearEntity('FNCGENERO');
    let service = new SyncCatalogService();
    let result = await service.getEntity('Fncgenero');
    result.data.map(async (item: any) => {
      await createFNCGENERO({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        COD_FF: item.codFf,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCGENERO,
    listFNCGENERO,
    countFNCGENERO,
    loadingFNCGENERO,
    createFNCGENERO,
    deleteFNCGENERO,
    selectFNCGENERO,
    syncFNCGENERO,
    getAllFNCGENERO,
    getbyID,
  };
}
