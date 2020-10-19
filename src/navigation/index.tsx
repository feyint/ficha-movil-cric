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
import {
  HealthStatusVisitScreen,
  MortalityLast12MonthsScreen,
  PersonManageScreen,
  ViewPersonScreen,
  SocialSecurityScreen,
  UnhealthyHabitsScreen,
  LastPregnancyScreen,
  CurrentPregnancyScreen,
  BirthDataScreen,
  OtherIdentificationDataScreen,
  PersonalInformationScreen,
  ContactInformationScreen,
  ReproductiveSexualHealtScreen,
  BirthInformationScreen,
} from '../modules/person/manage/screens';
import {FamilyScreen} from '../modules/families/screens';

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
        component={FamilyScreen}
        name="FamilyScreen"
        options={{headerShown: false, title: 'Nucleo Familiar'}}
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
      <DashboardStack.Screen
        component={PersonManageScreen}
        name="PersonManageScreen"
        options={{headerShown: false, title: 'Administrar persona'}}
      />
      <DashboardStack.Screen
        component={ViewPersonScreen}
        name="ViewPersonScreen"
        options={{headerShown: false, title: 'Ver persona'}}
      />
      <DashboardStack.Screen
        component={PersonalInformationScreen}
        name="PersonalInformationScreen"
        options={{
          headerShown: false,
          title: 'Datos personales',
        }}
      />
      <DashboardStack.Screen
        component={ContactInformationScreen}
        name="ContactInformationScreen"
        options={{
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        component={BirthInformationScreen}
        name="BirthInformationScreen"
        options={{
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        component={ReproductiveSexualHealtScreen}
        name="ReproductiveSexualHealtScreen"
        options={{
          headerShown: false,
        }}
      />
      <DashboardStack.Screen
        component={HealthStatusVisitScreen}
        name="HealthStatusVisitScreen"
        options={{
          headerShown: false,
          title: 'Estado de salud de la persona en la visita',
        }}
      />
      <DashboardStack.Screen
        component={MortalityLast12MonthsScreen}
        name="MortalityLast12MonthsScreen"
        options={{
          headerShown: false,
          title: 'Mortalidad en los ultimos 12 meses',
        }}
      />
      <DashboardStack.Screen
        component={SocialSecurityScreen}
        name="SocialSecurityScreen"
        options={{
          headerShown: false,
          title: 'Seguridad social',
        }}
      />
      <DashboardStack.Screen
        component={UnhealthyHabitsScreen}
        name="UnhealthyHabitsScreen"
        options={{
          headerShown: false,
          title: 'Habitos no saludables',
        }}
      />
      <DashboardStack.Screen
        component={CurrentPregnancyScreen}
        name="CurrentPregnancyScreen"
        options={{
          headerShown: false,
          title: 'Finalizacion de la ultima gestacion',
        }}
      />
      <DashboardStack.Screen
        component={LastPregnancyScreen}
        name="LastPregnancyScreen"
        options={{
          headerShown: false,
          title: 'Gestación actual',
        }}
      />
      <DashboardStack.Screen
        component={BirthDataScreen}
        name="BirthDataScreen"
        options={{
          headerShown: false,
          title: 'Datos de nacimiento',
        }}
      />
      <DashboardStack.Screen
        component={OtherIdentificationDataScreen}
        name="OtherIdentificationDataScreen"
        options={{
          headerShown: false,
          title: 'Otros datos de identificacion',
        }}
      />
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
