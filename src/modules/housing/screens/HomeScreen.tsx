import React, {Component, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BButton} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {setFUBUBIVIV, clearFUBUBIVIV} from '../../../state/house/actions';
import {HouseList} from '../forms';
import {HousingService} from '../../../services';
import {FUBUBIVIV} from '../../../state/house/types';
import {theme} from '../../../core/style/theme';
import BFabButton from '../../../core/components/BFabButton';

interface FormData {
  navigation: NavigationProp<any>;
  clearFUBUBIVIV: any;
  setFUBUBIVIV: any;
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
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.Content title="INICIO" />
        </Appbar.Header>
        <HouseList
          houses={this.state.houses}
          onSelect={(value: any) => {
            this.goToHouse(value);
          }}
        />
        <BFabButton onPress={() => this.createNew()} />
      </View>
    );
  }
  createNew() {
    this.props.clearFUBUBIVIV();
    this.props.navigation.navigate('ManageHousingScreen');
  }
  async goToHouse(value: any) {
    await this.props.setFUBUBIVIV(value);
    this.props.navigation.navigate('ManageHousingScreen');
  }
}
const mapDispatchToProps = {
  setFUBUBIVIV,
  clearFUBUBIVIV,
};
export default connect(null, mapDispatchToProps)(HomeScreen);
