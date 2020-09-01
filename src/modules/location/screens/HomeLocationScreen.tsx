import React, {Component, Fragment} from 'react';
import {BHeader} from '../../../core/components';
import {FamiliarNucleus, Department, SafeForm, CareZone} from '../components';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
// import HomeLocationForm from '../forms/HomeLocationForm';

interface Props {
  navigation: NavigationProp<any>;
}
class HomeLocationScreen extends Component<Props, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Nueva Ficha Familiar" />
        </Appbar.Header>
        <BHeader>Ubicacion de la vivienda</BHeader>
        {/* <HomeLocationForm /> */}
      </View>
    );
  }
}
export default HomeLocationScreen;
