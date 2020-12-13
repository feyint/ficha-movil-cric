import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AnotherReproductiveSexualHealtForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
export default class AnotherReproductiveSexualHealtScreen extends Component<
  Props,
  any
> {
  //TODO añadir el back interceptor
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Otros datos de salud sexual y reproductiva" />
        </Appbar.Header>
        <AnotherReproductiveSexualHealtForm />
      </View>
    );
  }
}
