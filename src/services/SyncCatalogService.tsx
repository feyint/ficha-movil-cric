import {HttpProvider} from '../providers';
import {Alert} from 'react-native';

export default class SyncCatalogService {
  async getEntity(name: string): Promise<{totalItems: number; data: any[]}> {
    try {
      return await HttpProvider.post('common/v1/entity', {
        entityName: name,
      });
    } catch (error) {
      Alert.alert(error, 'Ocurrio un error', 'con la entidad : ' + name);
      console.log(error);
      return {totalItems: 0, data: []};
    }
  }
}
