import {FUBUBIVIV} from './types';

export const ActionType = {
  SET_FUBUBIVIV: 'SET_FUBUBIVIV',
  CATALOGS_HOUSE: 'CATALOGS_HOUSE',
};
export const setFUBUBIVIVData = (data: FUBUBIVIV) => (dispatch: any) => {
  dispatch(setFUBUBIVIV(data));
};

const setFUBUBIVIV = (data: FUBUBIVIV) => {
  return {type: ActionType.SET_FUBUBIVIV, data};
};
