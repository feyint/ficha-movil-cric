import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNCSALREP_FNCCONREP} from '../types';

export function useFNCSALREP_FNCCONREP() {
  const [listFNCSALREP_FNCCONREP, setlist] = useState<FNCSALREP_FNCCONREP[]>(
    [],
  );
  const [itemFNCSALREP_FNCCONREP, setFNCSALREP_FNCCONREP] = useState<
    FNCSALREP_FNCCONREP
  >();
  const [countFNCSALREP_FNCCONREP, setCount] = useState<number>(0);
  const [loadingFNCSALREP_FNCCONREP, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    // countEntity();
  }, []);
  async function saveAnswer(
    type: 1 | 2,
    answer: any,
    FNCSALREP_ID: number,
    FNCELEREP_ID: number,
  ): Promise<void> {
    switch (type) {
      case 1: // oneOption
        if (answer) {
          let newItem: FNCSALREP_FNCCONREP = {
            FNCSALREP_ID: FNCSALREP_ID,
            FNCELEREP_ID: FNCELEREP_ID,
            FNCCONREP_ID: answer,
          };
          deleteAnswer(newItem.FNCSALREP_ID, newItem.FNCELEREP_ID);
          createFNCSALREP_FNCCONREP(newItem);
        } else {
          deleteAnswer(FNCSALREP_ID, FNCELEREP_ID);
        }
        break;
      case 2: // multiSelect
        deleteAnswer(FNCSALREP_ID, FNCELEREP_ID);
        for (let i = 0; i < answer.length; i++) {
          let newItem: FNCSALREP_FNCCONREP = {
            FNCELEREP_ID: FNCELEREP_ID,
            FNCSALREP_ID: FNCSALREP_ID,
            FNCCONREP_ID: answer[i],
          };
          createFNCSALREP_FNCCONREP(newItem);
        }
        break;
    }
  }

  async function deleteAnswer(
    FNCSALREP_ID: number,
    FNCELEPER: number,
  ): Promise<void> {
    let statement = `DELETE FROM {0} WHERE FNCSALREP_ID = ${FNCSALREP_ID} AND FNCELEREP_ID = ${FNCELEPER}`;
    return await database.executeQuery('FNCSALREP_FNCCONREP', statement);
  }
  async function createFNCSALREP_FNCCONREP(
    newItem: FNCSALREP_FNCCONREP,
  ): Promise<void> {
    let statement = `INSERT INTO {0} 
    (FNCSALREP_ID, FNCCONREP_ID, FNCELEREP_ID) 
    VALUES (?, ?, ?);`;
    let params = [
      newItem.FNCSALREP_ID,
      newItem.FNCCONREP_ID,
      newItem.FNCELEREP_ID,
    ];
    return await database.executeQuery(
      'FNCSALREP_FNCCONREP',
      statement,
      params,
    );
  }
  async function selectFNCSALREP_FNCCONREP(list: FNCSALREP_FNCCONREP) {
    setFNCSALREP_FNCCONREP(list);
  }
  async function getAnswerquestion(
    FNCSALREP_ID: number,
    FNCELEREP_ID: number,
    type: 1 | 2 = 1,
  ) {
    let statement = `
    SELECT * FROM {0}  WHERE
    FNCSALREP_ID = ${FNCSALREP_ID} AND FNCELEREP_ID = ${FNCELEREP_ID}`;
    return await database
      .executeQuery('FNCSALREP_FNCCONREP', statement)
      .then((results) => {
        const count = results.rows.length;
        const items: number[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {FNCCONREP_ID} = row;
          items.push(FNCCONREP_ID);
        }
        if (type == 1) {
          return items[0];
        }
        return items;
      });
  }
  return {
    itemFNCSALREP_FNCCONREP,
    listFNCSALREP_FNCCONREP,
    countFNCSALREP_FNCCONREP,
    loadingFNCSALREP_FNCCONREP,
    createFNCSALREP_FNCCONREP,
    selectFNCSALREP_FNCCONREP,
    getAnswerquestion,
    saveAnswer,
  };
}
