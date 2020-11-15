import {useState, useEffect} from 'react';
import {useDatabase} from '../context/DatabaseContext';
import {FNBNUCVIV, FUBUBIVIVDETAILS} from '../types';

export function useFNBNUCVIV() {
  const [listFNBNUCVIV, setItem] = useState<FNBNUCVIV[]>([]);
  const [itemFNBNUCVIV, setFNBNUCVIV] = useState<FNBNUCVIV>();
  const [itemFUBUBIVIVDETAILS, setFUBUBIVIVDETAILS] = useState<
    FUBUBIVIVDETAILS
  >();
  const [countFNBNUCVIV, setCount] = useState<number>(0);
  const [loadingFNBNUCVIV, setLoading] = useState<boolean>(false);
  const database = useDatabase();
  useEffect(() => {
    //clearAllFNBNUCVIV();
    // createFNBNUCVIV({
    //   ID: 1,
    //   FUBUBIVIV_ID: 12,
    //   CODIGO: 'PRUEBA-UNO-1',
    // });
    countEntity();
  }, []);
  function getAllFNBNUCVIV() {
    return database.getAllFromEntity('FNBNUCVIV').then(setItem);
  }
  function clearAllFNBNUCVIV() {
    return database.executeQuery('FNBNUCVIV', 'delete from {0}');
  }
  async function getLastNucleoCode(FUBUBIVIV: number, FUBUBIVIVCODE: string) {
    let NEWCODIGO = '';
    let statement = `
    SELECT * FROM {0} WHERE FUBUBIVIV_ID = ${FUBUBIVIV} ORDER BY ID DESC LIMIT 1;`;
    await database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      console.error(count);
      if (count === 0) {
        NEWCODIGO = FUBUBIVIVCODE + '-' + '1';
      }
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {CODIGO} = row;
        let values = CODIGO.split('-');
        let increment = '' + (parseInt(values[2], 10) + 1);
        NEWCODIGO = FUBUBIVIVCODE + '-' + increment;
      }
    });
    console.error(NEWCODIGO);
    return NEWCODIGO;
  }
  function filterFNBNUCVIV(FUBUBIVIV: number, single = false) {
    let statement = `
     SELECT CODIGO ,* FROM {0} WHERE FUBUBIVIV_ID = ${FUBUBIVIV}`;
    database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBNUCVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {ID, CODIGO, FUBUBIVIV_ID} = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          FUBUBIVIV_ID: FUBUBIVIV_ID,
        });
      }
      if (single) {
        setFNBNUCVIV(items[0]);
      } else {
        setItem(items);
      }
    });
  }
  function getFNBNUCVIVbyID(FNBNUCVIVID: number) {
    let statement = `
     SELECT CODIGO ,* FROM {0} WHERE ID = ${FNBNUCVIVID}`;
    database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FNBNUCVIV[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          CODIGO,
          FUBUBIVIV_ID,
          ACCESO_INTERNET,
          ANIMAL_NOVACUNADO,
          ANIMAL_VACUNADO,
          HUMO_CASA,
          LUGAR_COCINA,
          OBSERVACION,
          HUMO_DENTRO,
          RESIDUO_BOR,
          RESIDUO_PELIGROSO,
          RIESGO,
          TOTAL_ANIMAL,
        } = row;
        items.push({
          ID: ID,
          CODIGO: CODIGO,
          FUBUBIVIV_ID: FUBUBIVIV_ID,
          ACCESO_INTERNET: ACCESO_INTERNET,
          ANIMAL_NOVACUNADO: ANIMAL_NOVACUNADO,
          ANIMAL_VACUNADO: ANIMAL_VACUNADO,
          HUMO_CASA: HUMO_CASA,
          LUGAR_COCINA: LUGAR_COCINA,
          OBSERVACION: OBSERVACION,
          HUMO_DENTRO: HUMO_DENTRO,
          RESIDUO_BOR: RESIDUO_BOR,
          RESIDUO_PELIGROSO: RESIDUO_PELIGROSO,
          RIESGO: RIESGO,
          TOTAL_ANIMAL: TOTAL_ANIMAL,
        });
      }
      setFNBNUCVIV(items[0]);
    });
  }
  function getFUBUBIVIVDETAILS(_FNBNUCVIV: number) {
    let statement = `
    SELECT ff.FUCBARVER_ID , ff.FUCZONCUI_ID,bv.FUCRESGUA_ID, tipregu.FUCTIPTER_ID, tipt.CODIGO as CODIGOTERRITORIO, re.FUCMUNICI_ID, mu.FUCDEPART_ID ,  f.*  FROM FNBNUCVIV f 
    LEFT JOIN FUCZONCUI_FUCBARVER ff  ON ff.ID = f.FUCZONCUI_FUCBARVER_ID 
    LEFT JOIN FUCZONCUI zc ON zc.ID = ff.FUCZONCUI_ID 
    LEFT JOIN FUCBARVER bv ON bv.ID  = ff.FUCBARVER_ID 
    LEFT JOIN FUCRESGUA re ON re.ID = bv.FUCRESGUA_ID 
    LEFT JOIN FUCMUNICI mu ON mu.ID  = re.FUCMUNICI_ID 
    LEFT JOIN FUCTIPTER_FUCRESGUA tipregu ON tipregu.FUCRESGUA_ID =  re.ID 
    LEFT JOIN FUCTIPTER tipt ON tipt.ID  = tipregu.FUCTIPTER_ID 
    LEFT JOIN FUCDEPART dep ON dep.ID = mu.FUCDEPART_ID 
    WHERE f.ID = ${_FNBNUCVIV};`;
    database.executeQuery('FNBNUCVIV', statement).then((results) => {
      const count = results.rows.length;
      const items: FUBUBIVIVDETAILS[] = [];
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {
          ID,
          FUCBARVER_ID,
          FUCZONCUI_ID,
          FUCRESGUA_ID,
          FUCTIPTER_ID,
          FUCMUNICI_ID,
          FUCDEPART_ID,
          CODIGOTERRITORIO,
        } = row;
        items.push({
          ID: ID,
          FUCBARVER_ID: FUCBARVER_ID,
          FUCZONCUI_ID: FUCZONCUI_ID,
          FUCRESGUA_ID: FUCRESGUA_ID,
          FUCTIPTER_ID: FUCTIPTER_ID,
          FUCMUNICI_ID: FUCMUNICI_ID,
          FUCDEPART_ID: FUCDEPART_ID,
          CODIGOTERRITORIO: CODIGOTERRITORIO,
        });
      }
      setFUBUBIVIVDETAILS(items[0]);
    });
  }
  async function createFNBNUCVIV(newItem: FNBNUCVIV): Promise<void> {
    setLoading(true);
    let statement = `INSERT INTO {0} 
    ( CODIGO, 
      HUMO_CASA, 
      RESIDUO_BOR, 
      RESIDUO_PELIGROSO, 
      ANIMAL_VACUNADO, 
      ANIMAL_NOVACUNADO, 
      RIESGO, 
      OBSERVACION, 
      LUGAR_COCINA, 
      HUMO_DENTRO, 
      ACCESO_INTERNET, 
      FUBUBIVIV_ID) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    let params = [
      newItem.CODIGO,
      newItem.HUMO_CASA,
      newItem.RESIDUO_BOR,
      newItem.RESIDUO_PELIGROSO,
      newItem.ANIMAL_VACUNADO,
      newItem.ANIMAL_NOVACUNADO,
      newItem.RIESGO,
      newItem.OBSERVACION,
      newItem.LUGAR_COCINA,
      newItem.HUMO_DENTRO,
      newItem.ACCESO_INTERNET,
      newItem.FUBUBIVIV_ID,
    ];
    return database
      .executeQuery('FNBNUCVIV', statement, params)
      .then((results) => {
        const {insertId} = results;
        getFNBNUCVIVbyID(insertId);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  async function countEntity(): Promise<void> {
    return database.countEntity('FNBNUCVIV').then(setCount);
  }
  function deleteFNBNUCVIV(itemToDelete: FNBNUCVIV): Promise<void> {
    if (itemToDelete !== undefined) {
      return database
        .deleteItem('FNBNUCVIV', 'ID', itemToDelete.ID)
        .then(getAllFNBNUCVIV);
    }
    return Promise.reject(Error('Could not delete an undefined item'));
  }
  async function selectFNBNUCVIV(list: FNBNUCVIV) {
    setFNBNUCVIV(list);
  }
  return {
    itemFUBUBIVIVDETAILS,
    itemFNBNUCVIV,
    listFNBNUCVIV,
    countFNBNUCVIV,
    loadingFNBNUCVIV,
    getLastNucleoCode,
    getFUBUBIVIVDETAILS,
    getFNBNUCVIVbyID,
    createFNBNUCVIV,
    deleteFNBNUCVIV,
    selectFNBNUCVIV,
    getAllFNBNUCVIV,
    filterFNBNUCVIV,
  };
}
