import { useState, useEffect } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { FNCPERSON, FUBUBIVIVDETAILS } from '../types';

export function useFNCPERSON() {
    const [listFNCPERSON, setItem] = useState<FNCPERSON[]>([]);
    const [itemFNCPERSON, setFNCPERSON] = useState<FNCPERSON>();
    const [itemFUBUBIVIVDETAILS, setFUBUBIVIVDETAILS] = useState<
        FUBUBIVIVDETAILS
    >();
    const [countFNCPERSON, setCount] = useState<number>(0);
    const [loadingFNCPERSON, setLoading] = useState<boolean>(false);
    const database = useDatabase();
    useEffect(() => {
        //clearAllFNCPERSON();
        // createFNCPERSON({
        //   ID: 1,
        //   FUBUBIVIV_ID: 12,
        //   CODIGO: 'PRUEBA-UNO-1',
        // });
        countEntity();
    }, []);
    function getAllFNCPERSON() {
        return database.getAllFromEntity('FNCPERSON').then(setItem);
    }
    function clearAllFNCPERSON() {
        return database.executeQuery('FNCPERSON', 'delete from {0}');
    }
    function filterFNCPERSON(FUBUBIVIV: number, single = false) {
        let statement = `
     SELECT CODIGO ,* FROM {0} WHERE FUBUBIVIV_ID = ${FUBUBIVIV}`;
        database.executeQuery('FNCPERSON', statement).then((results) => {
            const count = results.rows.length;
            const items: FNCPERSON[] = [];
            for (let i = 0; i < count; i++) {
                const row = results.rows.item(i);
                const { ID, CODIGO, FUBUBIVIV_ID } = row;
                items.push({
                    ID: ID,
                    CODIGO: CODIGO,
                    FUBUBIVIV_ID: FUBUBIVIV_ID,
                });
            }
            if (single) {
                setFNCPERSON(items[0]);
            } else {
                setItem(items);
            }
        });
    }
    function getFNCPERSONbyID(FNCPERSONID: number) {
        let statement = `
     SELECT * FROM {0} WHERE ID = ${FNCPERSONID}`;
        database.executeQuery('FNCPERSON', statement).then((results) => {
            const count = results.rows.length;
            const items: FNCPERSON[] = [];
            for (let i = 0; i < count; i++) {
                const row = results.rows.item(i);
                const {
                    ID,
                    CODIGO,
                    IDENTIFICACION,
                    PRIMER_NOMBRE,
                    SEGUNDO_NOMBRE,
                    PRIMER_APELLIDO,
                    SEGUNDO_APELLIDO,
                    FECHA_NACIMIENTO,
                    TEL_CELULAR,
                    TEL_ALTERNO,
                    CORREO_ELECTRONICO,
                    FNCTIPIDE_ID,
                    FNCORGANI_ID,
                    FNCLUNIND_ID,
                    FNCOCUPAC_ID,
                    FUCMUNICI_ID,
                    FNCPAREN_ID,
                    FNCGENERO_ID,
                } = row;
                items.push({
                    ID,
                    CODIGO,
                    IDENTIFICACION,
                    PRIMER_NOMBRE,
                    SEGUNDO_NOMBRE,
                    PRIMER_APELLIDO,
                    SEGUNDO_APELLIDO,
                    FECHA_NACIMIENTO,
                    TEL_CELULAR,
                    TEL_ALTERNO,
                    CORREO_ELECTRONICO,
                    FNCTIPIDE_ID,
                    FNCORGANI_ID,
                    FNCLUNIND_ID,
                    FNCOCUPAC_ID,
                    FUCMUNICI_ID,
                    FNCPAREN_ID,
                    FNCGENERO_ID,
                });
            }
            setFNCPERSON(items[0]);
        });
    }
    async function createFNCPERSON(item: FNCPERSON): Promise<void> {
        setLoading(true);
        let statement = `INSERT INTO {0} 
    ( CODIGO, 
      IDENTIFICACION, 
      PRIMER_NOMBRE, 
      SEGUNDO_NOMBRE, 
      PRIMER_APELLIDO, 
      SEGUNDO_APELLIDO, 
      FECHA_NACIMIENTO, 
      TEL_CELULAR, 
      TEL_ALTERNO, 
      CORREO_ELECTRONICO,
      FNCTIPIDE_ID, 
      FNCORGANI_ID, 
      FNCLUNIND_ID, 
      FNCOCUPAC_ID, 
      FUCMUNICI_ID,
      FNCPAREN_ID, 
      FNCGENERO_ID) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
        let params = [
            item.CODIGO,
            item.IDENTIFICACION,
            item.PRIMER_NOMBRE,
            item.SEGUNDO_NOMBRE,
            item.PRIMER_APELLIDO,
            item.SEGUNDO_APELLIDO,
            item.FECHA_NACIMIENTO,
            item.TEL_CELULAR,
            item.TEL_ALTERNO,
            item.CORREO_ELECTRONICO,
            item.FNCTIPIDE_ID,
            item.FNCORGANI_ID,
            item.FNCLUNIND_ID,
            item.FNCOCUPAC_ID,
            item.FUCMUNICI_ID,
            item.FNCPAREN_ID,
            item.FNCGENERO_ID,
        ];
        return database
            .executeQuery('FNCPERSON', statement, params)
            .then((results) => {
                const { insertId } = results;
                getFNCPERSONbyID(insertId);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    async function updateFNCPERSON(item: FNCPERSON): Promise<void> {
        setLoading(true);
        let statement = `UPDATE {0}  SET
    CODIGO=?, 
    IDENTIFICACION=?, 
    PRIMER_NOMBRE=?, 
    SEGUNDO_NOMBRE=?, 
    PRIMER_APELLIDO=?, 
    SEGUNDO_APELLIDO=?, 
    FECHA_NACIMIENTO=?, 
    TEL_CELULAR=?, 
    TEL_ALTERNO=?, 
    CORREO_ELECTRONICO=?,
    FNCTIPIDE_ID=?, 
    FNCORGANI_ID=?, 
    FNCLUNIND_ID=?, 
    FNCOCUPAC_ID=?, 
    FUCMUNICI_ID=?,
    FNCPAREN_ID=?, 
    FNCGENERO_ID
    WHERE ID = ${item.ID}`;
        let params = [
            item.CODIGO,
            item.IDENTIFICACION,
            item.PRIMER_NOMBRE,
            item.SEGUNDO_NOMBRE,
            item.PRIMER_APELLIDO,
            item.SEGUNDO_APELLIDO,
            item.FECHA_NACIMIENTO,
            item.TEL_CELULAR,
            item.TEL_ALTERNO,
            item.CORREO_ELECTRONICO,
            item.FNCTIPIDE_ID,
            item.FNCORGANI_ID,
            item.FNCLUNIND_ID,
            item.FNCOCUPAC_ID,
            item.FUCMUNICI_ID,
            item.FNCPAREN_ID,
            item.FNCGENERO_ID,
        ];
        return await database
            .executeQuery('FNCPERSON', statement, params)
            .then((results) => {
                getFNCPERSONbyID(item.ID);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    async function countEntity(): Promise<void> {
        return database.countEntity('FNCPERSON').then(setCount);
    }
    function deleteFNCPERSON(itemToDelete: FNCPERSON): Promise<void> {
        if (itemToDelete !== undefined) {
            return database
                .deleteItem('FNCPERSON', 'ID', itemToDelete.ID)
                .then(getAllFNCPERSON);
        }
        return Promise.reject(Error('Could not delete an undefined item'));
    }
    async function selectFNCPERSON(list: FNCPERSON) {
        setFNCPERSON(list);
    }
    return {
        itemFUBUBIVIVDETAILS,
        itemFNCPERSON,
        listFNCPERSON,
        countFNCPERSON,
        loadingFNCPERSON,
        getFNCPERSONbyID,
        createFNCPERSON,
        deleteFNCPERSON,
        selectFNCPERSON,
        getAllFNCPERSON,
        filterFNCPERSON,
        updateFNCPERSON,
    };
}
