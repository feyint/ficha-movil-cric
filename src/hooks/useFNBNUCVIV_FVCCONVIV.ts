import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNBNUCVIV_FVCCONVIV} from '../types';

export function useFNBNUCVIV_FVCCONVIV() {
  const [listFNBNUCVIV_FVCCONVIV, setlist] = useState<FNBNUCVIV_FVCCONVIV[]>([]);
  const [itemFNBNUCVIV_FVCCONVIV, setFNBNUCVIV_FVCCONVIV] = useState<
    FNBNUCVIV_FVCCONVIV
  >();
  const [countFNBNUCVIV_FVCCONVIV, setCount] = useState<number>(0);
  const [loadingFNBNUCVIV_FVCCONVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  async function createFNBNUCVIV_FVCCONVIV(
    newItem: FNBNUCVIV_FVCCONVIV,
  ): Promise<void> {
    let statement = `INSERT INTO {0} 
    (FNBNUCVIV_ID, FVCCONVIV_ID, FVCELEVIV_ID) 
    VALUES (?, ?, ?);`;
    let params = [
      newItem.FNBNUCVIV_ID,
      newItem.FVCCONVIV_ID,
      newItem.FVCELEVIV_ID,
    ];
    return await database
      .executeQuery('FNBNUCVIV_FVCCONVIV', statement, params)
      .then(countEntity);
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNBNUCVIV_FVCCONVIV').then(setCount);
  }
  async function selectFNBNUCVIV_FVCCONVIV(list: FNBNUCVIV_FVCCONVIV) {
    setFNBNUCVIV_FVCCONVIV(list);
  }
  function getQuestionsOptions(FVCELEVIV: number) {
    let statement = `
    SELECT * FROM {0}  WHERE FVCELEVIV_ID  = ${FVCELEVIV}`;
    database.executeQuery('FNBNUCVIV_FVCCONVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBNUCVIV_FVCCONVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, FNBNUCVIV_ID, FVCCONVIV_ID, FVCELEVIV_ID} = row;
        items.push({
          ID: ID,
          FNBNUCVIV_ID: FNBNUCVIV_ID,
          FVCCONVIV_ID: FVCCONVIV_ID,
          FVCELEVIV_ID: FVCELEVIV_ID,
        });
      }
      setlist(items);
    });
  }
  return {
    itemFNBNUCVIV_FVCCONVIV,
    listFNBNUCVIV_FVCCONVIV,
    countFNBNUCVIV_FVCCONVIV,
    loadingFNBNUCVIV_FVCCONVIV,
    createFNBNUCVIV_FVCCONVIV,
    selectFNBNUCVIV_FVCCONVIV,
    getQuestionsOptions,
  };
}
