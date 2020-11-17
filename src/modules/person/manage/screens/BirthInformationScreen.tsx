import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {BirthInformationForm} from '../forms';
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
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Datos de nacimiento" />
        </Appbar.Header>
        <BirthInformationForm />
      </View>
    );
  }
}

export default BirthInformationScreen;
