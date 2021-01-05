import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNBINFSAL_FNCCONSAL} from '../types';

export function useFNBINFSAL_FNCCONSAL() {
  const [listFNBINFSAL_FNCCONSAL, setlist] = useState<FNBINFSAL_FNCCONSAL[]>(
    [],
  );
  const [itemFNBINFSAL_FNCCONSAL, setFNBINFSAL_FNCCONSAL] = useState<
    FNBINFSAL_FNCCONSAL
  >();
  const [countFNBINFSAL_FNCCONSAL, setCount] = useState<number>(0);
  const [loadingFNBINFSAL_FNCCONSAL, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    // countEntity();
  }, []);
  async function saveAnswer(
    type: 1 | 2,
    answer: any,
    FNBINFSAL_ID: number,
    FNCELESAL_ID: number,
  ): Promise<void> {
    switch (type) {
      case 1: // oneOption
        if (answer) {
          let newItem: FNBINFSAL_FNCCONSAL = {
            FNBINFSAL_ID: FNBINFSAL_ID,
            FNCELESAL_ID: FNCELESAL_ID,
            FNCCONSAL_ID: answer,
          };
          deleteAnswer(newItem.FNBINFSAL_ID, newItem.FNCELESAL_ID);
          createFNBINFSAL_FNCCONSAL(newItem);
        } else {
          deleteAnswer(FNBINFSAL_ID, FNCELESAL_ID);
        }
        break;
      case 2: // multiSelect
        deleteAnswer(FNBINFSAL_ID, FNCELESAL_ID);
        for (let i = 0; i < answer.length; i++) {
          let newItem: FNBINFSAL_FNCCONSAL = {
            FNCELESAL_ID: FNCELESAL_ID,
            FNBINFSAL_ID: FNBINFSAL_ID,
            FNCCONSAL_ID: answer[i],
          };
          createFNBINFSAL_FNCCONSAL(newItem);
        }
        break;
    }
  }

  async function deleteAnswer(
    FNBINFSAL_ID: number,
    FNCELEPER: number,
  ): Promise<void> {
    let statement = `DELETE FROM {0} WHERE FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FNCELEPER}`;
    return await database.executeQuery('FNBINFSAL_FNCCONSAL', statement);
  }
  async function createFNBINFSAL_FNCCONSAL(
    newItem: FNBINFSAL_FNCCONSAL,
  ): Promise<void> {
    let statement = `INSERT INTO {0} 
    (FNBINFSAL_ID, FNCCONSAL_ID, FNCELESAL_ID) 
    VALUES (?, ?, ?);`;
    let params = [
      newItem.FNBINFSAL_ID,
      newItem.FNCCONSAL_ID,
      newItem.FNCELESAL_ID,
    ];
    return await database.executeQuery(
      'FNBINFSAL_FNCCONSAL',
      statement,
      params,
    );
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNBINFSAL_FNCCONSAL').then(setCount);
  }
  async function selectFNBINFSAL_FNCCONSAL(list: FNBINFSAL_FNCCONSAL) {
    setFNBINFSAL_FNCCONSAL(list);
  }
  async function getAnswerquestion(
    FNBINFSAL_ID: number,
    FNCELESAL_ID: number,
    type: 1 | 2 = 1,
  ) {
    let statement = `
    SELECT * FROM {0}  WHERE
    FNBINFSAL_ID = ${FNBINFSAL_ID} AND FNCELESAL_ID = ${FNCELESAL_ID}`;
    return await database
      .executeQuery('FNBINFSAL_FNCCONSAL', statement)
      .then((results) => {
        const count = results.rows.length;
        const items: number[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {FNCCONSAL_ID} = row;
          items.push(FNCCONSAL_ID);
        }
        if (type == 1) {
          return items[0];
        }
        return items;
      });
  }
  return {
    itemFNBINFSAL_FNCCONSAL,
    listFNBINFSAL_FNCCONSAL,
    countFNBINFSAL_FNCCONSAL,
    loadingFNBINFSAL_FNCCONSAL,
    createFNBINFSAL_FNCCONSAL,
    selectFNBINFSAL_FNCCONSAL,
    getAnswerquestion,
    saveAnswer,
  };
}
