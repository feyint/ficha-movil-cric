import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, HomeScreen} from '../modules/auth/screens';
import {LocationScreen, HomeLocationScreen, PollsterScreen, ManageHousingScreen} from '../modules/location/screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HouseMenuScreen from '../modules/housing/screens/HouseMenuScreen';

const DashboardStack = createStackNavigator();
export const Dashboard = () => {
  return (
    <DashboardStack.Navigator initialRouteName="Iniciar Sesión">
      <DashboardStack.Screen
        component={LoginScreen}
        name="Iniciar Sesión"
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        component={LocationScreen}
        name="LocationScreen"
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        component={HomeLocationScreen}
        name="HomeLocationScreen"
        options={{headerShown: false, title: 'ubicacion vivienda'}}
      />
      <DashboardStack.Screen
        component={ManageHousingScreen}
        name="ManageHousingScreen"
        options={{headerShown: false, title: 'Administrar Vivienda'}}
      />
      <DashboardStack.Screen
        component={PollsterScreen}
        name="PollsterScreen"
        options={{headerShown: false, title: 'Datos del encuestador'}}
      />
      <DashboardStack.Screen
        name="MenuHome"
        component={HomeTabs}
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        name="HouseMenuScreen"
        component={HouseMenuScreen}
        options={{headerShown: false}}
      />
    </DashboardStack.Navigator>
  );
};
const BottomTabs = createMaterialBottomTabNavigator();
export const HomeTabs = () => {
  return (
    <BottomTabs.Navigator
      style={{backgroundColor: '#00917B'}}
      activeColor="white">
      <BottomTabs.Screen name="Ficha Familiar" component={HomeScreen} />
      <BottomTabs.Screen name="Sincronización" component={HomeScreen} />
    </BottomTabs.Navigator>
  );
};
