import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {PollsterForm} from '../forms';

class PollsterScreen extends Component<any, any> {
  _goBack() {}
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack} />
          <Appbar.Content title="Datos del encuestador" />
        </Appbar.Header>
        <PollsterForm />
      </View>
    );
  }
}
export default PollsterScreen;
