import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {BirthInformationForm} from '../forms';
import { BAppBar } from '../../../../core/components';
interface Props {
  navigation: NavigationProp<any>;
}
class BirthInformationScreen extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <BAppBar
          backH={true}
          onPress={() => this._goBack()}
          title="Datos de nacimiento"
        />
        <BirthInformationForm />
      </View>
    );
  }
}

export default BirthInformationScreen;
