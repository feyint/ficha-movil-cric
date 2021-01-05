import {PickerType} from '../../../core/utils/types';

export const ActionType = {
  CATALOGS_HOUSE: 'CATALOGS_HOUSE',
  SET_CATALOGS: 'SET_CATALOGS',
  SET_DEPTS: 'SET_DEPTS',
};
export const getEntitySelect = (
  entity: string,
  schema: any,
  _columnFilter = null,
  _value = null,
  _columnFilter2 = null,
  _value2 = null,
) => {
  return async (_dispatch: any) => {
    let item: PickerType[] = [];
    item.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  };
};
export const getLasHouseCode = (code) => {
  return async (_dispatch: any) => {
    return '';
  };
};
