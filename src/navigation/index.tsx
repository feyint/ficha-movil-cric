import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginScreen, HomeScreen} from '../modules/auth/screens';
import {HomeLocationScreen} from '../modules/location/screens';

const DashboardStack = createStackNavigator();
export const Dashboard = () => {//100%
  return (
    <DashboardStack.Navigator initialRouteName="Iniciar Sesión">
      <DashboardStack.Screen
        component={LoginScreen}
        name="Iniciar Sesión"
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        component={HomeLocationScreen}
        name="Ubicacion de la vivienda"
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        name="MenuHome"
        component={HomeTabs}
        options={{headerShown: false}}
      />
    </DashboardStack.Navigator>
  );
};
const BottomTabs = createBottomTabNavigator();//10%
export const HomeTabs = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Ficha Familiar" component={HomeScreen} />
      <BottomTabs.Screen name="Sincronización" component={HomeScreen} />

    </BottomTabs.Navigator>
  );
};
