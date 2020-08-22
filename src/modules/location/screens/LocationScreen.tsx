import React, {Component} from 'react';
import {BHeader} from '../../../core/components';
import {FamiliarNucleus, Department, SafeForm, CareZone} from '../components';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
class HomeLocationScreen extends Component<Props, any> {
  _goBack() {}
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack} />
          <Appbar.Content title="Nueva Ficha Familiar" />
        </Appbar.Header>
        <List.Section>
          <List.Subheader>Partes de la ficha</List.Subheader>
          <List.Item
            onPress={() => this.goPollsterScreen()}
            title="Datos del encuestador"
            left={() => <List.Icon icon="folder" />}
          />
          <List.Item
            onPress={() => this.goHomeLocation()}
            title="Ubicación vivienda"
            left={() => <List.Icon icon="folder" />}
          />
        </List.Section>
      </View>
    );
  }
  goHomeLocation() {
    this.props.navigation.navigate('HomeLocationScreen');
  }
  goPollsterScreen() {
    this.props.navigation.navigate('PollsterScreen');
  }
}
export default HomeLocationScreen;
