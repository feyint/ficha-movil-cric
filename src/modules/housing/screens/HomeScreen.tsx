import React, {Component, useState} from 'react';
import {View} from 'react-native';
import {BButton} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {setFUBUBIVIV, clearFUBUBIVIV} from '../../../state/house/actions';
import {HouseList} from '../forms';
import {HousingService} from '../../../services';
import {FUBUBIVIV} from '../../../state/house/types';

interface FormData {
  navigation: NavigationProp<any>;
}
interface State {
  houses: FUBUBIVIV[];
}

class HomeScreen extends Component<FormData, State> {
  public _unsubscribe: any;
  constructor(props: any) {
    super(props);
    this.state = {
      houses: [],
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchHouses();
    });
  }
  componentWillMount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
  async fetchHouses() {
    let syncCatalogService = new HousingService();
    let result = await syncCatalogService.getHouses();
    if (result) {
      this.setState({
        houses: result,
      });
    }
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
          onPress={() => this.createNew()}
        />
        <HouseList
          houses={this.state.houses}
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
