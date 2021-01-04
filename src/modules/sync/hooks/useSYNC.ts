import {FnbnucvivSync} from './../models/FnbnucvivSync';
import {FUBUBIVIV} from './../../../types/FUBUBIVIV';
import {FububivivSync} from './../models/FububivivSync';
import {FububivivListSync} from './../models/FububivivListSync';
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useDatabase} from '../../../context/DatabaseContext';
import {FNBNUCVIV} from '../../../types';
export function useSYNC() {
  const [countFububivivToSync, setCountFububivivToSync] = useState<number>(0);
  const [countFnbnucvivToSync, setCountFnbnucvivToSync] = useState<number>(0);
  const [
    countFnbnucvivFvcconvivToSync,
    setCountFnbnucvivFvcconvivToSync,
  ] = useState<number>(0);
  const [
    countFnbnucvivFncpersonToSync,
    setCountFnbnucvivFncpersonToSync,
  ] = useState<number>(0);
  const [countFncpersonToSync, setCountFncpersonToSync] = useState<number>(0);
  const [
    countFnbinfsalsonToSync,
    setCountFnbinfsalsonToSync,
  ] = useState<number>(0);
  const database = useDatabase();
  useEffect(() => {}, []);
  async function getCountForEntinty(entity: string, setValue: any) {
    let count = 0;
    let statement = 'SELECT COUNT(*) as total FROM {0} WHERE WEB_ID IS NULL;';
    await database.executeQuery(entity, statement).then((results) => {
      for (let i = 0; i < results.rows.length; i++) {
        const row = results.rows.item(i);
        const {total} = row;
        count += total;
      }
    });
    setValue(count);
  }
  async function getAllCountForSync() {
    await getCountForEntinty('FUBUBIVIV', setCountFububivivToSync);
    await getCountForEntinty('FNBNUCVIV', setCountFnbnucvivToSync);
    await getCountForEntinty(
      'FNBNUCVIV_FVCCONVIV',
      setCountFnbnucvivFvcconvivToSync,
    );
    await getCountForEntinty(
      'FNBNUCVIV_FNCPERSON',
      setCountFnbnucvivFncpersonToSync,
    );
    await getCountForEntinty('FNCPERSON', setCountFncpersonToSync);
    await getCountForEntinty('FNBINFSAL', setCountFnbinfsalsonToSync);
  }
  function resetSync() {
    setCountFububivivToSync(0);
    setCountFnbnucvivToSync(0);
    setCountFnbnucvivFvcconvivToSync(0);
    setCountFnbnucvivFncpersonToSync(0);
    setCountFncpersonToSync(0);
    setCountFnbinfsalsonToSync(0);
  }
  async function getObjectToSync(): Promise<FububivivListSync> {
    const MAX_OBJECTS_TO_SYNC = 2;
    const fububivivListSync: FububivivListSync = new FububivivListSync();
    let statement = `SELECT * FROM {0} WHERE WEB_ID IS NULL;`;
    const results = await database.executeQuery('FUBUBIVIV', statement);
    for (let i = 0; i < results.rows.length && i < MAX_OBJECTS_TO_SYNC; i++) {
      const row: FUBUBIVIV = results.rows.item(i);
      const fububivivSync: FububivivSync = FububivivSync.fromModel(row);

      /*let subStatement = `SELECT * FROM {0} WHERE WEB_ID IS NULL AND FUBUBIVIV_ID = ${row.ID};`;
      const subResults = await database.executeQuery('FNBNUCVIV', subStatement);

      for (
        let j = 0;
        j < subResults.rows.length && j < MAX_OBJECTS_TO_SYNC;
        i++
      ) {
        const subRow: FNBNUCVIV = results.rows.item(j);
        const fnbnucvivSync: FnbnucvivSync = FnbnucvivSync.fromModel(subRow);
        fububivivSync.fnbnucvivSync.push(fnbnucvivSync);
      }*/
      fububivivListSync.fububivivSync.push(fububivivSync);
    }
    return fububivivListSync;
  }
  return {
    countFububivivToSync,
    countFnbnucvivToSync,
    countFnbnucvivFvcconvivToSync,
    countFnbnucvivFncpersonToSync,
    countFncpersonToSync,
    countFnbinfsalsonToSync,
    getAllCountForSync,
    getObjectToSync,
    resetSync,
  };
}
