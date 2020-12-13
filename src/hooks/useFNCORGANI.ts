import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FNCORGANI} from '../types';

export function useFNCORGANI() {
  const [listFNCORGANI, setlist] = useState<FNCORGANI[]>([]);
  const [itemFNCORGANI, setFNCORGANI] = useState<FNCORGANI>();
  const [countFNCORGANI, setCount] = useState<number>(0);
  const [loadingFNCORGANI, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  function getAllFNCORGANI() {
    return database.getAllFromEntity('FNCORGANI').then(setlist);
  }
  async function createFNCORGANI(newItem: FNCORGANI): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, CODIGO, NOMBRE, ESTADO, FNCREGION_ID) 
    VALUES (?, ?, ?, ?, ?);`;
    let params = [
      newItem.ID,
      newItem.CODIGO,
      newItem.NOMBRE,
      newItem.ESTADO,
      newItem.FNCREGION_ID,
    ];
    try {
      return await database.executeQuery('FNCORGANI', statement, params);
    } catch (error) {}
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCORGANI').then(setCount);
  }
  function deleteFNCORGANI(itemToDelete: FNCORGANI): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCORGANI', 'ID', itemToDelete.ID)
        .then(getAllFNCORGANI);
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCORGANI(list: FNCORGANI) {
    setFNCORGANI(list);
  }
  async function syncFNCORGANI() {
    setLoading(true);
    let service = new SyncCatalogService();
    let result = await service.getEntity('FNCORGANI');
    result.data.map(async (item: any) => {
      await createFNCORGANI({
        ID: item.id,
        CODIGO: item.codigo,
        NOMBRE: item.nombre,
        ESTADO: item.estado,
        FNCREGION_ID: item.fncregion.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFNCORGANI,
    listFNCORGANI,
    countFNCORGANI,
    loadingFNCORGANI,
    createFNCORGANI,
    deleteFNCORGANI,
    selectFNCORGANI,
    syncFNCORGANI,
    getAllFNCORGANI,
  };
}
