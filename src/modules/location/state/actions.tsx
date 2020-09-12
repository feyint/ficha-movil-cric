import {FUBUBIVIV} from '../../../state/house/types';
import {allCatalogs} from '../../../providers/DataBaseProvider';
import {HousingService} from '../../../services';
import {Catalog} from './types';
import {SelectSchema} from '../../../core/utils/types';

export const ActionType = {
  CATALOGS_HOUSE: 'CATALOGS_HOUSE',
  SET_CATALOGS: 'SET_CATALOGS',
  SET_DEPTS: 'SET_DEPTS',
};
export const getEntitySelect = (
  entity: string,
  _columnFilter = null,
  _value = null,
  _columnFilter2 = null,
  _value2 = null,
) => {
  return async (_dispatch: any, getState: any) => {
    let item: SelectSchema = {name: '', id: 0, children: []};
    let houseServie: HousingService = new HousingService();
    let items = await houseServie.getUbicationEntity(
      entity,
      _columnFilter,
      _value,
      _columnFilter2,
      _value2,
    );
    item.name = '';
    for (let option of items) {
      item.children.push({
        value: option.ID.toString(),
        label: option.NOMBRE,
        item: option,
      });
    }
    item.children.unshift({value: '-1', label: 'Seleccione', item: null});
    return item;
  };
};
export const getLasHouseCode = (code) => {
  return async (_dispatch: any) => {
    let houseServie: HousingService = new HousingService();
    let codeIncrement = await houseServie.getLasHouseCode(code);
    return codeIncrement;
  };
};
