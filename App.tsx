import React, {Component} from 'react';
import Store from './src/Store';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {LoginScreen} from './src/modules/auth/screens';
import {theme} from './src/core/style/theme';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    let storeApp = Store();

    return (
      <Provider store={storeApp}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Iniciar Sesión"
                component={LoginScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
