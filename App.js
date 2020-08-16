import React, {Component} from 'react';
import Store from './src/Store';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Root} from 'native-base';
//TODO POR DEFINIR ROOTEO EN BASE A TEMA
//TODO POR DEFINIR nativebase tema generico
import {LoginScreen} from './src/modules/auth/screens/';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      localizationKey: 'es-CO',
    };
    console.log('test');
  }

  render() {
    let storeApp = Store();
    return (
      <Provider store={storeApp}>
        <Root>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Root>
      </Provider>
    );
  }
}
