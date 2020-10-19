import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {HouseConditionsForm} from '../forms';

interface Props {
  navigation: NavigationProp<any>;
}
class HouseConditionsScreen extends Component<Props, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Condiciones de la vivienda" />
        </Appbar.Header>
        <HouseConditionsForm />
      </View>
    );
  }
}
export default HouseConditionsScreen;
