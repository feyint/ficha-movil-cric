import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {HealthInformationForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';
import { BAppBar } from '../../../../core/components';

interface Props {
  navigation: NavigationProp<any>;
}
export default class HealthInformationScreen extends Component<Props, any> {
  //TODO añadir el back interceptor
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <BAppBar
          backH={true}
          onPress={() => this._goBack()}
          title="Informacion de salud"
        />
        <HealthInformationForm />
      </View>
    );
  }
}
