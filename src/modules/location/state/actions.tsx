import {FUBUBIVIV} from '../../../state/house/types';
import {Catalog} from '../../../state/house/types';
import {allCatalogs} from '../../../providers/DataBaseProvider';

export const ActionType = {
  SET_FUBUBIVIV: 'SET_FUBUBIVIV',
  CATALOGS_HOUSE: 'CATALOGS_HOUSE',
  SET_CATALOGS: 'SET_CATALOGS',
};
export const setFUBUBIVIVData = (data: FUBUBIVIV) => (dispatch: any) => {
  dispatch(setFUBUBIVIV(data));
};

const setFUBUBIVIV = (data: FUBUBIVIV) => {
  return {type: ActionType.SET_FUBUBIVIV, data};
};

const setDataCatalogs = (data: Catalog[]) => {
  return {type: ActionType.SET_CATALOGS, data};
};

export const fetchCatalogs = () => (dispatch: any) => {
  let loadedCatalogs: Catalog[] = [];
  allCatalogs().then((response: any) => {
    for (const cat of response) {
      let catalog: Catalog = {
        ID: cat.ID,
        CODIGO: cat.CODIGO,
        NOMBRE: cat.NOMBRE,
        TIPO: cat.TIPO,
      };
      loadedCatalogs.push(catalog);
    }
  });
  dispatch(setDataCatalogs(loadedCatalogs));
};
