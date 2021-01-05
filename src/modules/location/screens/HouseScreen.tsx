import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {HouseForm} from '../forms';
import {BAppBar} from '../../../core/components';

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
        <BAppBar backH={true} onPress={() => this._goBack()} title="Vivienda" />
        <HouseForm goBack={() => this._goBack()} />
      </View>
    );
  }
}
export default HouseScreen;
