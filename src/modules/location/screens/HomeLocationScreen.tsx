import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import HomeLocationForm from '../forms/HomeLocationForm';
// import HomeLocationForm from '../forms/HomeLocationForm';

interface Props {
  navigation: NavigationProp<any>;
}
class HomeLocationScreen extends Component<Props, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Datos de ubicación" />
        </Appbar.Header>
        <HomeLocationForm />
      </View>
    );
  }
}
export default HomeLocationScreen;
