import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {MortalityLast12MonthsForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
class MortalityLast12MonthsScreen extends Component<Props, any> {
  //TODO añadir el back interceptor
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Mortalidad en los ultimos 12 meses" />
        </Appbar.Header>
        <MortalityLast12MonthsForm />
      </View>
    );
  }
}
export default MortalityLast12MonthsScreen;
