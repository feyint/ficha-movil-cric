import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import HomeLocationForm from '../forms/HomeLocationForm';
import {connect} from 'react-redux';
import {setFUBUBIVIV} from '../../../state/house/actions';
import {FUBUBIVIV} from '../../../types';
// import HomeLocationForm from '../forms/HomeLocationForm';

interface Props {
  navigation: NavigationProp<any>;
}
class HomeLocationScreen extends Component<Props, any> {
  constructor(props: any) {
    super(props);
  }
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Datos de ubicación" />
        </Appbar.Header>
        <HomeLocationForm />
      </View>
    );
  }
}
const mapDispatchToProps = {
  setFUBUBIVIV,
};
export default HomeLocationScreen;
