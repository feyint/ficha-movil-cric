import React, {Component} from 'react';
import {View} from 'react-native';
import {BButton, BHeader, BTextInput} from '../../../core/components';
import {BasicExample} from '../components';
type FormData = {
  username: string;
  password: string;
};
class LoginScreen extends Component<any, any> {
  render() {
    return (
      <View>
        <BHeader></BHeader>
        <BasicExample />
      </View>
    );
  }
}
export default LoginScreen;
