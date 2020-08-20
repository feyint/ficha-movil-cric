import React, {Component} from 'react';
import Store from './src/Store';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/core/style/theme';
import {Dashboard} from './src/navigation';

export default class App extends Component {
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
