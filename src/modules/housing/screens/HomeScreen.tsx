import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { BButton } from '../../../core/components';
//import {LoginForm} from '../components';
import { NavigationProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { setQuestionWithOptions, SaveFUBUBIVIV } from '../../../state/house/actions';
import { HouseList } from '../forms';

interface FormData {
  navigation: NavigationProp<any>;
}

class HomeScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  UNSAFE_componentWillMount() {
    //this.props.setQuestionWithOptions();
  }
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
        <HouseList onSelect={(value: any) => {
          console.log('Selected Item: ', value);
          this.props.SaveFUBUBIVIV(value);
          this.goHomeLocation();
        }} />

      </View>
    );
  }
  goHomeLocation() {
    this.props.navigation.navigate('ManageHousingScreen');
  }
}
const mapDispatchToProps = {
  setQuestionWithOptions,
  SaveFUBUBIVIV
};
export default connect(null, mapDispatchToProps)(HomeScreen);
