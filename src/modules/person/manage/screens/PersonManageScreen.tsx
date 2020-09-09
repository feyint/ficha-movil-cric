import React, {Component} from 'react';
import {BHeader, BButton} from '../../../../core/components';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import PersonManageList from '../forms/PersonManageList';
//import {PersonManageForm} from '../forms';
// import HomeLocationForm from '../forms/HomeLocationForm';

interface Props {
  navigation: NavigationProp<any>;
}
class PersonManageScreen extends Component<Props, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Persona" />
        </Appbar.Header>
        <BHeader>Administrar persona</BHeader>
        {/* por si no esta la persona */}
        <BButton
          color="primary"
          value="Nueva persona"
          mode="contained"
          onPress={() => this.goViewPersonScreen()}
        />
        <PersonManageList
          onSelect={(value: any) => {
            console.log('Selected Item: ', value);
            this.goViewPersonScreen();
          }}
        />
      </View>
    );
  }
  goViewPersonScreen() {
    this.props.navigation.navigate('ViewPersonScreen');
  }
}
export default PersonManageScreen;
