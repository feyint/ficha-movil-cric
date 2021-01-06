import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {SyncCatalogService} from '../services';
import {FUCTIPTER_FUCRESGUA} from '../types';

export function useFUCTIPTER_FUCRESGUA() {
  const [listFUCTIPTER_FUCRESGUA, setItem] = useState<FUCTIPTER_FUCRESGUA[]>(
    [],
  );
  const [itemFUCTIPTER_FUCRESGUA, setFUCTIPTER_FUCRESGUA] = useState<
    FUCTIPTER_FUCRESGUA
  >();
  const [countFUCTIPTER_FUCRESGUA, setCount] = useState<number>(0);
  const [loadingFUCTIPTER_FUCRESGUA, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
    createFUCTIPTER_FUCRESGUA({
      ID: 1,
      FUCRESGUA_ID: 1925,
      FUCTIPTER_ID: 2,
    });
    createFUCTIPTER_FUCRESGUA({
      ID: 2,
      FUCRESGUA_ID: 1926,
      FUCTIPTER_ID: 2,
    });
    createFUCTIPTER_FUCRESGUA({
      ID: 3,
      FUCRESGUA_ID: 1927,
      FUCTIPTER_ID: 2,
    });
  }, []);
  function getAllFUCTIPTER_FUCRESGUA() {
    return database.getAllFromEntity('FUCTIPTER_FUCRESGUA').then(setItem);
  }
  async function createFUCTIPTER_FUCRESGUA(
    newItem: FUCTIPTER_FUCRESGUA,
  ): Promise<void> {
    let statement = `INSERT INTO {0} 
    (ID, FUCRESGUA_ID, FUCTIPTER_ID) 
    VALUES (?, ?, ?);`;
    let params = [newItem.ID, newItem.FUCRESGUA_ID, newItem.FUCTIPTER_ID];
    return await database.executeQuery(
      'FUCTIPTER_FUCRESGUA',
      statement,
      params,
    );
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FUCTIPTER_FUCRESGUA').then(setCount);
  }

  async function syncFUCTIPTER_FUCRESGUA() {
    setLoading(true);
    await database.clearEntity('FUCTIPTER_FUCRESGUA');
    let service = new SyncCatalogService();
    let result = await service.getEntity('FUCTIPTER_FUCRESGUA');
    result.data.map((item: any) => {
      createFUCTIPTER_FUCRESGUA({
        ID: item.id,
        FUCRESGUA_ID: item.fucresguaId.id,
        FUCTIPTER_ID: item.fuctiperId.id,
      });
    });
    setLoading(false);
    countEntity();
  }
  return {
    itemFUCTIPTER_FUCRESGUA,
    listFUCTIPTER_FUCRESGUA,
    countFUCTIPTER_FUCRESGUA,
    loadingFUCTIPTER_FUCRESGUA,
    createFUCTIPTER_FUCRESGUA,
    syncFUCTIPTER_FUCRESGUA,
    getAllFUCTIPTER_FUCRESGUA,
  };
}
