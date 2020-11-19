import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNCPERSON_FNCCONPER} from '../types';

export function useFNCPERSON_FNCCONPER() {
  const [listFNCPERSON_FNCCONPER, setlist] = useState<FNCPERSON_FNCCONPER[]>(
    [],
  );
  const [itemFNCPERSON_FNCCONPER, setFNCPERSON_FNCCONPER] = useState<
    FNCPERSON_FNCCONPER
  >();
  const [countFNCPERSON_FNCCONPER, setCount] = useState<number>(0);
  const [loadingFNCPERSON_FNCCONPER, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    // countEntity();
  }, []);
  async function saveAnswer(
    type: 1 | 2,
    answer: any,
    FNCPERSON_ID: number,
    FNCELEPER_ID: number,
  ): Promise<void> {
    switch (type) {
      case 1: // oneOption
        if (answer) {
          let newItem: FNCPERSON_FNCCONPER = {
            FNCPERSON_ID: FNCPERSON_ID,
            FNCELEPER_ID: FNCELEPER_ID,
            FNCCONPER_ID: answer,
          };
          deleteAnswer(newItem.FNCPERSON_ID, newItem.FNCELEPER_ID);
          createFNCPERSON_FNCCONPER(newItem);
        } else {
          deleteAnswer(FNCPERSON_ID, FNCELEPER_ID);
        }
        break;
      case 2: // multiSelect
        deleteAnswer(FNCPERSON_ID, FNCELEPER_ID);
        for (let i = 0; i < answer.length; i++) {
          let newItem: FNCPERSON_FNCCONPER = {
            FNCELEPER_ID: FNCELEPER_ID,
            FNCPERSON_ID: FNCPERSON_ID,
            FNCCONPER_ID: answer[i],
          };
          createFNCPERSON_FNCCONPER(newItem);
        }
        break;
    }
  }

  async function deleteAnswer(
    FNCPERSON_ID: number,
    FNCELEPER: number,
  ): Promise<void> {
    let statement = `DELETE FROM {0} WHERE FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER}`;
    return await database.executeQuery('FNCPERSON_FNCCONPER', statement);
  }
  async function createFNCPERSON_FNCCONPER(
    newItem: FNCPERSON_FNCCONPER,
  ): Promise<void> {
    let statement = `INSERT INTO {0} 
    (FNCPERSON_ID, FNCCONPER_ID, FNCELEPER_ID) 
    VALUES (?, ?, ?);`;
    let params = [
      newItem.FNCPERSON_ID,
      newItem.FNCCONPER_ID,
      newItem.FNCELEPER_ID,
    ];
    return await database.executeQuery(
      'FNCPERSON_FNCCONPER',
      statement,
      params,
    );
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCPERSON_FNCCONPER').then(setCount);
  }
  async function selectFNCPERSON_FNCCONPER(list: FNCPERSON_FNCCONPER) {
    setFNCPERSON_FNCCONPER(list);
  }
  async function getAnswerquestion(
    FNCPERSON_ID: number,
    FNCELEPER_ID: number,
    type: 1 | 2 = 1,
  ) {
    let statement = `
    SELECT * FROM {0}  WHERE
    FNCPERSON_ID = ${FNCPERSON_ID} AND FNCELEPER_ID = ${FNCELEPER_ID}`;
    return await database
      .executeQuery('FNCPERSON_FNCCONPER', statement)
      .then((results) => {
        const count = results.rows.length;
        const items: number[] = [];
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {FNCCONPER_ID} = row;
          items.push(FNCCONPER_ID);
        }
        if (type == 1) {
          return items[0];
        }
        return items;
      });
  }
  return {
    itemFNCPERSON_FNCCONPER,
    listFNCPERSON_FNCCONPER,
    countFNCPERSON_FNCCONPER,
    loadingFNCPERSON_FNCCONPER,
    createFNCPERSON_FNCCONPER,
    selectFNCPERSON_FNCCONPER,
    getAnswerquestion,
    saveAnswer,
  };
}
