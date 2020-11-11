import {Database} from './Database';
import {FVCELEVIV} from '../types/FVCELEVIV';

// A (naive!) in-memory implementation of the Database interface.
let lists = [] as FVCELEVIV[];

async function createFVCELEVIV(newItem: FVCELEVIV) {
  const newList: FVCELEVIV = {
    ID: newItem.ID,
    CODIGO: newItem.CODIGO,
    NOMBRE: newItem.NOMBRE,
    ESTADO: newItem.ESTADO,
  };
  lists = [...lists, newList];
}
async function getAllFVCELEVIVs(): Promise<FVCELEVIV[]> {
  return lists;
}
async function countEntity(entity: string): Promise<number> {
  return 0;
}
async function deleteFVCELEVIV(itemToDelete: FVCELEVIV): Promise<void> {
  lists = lists.filter((item) => item.ID !== itemToDelete.ID);
}
async function executeQuery(
  statement: string,
  params?: any[] | undefined,
): Promise<any> {
  throw 'no implemented';
}
export const inMemoryDatabase: Database = {
  createFVCELEVIV,
  getAllFVCELEVIVs,
  deleteFVCELEVIV,
  countEntity,
  executeQuery,
};
