/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {useDatabase} from '../../../context/DatabaseContext';
import {FUBUBIVIV} from '../../../types';
export function useSYNC() {
  const [listFUBUBIVIV, setItem] = useState<FUBUBIVIV[]>([]);
  const [countToSync, setcountToSync] = useState<number>();
  const database = useDatabase();
  useEffect(() => {}, []);
  //TODO primero obtener los id locales , luego empezar a recorrer 1 * 1
  // obtener el objeto final , enviar y si si actualizar y cojer el siguiente id
  async function getAllforSync() {
    let count = 0;
    let statement = 'SELECT COUNT(*) as total FROM FUBUBIVIV WHERE ESTADO = 0;';
    await database.executeQuery('FUBUBIVIV', statement).then((results) => {
      for (let i = 0; i < count; i++) {
        const row = results.rows.item(i);
        const {total} = row;
        count = total;
      }
    });
    setcountToSync(count);
    return count;
  }
  return {
    countToSync,
    getAllforSync,
  };
}
