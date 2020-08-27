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
class ManageHousingScreen extends Component<Props, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Administrar Vivienda" />
        </Appbar.Header>
        <List.Section>
          <List.Item
            title="Ubicación"
            left={() => <List.Icon icon="map-marker" />}
            onPress={() => this.goHomeLocation()}
          />
          <List.Item
            onPress={() => this.goHouseMenuScreen()}
            title="Vivienda"
            left={() => <List.Icon icon="home" />}
          />
          <List.Item
            title="Nucleo Familiar"
            left={() => <List.Icon icon="account-group" />}
          />
        </List.Section>
      </View>
    );
  }
  goHouseMenuScreen() {
    this.props.navigation.navigate('HouseMenuScreen');
  }
  goHomeLocation() {
    this.props.navigation.navigate('HomeLocationScreen');
  }
}
export default ManageHousingScreen;
