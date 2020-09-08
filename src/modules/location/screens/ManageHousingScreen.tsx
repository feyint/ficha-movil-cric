import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setQuestionWithOptions} from '../../../state/house/actions';

interface Props {
  navigation: NavigationProp<any>;
}
class ManageHousingScreen extends Component<any, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  UNSAFE_componentWillMount() {
    this.props.setQuestionWithOptions();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Administrar Vivienda" />
        </Appbar.Header>
        <List.Section>
          <List.Item
            title="Ubicación"
            left={() => <List.Icon icon="map-marker" />}
            onPress={() => this.goHomeLocation()}
          />
          <List.Item
            onPress={() => this.goFamilyScreen() /*this.goHouseMenuScreen()*/}
            title="Nucleo Familiar"
            left={() => <List.Icon icon="account-group" />}
          />
        </List.Section>
      </View>
    );
  }
  goFamilyScreen() {
    this.props.navigation.navigate('FamilyScreen');
  }
  goHouseMenuScreen() {
    this.props.navigation.navigate('HouseMenuScreen');
  }
  goHomeLocation() {
    this.props.navigation.navigate('HomeLocationScreen');
  }
}
const mapDispatchToProps = {
  setQuestionWithOptions,
};
export default connect(null, mapDispatchToProps)(ManageHousingScreen);
