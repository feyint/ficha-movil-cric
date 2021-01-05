import {Alert} from 'react-native';
import {HttpProvider} from '../../../providers';
import { FububivivListSync } from '../models/FububivivListSync';
export default class SyncService {
  requestHeader = {
    destination: {
      domainName: 'domainNamePrueba',
      serviceName: 'executeJaxb',
      version: '1.0.0',
    },
    transactionId: '1234567890',
    requestDate: '2020-07-22 10:30',
    channel: 'WEB',
    consumer: {
      id: 'WEB-SUIIN-2.0',
      name: 'WebAdmin-SUIIN-2.0',
    },
  };
  async sendPackageToSincronize(any: FububivivListSync): Promise<any> {
    try {
      let result = await HttpProvider.post(
        'synchronize-war/rest/synchronize/fichafamiliar/execute',
        {request: {requestHeader: this.requestHeader, requestBody: {any}}},
      );
      return result;
    } catch (error) {
      //Alert.alert('Ocurrio un error ', 'error de conexión ' + error);
      return null;
    }
  }
}
