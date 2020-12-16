import {Alert} from 'react-native';
import {HttpProvider} from '../../../providers';
export default class SyncService {
  requestbase = {
    request: {
      requestHeader: {
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
      },
      requestBody: {
        any: {}, // objeto de fichas
      },
    },
  };
  async getEntity(): Promise<any> {
    try {
      let result = await HttpProvider.post(
        'synchronize-war/rest/synchronize/fichafamiliar/execute',
        {
          entityName: this.requestbase,
        },
      );
      console.error(result);
    } catch (error) {
      Alert.alert('Ocurrio un error ', 'error en la sincronizacion');
      console.error(error);
    }
  }
}
