import React, {Component} from 'react';
import Store from './src/Store';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/core/style/theme';
import {Dashboard} from './src/navigation';
import Realm from 'realm';

export default class App extends Component {
  constructor(props: any) {
    super(props);
    //initialize a piece of state that we will also be persisting
    this.state = {realm: null};
  }
  componentWillMount() {
    Realm.open({
      schemaVersion: 1,
      schema: [
        {
          name: 'User',
          properties: {
            name: 'string',
            lastname: 'string',
            username: 'string',
            password: 'string',
          },
        },
      ],
    }).then((realm) => {
      realm.write(() => {
        realm.create('User', {
          name: 'test',
          lastname: 'test',
          username: 'test',
          password: 'test',
        });
      });
      this.setState({realm});
    });
  }
  render() {
    let storeApp = Store();
    return (
      <Provider store={storeApp}>
        <PaperProvider theme={theme}>
          <NavigationContainer>{<Dashboard />}</NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
