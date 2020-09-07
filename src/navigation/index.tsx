import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../modules/auth/screens';
import {
  LocationScreen,
  HomeLocationScreen,
  PollsterScreen,
  ManageHousingScreen,
  HouseScreen,
  HousingStatusScreen,
} from '../modules/location/screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  HouseConditionsScreen,
  HouseMenuScreen,
  HomeScreen,
} from '../modules/housing/screens';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {SyncScreen} from '../modules/sync/screens';
//import {PersonManageScreen} from '../modules/person/manage/screens';

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
        component={HouseConditionsScreen}
        name="HouseConditionsScreen"
        options={{headerShown: false, title: 'Condiciones de la vivienda'}}
      />
      <DashboardStack.Screen
        component={PollsterScreen}
        name="PollsterScreen"
        options={{headerShown: false, title: 'Datos del encuestador'}}
      />
      <DashboardStack.Screen
        component={HouseScreen}
        name="HouseScreen"
        options={{headerShown: false, title: 'Datos de la vivienda'}}
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
      <DashboardStack.Screen
        component={HousingStatusScreen}
        name="HousingStatusScreen"
        options={{headerShown: false, title: 'Estado de la vivienda'}}
      />
      {/* <DashboardStack.Screen
        component={PersonManageScreen}
        name="PersonManageScreen"
        options={{headerShown: false, title: 'Administrar persona'}}
      /> */}
    </DashboardStack.Navigator>
  );
};
const BottomTabs = createMaterialBottomTabNavigator();
export const HomeTabs = () => {
  const {colors} = useTheme();
  return (
    <BottomTabs.Navigator
      activeColor={colors.secondaryFont}
      inactiveColor={colors.primaryFont}
      barStyle={{backgroundColor: colors.primary}}>
      <BottomTabs.Screen
        name="Ficha Familiar"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name="Sincronización"
        component={SyncScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="sync-outline" size={20} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};
