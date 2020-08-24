import React, {Component, Fragment} from 'react';
import {BHeader} from '../../../core/components';
import {FamiliarNucleus, Department, SafeForm, CareZone} from '../components';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';

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
        <BHeader>1. Ubicacion de la vivienda</BHeader>
        <Department />
        <CareZone />
        <FamiliarNucleus />
        <SafeForm />
      </View>
    );
  }
}
export default HomeLocationScreen;
