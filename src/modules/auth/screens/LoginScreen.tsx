import React, {Component} from 'react';
import {View} from 'react-native';
import {BButton, BHeader, BTextInput} from '../../../core/components';
import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';

type FormData = {
  username: string;
  password: string;
  navigation: NavigationProp<any>;
};
class LoginScreen extends Component<FormData, any> {
  constructor(props: FormData) {
    super(props);
    // constructor stuff
  }
  render() {
    return (
      <View>
        <BHeader>Iniciar Sesión</BHeader>
        <LoginForm />
        <BButton
          mode="contained"
          value="iniciar sesión"
          onPress={() => this.doLogin()}
        />
      </View>
    );
  }
  doLogin() {
    this.props.navigation.navigate('MenuHome');
  }
}
export default LoginScreen;
