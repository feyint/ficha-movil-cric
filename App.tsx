import React, {Component} from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/core/style/theme';
import {Dashboard} from './src/navigation';
import Store from './src/state/Store';
import {DataBaseProvider, HttpProvider} from './src/providers';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {Alert} from 'react-native';
import ErrorBoundary from './src/core/components/ErrorBoundary';

setJSExceptionHandler((error, isFatal) => {
  Alert.alert(
    `Ha ocurrido un error ${isFatal ? 'FATAL' : 'NO FATAL'} de js`,
    error.message,
    [
      {
        text: 'aceptar',
      },
    ],
  );
}, false);
setNativeExceptionHandler(
  (exceptionString) => {
    Alert.alert('Ha ocurrido un error nativo', exceptionString, [
      {
        text: 'aceptar',
      },
    ]);
  },
  false,
  false,
);

export default class App extends Component {
  constructor(props: any) {
    super(props);
    //initialize a piece of state that we will also be persisting
    this.state = {realm: null};
  }
  UNSAFE_componentWillMount() {
    const dbProvider: DataBaseProvider = new DataBaseProvider();
    dbProvider.open();
    HttpProvider.setDefaultHeaders();
  }
  render() {
    let storeApp = Store();
    return (
      <ErrorBoundary onError={() => {}}>
        <Provider store={storeApp}>
          <PaperProvider theme={theme}>
            <NavigationContainer>{<Dashboard />}</NavigationContainer>
          </PaperProvider>
        </Provider>
      </ErrorBoundary>
    );
  }
}
