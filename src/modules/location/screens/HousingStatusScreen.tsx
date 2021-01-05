import React, {Component} from 'react';
import {View} from 'react-native';
import {HousingStatusForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';
import {BAppBar} from '../../../core/components';

interface Props {
  navigation: NavigationProp<any>;
}
class HousingStatusScreen extends Component<Props, any> {
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
          title="Estado de la vivienda"
        />
        <HousingStatusForm />
      </View>
    );
  }
}
export default HousingStatusScreen;
