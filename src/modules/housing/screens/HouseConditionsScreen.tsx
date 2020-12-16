import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {HouseConditionsForm} from '../forms';
import {BAppBar} from '../../../core/components';

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
        <BAppBar
          backH={true}
          onPress={() => this._goBack()}
          title="Condiciones de la vivienda"
        />
        <HouseConditionsForm />
      </View>
    );
  }
}
export default HouseConditionsScreen;
