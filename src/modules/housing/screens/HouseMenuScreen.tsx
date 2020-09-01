import React, {Component} from 'react';
import {BHeader} from '../../../core/components';
import {FamiliarNucleus, Department, SafeForm, CareZone} from '../components';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
class HouseMenuScreen extends Component<Props, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Vivienda" />
        </Appbar.Header>
        <List.Section>
          <List.Item
            onPress={() => this.goPollsterScreen()}
            title="Datos del encuestador"
            left={() => <List.Icon icon="account" />}
          />
          <List.Item
            title="Vivienda"
            onPress={() => this.goHouseScreen()}
            left={() => <List.Icon icon="home" />}
          />
          <List.Item
            onPress={() => this.goHousingStatusScreen()}
            title="Estado de la vivienda"
            left={() => <List.Icon icon="home-alert" />}
          />
          <List.Item
            title="Condiciones de la vivienda"
            onPress={() => this.goHouseContitionsScreen()}
            left={() => <List.Icon icon="home-heart" />}
          />
        </List.Section>
      </View>
    );
  }
  goHomeLocation() {
    this.props.navigation.navigate('HomeLocationScreen');
  }
  goPollsterScreen() {
    this.props.navigation.navigate('PollsterScreen');
  }

  goHousingStatusScreen() {
    this.props.navigation.navigate('HousingStatusScreen');
  }
  goHouseContitionsScreen() {
    this.props.navigation.navigate('HouseConditionsScreen');
  }
}
export default HouseMenuScreen;
