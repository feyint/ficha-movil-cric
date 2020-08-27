
import { Catalog } from "./types";
import { allCatalogs } from "../../../providers/DataBaseProvider";

export const ActionType = {
    SET_CATALOGS: 'SET_CATALOGS',
};

const setDataCatalogs = (data: Catalog[]) => {
    return { type: ActionType.SET_CATALOGS, data };
};

export const fetchCatalogs = () => (dispatch: any) => {
    let loadedCatalogs: Catalog[] = [];
    allCatalogs().then((response: any) => {
        for (const cat of response) {
            let catalog: Catalog = {
                ID: cat.ID,
                CODIGO: cat.CODIGO,
                NOMBRE: cat.NOMBRE,
                TIPO: cat.TIPO
            };
            loadedCatalogs.push(catalog);
        }
    });
    dispatch(setDataCatalogs(loadedCatalogs));
};