import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNBNUCVIV_FVCCONVIV} from '../types';

export function useFNBNUCVIV_FVCCONVIV() {
  const [listFNBNUCVIV_FVCCONVIV, setlist] = useState<FNBNUCVIV_FVCCONVIV[]>(
    [],
  );
  const [itemFNBNUCVIV_FVCCONVIV, setFNBNUCVIV_FVCCONVIV] = useState<
    FNBNUCVIV_FVCCONVIV
  >();
  const [countFNBNUCVIV_FVCCONVIV, setCount] = useState<number>(0);
  const [loadingFNBNUCVIV_FVCCONVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    countEntity();
  }, []);
  async function saveAnswer(
    type: 1 | 2,
    answer: any,
    FNBNUCVIV_ID: number,
    FVCELEVIV_ID: number,
  ): Promise<void> {
    switch (type) {
      case 1: // oneOption
        if (answer) {
          let newItem: FNBNUCVIV_FVCCONVIV = {
            FVCELEVIV_ID: FVCELEVIV_ID,
            FNBNUCVIV_ID: FNBNUCVIV_ID,
            FVCCONVIV_ID: answer,
          };
          deleteAnswer(newItem.FNBNUCVIV_ID, newItem.FVCELEVIV_ID);
          createFNBNUCVIV_FVCCONVIV(newItem);
        } else {
          deleteAnswer(FNBNUCVIV_ID, FVCELEVIV_ID);
        }
        break;
      case 2: // multiSelect
        deleteAnswer(FNBNUCVIV_ID, FVCELEVIV_ID);
        for (let i = 0; i < answer.length; i++) {
          let newItem: FNBNUCVIV_FVCCONVIV = {
            FVCELEVIV_ID: FVCELEVIV_ID,
            FNBNUCVIV_ID: FNBNUCVIV_ID,
            FVCCONVIV_ID: answer[i],
          };
          createFNBNUCVIV_FVCCONVIV(newItem);
        }
        break;
    }
  }

  async function deleteAnswer(
    FNBNUCVIV_ID: number,
    FVCELEVIV_ID: number,
  ): Promise<void> {
    let statement = `DELETE FROM {0} WHERE FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`;
    return await database.executeQuery('FNBNUCVIV_FVCCONVIV', statement);
  }
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
  async function getAnswerquestion(
    FNBNUCVIV_ID: number,
    FVCELEVIV_ID: number,
    type: 1 | 2 = 1,
  ) {
    let statement = `
    SELECT * FROM {0}  WHERE
    FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FVCELEVIV_ID = ${FVCELEVIV_ID}`;
    return await database
      .executeQuery('FNBNUCVIV_FVCCONVIV', statement)
      .then((results) => {
        const count = results.rows.length;
        const items: number[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {FVCCONVIV_ID} = row;
          items.push(FVCCONVIV_ID);
        }
        if (type == 1) {
          return items[0];
        }
        return items;
      });
  }
  return {
    itemFNBNUCVIV_FVCCONVIV,
    listFNBNUCVIV_FVCCONVIV,
    countFNBNUCVIV_FVCCONVIV,
    loadingFNBNUCVIV_FVCCONVIV,
    createFNBNUCVIV_FVCCONVIV,
    selectFNBNUCVIV_FVCCONVIV,
    getAnswerquestion,
    saveAnswer,
  };
}
