import React, {Component} from 'react';
import {View} from 'react-native';
import {BButton} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';

interface FormData {
  navigation: NavigationProp<any>;
}

class HomeScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  UNSAFE_componentWillMount() {}
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.Content title="INICIO" />
        </Appbar.Header>
        <BButton
          color="primary"
          value="Crear Nueva"
          mode="contained"
          onPress={() => this.goHomeLocation()}
        />
      </View>
    );
  }
  goHomeLocation() {
    this.props.navigation.navigate('ManageHousingScreen');
  }
}

export default HomeScreen;
