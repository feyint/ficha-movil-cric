import React, {Component} from 'react';
import {View} from 'react-native';
import {BButton, BHeader} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';

interface FormData {
  navigation: NavigationProp<any>;
}

class HomeScreen extends Component<any, any> {
  render() {
    return (
      <View>
        <BHeader>Pagina de incio</BHeader>
        <BButton
          value="Crear Nueva Vivienda"
          mode="contained"
          onPress={() => this.goHomeLocation()}
        />
      </View>
    );
  }
  goHomeLocation() {
    this.props.navigation.navigate('Ubicacion de la vivienda');
  }
}

export default HomeScreen;
