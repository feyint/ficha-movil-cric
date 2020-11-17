import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNBNUCVIV_FNCPERSON} from '../types';

export function useFNBNUCVIV_FNCPERSON() {
  const [listFNBNUCVIV_FNCPERSON, setItem] = useState<FNBNUCVIV_FNCPERSON[]>([]);
  const [itemFNBNUCVIV_FNCPERSON, setFNBNUCVIV_FNCPERSON] = useState<
    FNBNUCVIV_FNCPERSON
  >();
  const [countFNBNUCVIV_FNCPERSON, setCount] = useState<number>(0);
  const [loadingFNBNUCVIV_FNCPERSON, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  function getAllFNBNUCVIV_FNCPERSON() {
    return database.getAllFromEntity('FNBNUCVIV_FNCPERSON').then(setItem);
  }
  function clearAllFNBNUCVIV_FNCPERSON() {
    return database.executeQuery('FNBNUCVIV_FNCPERSON', 'delete from {0}');
  }
  function filterFNBNUCVIV_FNCPERSON(FNBNUCVIVID: number, single = false) {
    let statement = `
     SELECT CODIGO ,* FROM {0} WHERE FNBNUCVIV_ID = ${FNBNUCVIVID}`;
    database.executeQuery('FNBNUCVIV_FNCPERSON', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBNUCVIV_FNCPERSON[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, FNBNUCVIV_ID, FNCPERSON_ID} = row;
        items.push({
          ID,
          FNBNUCVIV_ID,
          FNCPERSON_ID,
        });
      }
      if (single) {
        setFNBNUCVIV_FNCPERSON(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  function getFNBNUCVIV_FNCPERSONbyID(FNBNUCVIV_FNCPERSONID: number) {
    let statement = `
     SELECT * FROM {0} WHERE ID = ${FNBNUCVIV_FNCPERSONID}`;
    database.executeQuery('FNBNUCVIV_FNCPERSON', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBNUCVIV_FNCPERSON[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, FNBNUCVIV_ID, FNCPERSON_ID} = row;
        items.push({
          ID,
          FNBNUCVIV_ID,
          FNCPERSON_ID,
        });
      }
      setFNBNUCVIV_FNCPERSON(items[0]);
    });
  }
  async function createFNBNUCVIV_FNCPERSON(
    item: FNBNUCVIV_FNCPERSON,
  ): Promise<boolean> {
    setLoading(true);
    let statement = `INSERT INTO {0} 
    (FNBNUCVIV_ID, FNCPERSON_ID ) 
    VALUES (?,?);`;
    let params = [item.FNBNUCVIV_ID, item.FNCPERSON_ID];
    return database
      .executeQuery('FNBNUCVIV_FNCPERSON', statement, params)
      .then((results) => {
        console.error('llegaaaa');
        const {insertId} = results;
        getFNBNUCVIV_FNCPERSONbyID(insertId);
        return insertId > 0;
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNBNUCVIV_FNCPERSON').then(setCount);
  }
  function deleteFNBNUCVIV_FNCPERSON(
    itemToDelete: FNBNUCVIV_FNCPERSON,
  ): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNBNUCVIV_FNCPERSON', 'ID', itemToDelete.ID)
        .then(getAllFNBNUCVIV_FNCPERSON);
    }
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNBNUCVIV_FNCPERSON(list: FNBNUCVIV_FNCPERSON) {
    setFNBNUCVIV_FNCPERSON(list);
  }
  async function validateExist(FNBNUCVIV_ID: number, FNCPERSON_ID: number) {
    let statement = `
    SELECT COUNT(*) as total FROM {0}  WHERE
    FNBNUCVIV_ID = ${FNBNUCVIV_ID} AND FNCPERSON_ID = ${FNCPERSON_ID}`;
    return await database
      .executeQuery('FNBNUCVIV_FNCPERSON', statement)
      .then((results) => {
        const count = results.rows.length;
        for (let i = 0; i < count; i++) {
          const row = results.rows.item(i);
          const {total} = row;
          console.error(' total > 0', total > 0);
          return total > 0;
        }
      });
  }
  return {
    itemFNBNUCVIV_FNCPERSON,
    listFNBNUCVIV_FNCPERSON,
    countFNBNUCVIV_FNCPERSON,
    loadingFNBNUCVIV_FNCPERSON,
    validateExist,
    getFNBNUCVIV_FNCPERSONbyID,
    createFNBNUCVIV_FNCPERSON,
    deleteFNBNUCVIV_FNCPERSON,
    selectFNBNUCVIV_FNCPERSON,
    getAllFNBNUCVIV_FNCPERSON,
    filterFNBNUCVIV_FNCPERSON,
  };
}
