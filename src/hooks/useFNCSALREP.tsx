import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNCSALREP} from '../types';

export function useFNCSALREP() {
  const [listFNCSALREP, setItem] = useState<FNCSALREP[]>([]);
  const [itemFNCSALREP, setFNCSALREP] = useState<FNCSALREP>();
  const [countFNCSALREP, setCount] = useState<number>(0);
  const [loadingFNCSALREP, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {}, []);
  function getAllFNCSALREP() {
    return database.getAllFromEntity('FNCSALREP').then(setItem);
  }
  function getFNCSALREPbyID(
    FNCSALREPID: number,
    _FNCPERSON_ID: any = undefined,
  ) {
    let statement = `
    SELECT * FROM {0} WHERE ID = ${FNCSALREPID}`;
    if (_FNCPERSON_ID) {
      statement = `
        SELECT * FROM {0} WHERE FNCPERSON_ID = ${_FNCPERSON_ID}`;
    }
    return database.executeQuery('FNCSALREP', statement).then((results) => {
      const count = results.rows.length;
      const items: FNCSALREP[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          FNCPERSON_ID,
          EDAD_PRIMERA_REGLA,
          GRAVIDEZ,
          PARIDEZ,
          ABORTO,
          CESAREA,
          NACIDOS_VIVOS,
          NACIDOS_MUERTOS,
          PARTO_ULTIMO,
          ULTIMA_REGLA,
          PARTO_ESTIMADO,
          EDAD_GESTACION,
          PRESENCIA_FAM,
          SEROLOGIA,
          VIH,
          RESUL_CITOLOGIA,
          ACCION_CITOLOGIA,
          RESUL_PROSTATA,
          ACCION_PROSTATA,
          ESTADO,
        } = row;
        items.push({
          ID,
          FNCPERSON_ID,
          EDAD_PRIMERA_REGLA,
          GRAVIDEZ,
          PARIDEZ,
          ABORTO,
          CESAREA,
          NACIDOS_VIVOS,
          NACIDOS_MUERTOS,
          PARTO_ULTIMO,
          ULTIMA_REGLA,
          PARTO_ESTIMADO,
          EDAD_GESTACION,
          PRESENCIA_FAM,
          SEROLOGIA,
          VIH,
          RESUL_CITOLOGIA,
          ACCION_CITOLOGIA,
          RESUL_PROSTATA,
          ACCION_PROSTATA,
          ESTADO,
        });
      }
      setFNCSALREP(items[0]);
      return items[0];
    });
  }
  async function createFNCSALREP(item: FNCSALREP) {
    setLoading(true);
    let statement = `INSERT INTO {0} 
            (FNCPERSON_ID) 
            VALUES ('${item.FNCPERSON_ID}');`;
    return await database
      .executeQuery('FNCSALREP', statement)
      .then(async (results) => {
        const {insertId} = results;
        return await getFNCSALREPbyID(insertId);
      })
      .catch((err) => {
        console.error('error createFNCSALREP');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function updateFNCSALREP(item: FNCSALREP) {
    setLoading(true);
    let statement = `UPDATE {0}  SET
    ABORTO=${item.ABORTO ? item.ABORTO : null}, 
    ACCION_CITOLOGIA=${item.ACCION_CITOLOGIA ? item.ACCION_CITOLOGIA : null}, 
    ACCION_PROSTATA=${item.ACCION_PROSTATA ? item.ACCION_PROSTATA : null}, 
    CESAREA=${item.CESAREA ? item.CESAREA : null},
    EDAD_GESTACION='${item.EDAD_GESTACION ? item.EDAD_GESTACION : ''}',
    EDAD_PRIMERA_REGLA=${
      item.EDAD_PRIMERA_REGLA ? item.EDAD_PRIMERA_REGLA : null
    },
    GRAVIDEZ=${item.GRAVIDEZ ? item.GRAVIDEZ : null},
    NACIDOS_MUERTOS=${item.NACIDOS_MUERTOS ? item.NACIDOS_MUERTOS : null},
    NACIDOS_VIVOS=${item.NACIDOS_VIVOS ? item.NACIDOS_VIVOS : null},
    PARIDEZ=${item.PARIDEZ ? item.PARIDEZ : null},
    PARTO_ESTIMADO='${item.PARTO_ESTIMADO ? item.PARTO_ESTIMADO : ''}',
    PARTO_ULTIMO='${item.PARTO_ULTIMO ? item.PARTO_ULTIMO : ''}',
    ULTIMA_REGLA='${item.ULTIMA_REGLA ? item.ULTIMA_REGLA : ''}',
    PRESENCIA_FAM=${item.PRESENCIA_FAM ? (item.PRESENCIA_FAM ? 1 : 0) : null},
    RESUL_CITOLOGIA='${item.RESUL_CITOLOGIA ? item.RESUL_CITOLOGIA : ''}',
    RESUL_PROSTATA='${item.RESUL_PROSTATA ? item.RESUL_PROSTATA : ''}',
    SEROLOGIA=${item.SEROLOGIA ? (item.SEROLOGIA ? 1 : 0) : null},
    VIH=${item.VIH ? (item.VIH ? 1 : 0) : null},
    ESTADO=${item.ESTADO ? item.ESTADO : 0}
    WHERE ID = ${item.ID}`;
    return await database
      .executeQuery('FNCSALREP', statement)
      .then(async (results) => {
        return await getFNCSALREPbyID(item.ID);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNCSALREP').then(setCount);
  }
  function deleteFNCSALREP(itemToDelete: FNCSALREP): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNCSALREP', 'ID', itemToDelete.ID)
        .then(getAllFNCSALREP);
    }
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNCSALREP(list: FNCSALREP) {
    setFNCSALREP(list);
  }
  return {
    itemFNCSALREP,
    listFNCSALREP,
    countFNCSALREP,
    loadingFNCSALREP,
    getFNCSALREPbyID,
    createFNCSALREP,
    deleteFNCSALREP,
    selectFNCSALREP,
    getAllFNCSALREP,
    updateFNCSALREP,
  };
}
