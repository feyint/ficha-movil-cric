import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {SocialSecurityForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';
import { BAppBar } from '../../../../core/components';

interface Props {
  navigation: NavigationProp<any>;
}
class SocialSecurityScreen extends Component<Props, any> {
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
          title="Seguridad socia"
        />
        <SocialSecurityForm />
      </View>
    );
  }
}
export default SocialSecurityScreen;
