import React, {Component, useState} from 'react';
import {View} from 'react-native';
import {BButton} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {setFUBUBIVIV, clearFUBUBIVIV} from '../../../state/house/actions';
import {HouseList} from '../forms';

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
          onPress={() => this.createNew()}
        />
        <HouseList
          onSelect={(value: any) => {
            this.goToHouse(value);
          }}
        />
      </View>
    );
  }
  createNew() {
    this.props.clearFUBUBIVIV();
    this.props.navigation.navigate('ManageHousingScreen');
  }
  async goToHouse(value) {
    console.log('Selected Item: ', value);
    await this.props.setFUBUBIVIV(value);
    this.props.navigation.navigate('ManageHousingScreen');
  }
}
const mapDispatchToProps = {
  setFUBUBIVIV,
  clearFUBUBIVIV,
};
export default connect(null, mapDispatchToProps)(HomeScreen);
