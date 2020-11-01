import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {HouseForm} from '../forms';

interface Props {
  navigation: NavigationProp<any>;
}
class HouseScreen extends Component<Props, any> {
  //TODO añadir el back interceptor
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
        <HouseForm goBack={() => this._goBack()} />
      </View>
    );
  }
}
export default HouseScreen;
