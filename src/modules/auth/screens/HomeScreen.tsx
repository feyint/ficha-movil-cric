import React, {Component} from 'react';
import {View} from 'react-native';
import {BButton, BHeader, BTextInput} from '../../../core/components';
import {LoginForm} from '../components';
type FormData = {
  username: string;
  password: string;
};
class HomeScreen extends Component<any, any> {
  render() {
    return (
      <View>
        <BHeader>Pagina de incio</BHeader>
      </View>
    );
  }
}
export default HomeScreen;
