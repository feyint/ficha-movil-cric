import React, {Component} from 'react';
import {Text, View} from 'react-native';

class LoginScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>Ficha Familiar Movil Base!</Text>
      </View>
    );
  }
}
export default LoginScreen;