import React, {Component, Fragment} from 'react';
import {BHeader} from '../../../../core/components';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
//import {PersonManageForm} from '../forms';
// import HomeLocationForm from '../forms/HomeLocationForm';

interface Props {
  navigation: NavigationProp<any>;
}
class PersonManageScreen extends Component<Props, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Persona" />
        </Appbar.Header>
        <BHeader>Administrar persona</BHeader>
        {/* <PersonManageForm /> */}
      </View>
    );
  }
}
export default PersonManageScreen;
