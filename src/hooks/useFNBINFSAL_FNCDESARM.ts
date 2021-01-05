import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNBINFSAL_FNCDESARM} from '../types';

export function useFNBINFSAL_FNCDESARM() {
  const [listFNBINFSAL_FNCDESARM, setlist] = useState<FNBINFSAL_FNCDESARM[]>(
    [],
  );
  const [itemFNBINFSAL_FNCDESARM, setFNBINFSAL_FNCDESARM] = useState<
    FNBINFSAL_FNCDESARM
  >();
  const [countFNBINFSAL_FNCDESARM, setCount] = useState<number>(0);
  const [loadingFNBINFSAL_FNCDESARM, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    // countEntity();
  }, []);
  async function saveAnswerDESARM(
    answer: any,
    FNBINFSAL_ID: number,
  ): Promise<void> {
    deleteAnswer(FNBINFSAL_ID);
    for (let i = 0; i < answer.length; i++) {
      let newItem: FNBINFSAL_FNCDESARM = {
        FNBINFSAL_ID: FNBINFSAL_ID,
        FNCDESARM_ID: answer[i],
      };
      createFNBINFSAL_FNCDESARM(newItem);
    }
  }

  async function deleteAnswer(FNBINFSAL_ID: number): Promise<void> {
    let statement = `DELETE FROM {0} WHERE FNBINFSAL_ID = ${FNBINFSAL_ID}`;
    return await database.executeQuery('FNBINFSAL_FNCDESARM', statement);
  }
  async function createFNBINFSAL_FNCDESARM(
    newItem: FNBINFSAL_FNCDESARM,
  ): Promise<any> {
    let statement = `INSERT INTO {0} 
    (FNBINFSAL_ID, FNCDESARM_ID ) 
    VALUES (?, ?);`;
    let params = [newItem.FNBINFSAL_ID, newItem.FNCDESARM_ID];
    return await database.executeQuery(
      'FNBINFSAL_FNCDESARM',
      statement,
      params,
    );
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNBINFSAL_FNCDESARM').then(setCount);
  }
  async function selectFNBINFSAL_FNCDESARM(list: FNBINFSAL_FNCDESARM) {
    setFNBINFSAL_FNCDESARM(list);
  }
  async function getAnswerquestionDESARM(FNBINFSAL_ID: number) {
    let statement = `
    SELECT * FROM {0}  WHERE
    FNBINFSAL_ID = ${FNBINFSAL_ID}`;
    return await database
      .executeQuery('FNBINFSAL_FNCDESARM', statement)
      .then((results) => {
        const count = results.rows.length;
        const items: number[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {FNCDESARM_ID} = row;
          items.push(FNCDESARM_ID);
        }
        return items;
      });
  }
  return {
    itemFNBINFSAL_FNCDESARM,
    listFNBINFSAL_FNCDESARM,
    countFNBINFSAL_FNCDESARM,
    loadingFNBINFSAL_FNCDESARM,
    createFNBINFSAL_FNCDESARM,
    selectFNBINFSAL_FNCDESARM,
    getAnswerquestionDESARM,
    saveAnswerDESARM,
  };
}
