import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import HomeLocationForm from '../forms/HomeLocationForm';
import {BAppBar} from '../../../core/components';
// import HomeLocationForm from '../forms/HomeLocationForm';

interface Props {
  navigation: NavigationProp<any>;
}
class HomeLocationScreen extends Component<Props, any> {
  constructor(props: any) {
    super(props);
  }
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <BAppBar onPress={() => this._goBack()} title="Datos de ubicación" />
        <HomeLocationForm />
      </View>
    );
  }
}
export default HomeLocationScreen;
