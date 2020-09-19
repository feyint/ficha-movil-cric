import React, {Component} from 'react';
import {BHeader} from '../../../core/components';
import {FamiliarNucleus, Department, SafeForm, CareZone} from '../components';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {saveFNBNUCVIV} from '../../../state/house/actions';
import {HousingService} from '../../../services';

interface Props {
  navigation: NavigationProp<any>;
}
class HouseMenuScreen extends Component<any, any> {
  // constructor(props: any) {
  //   super(props);
  // }
  async UNSAFE_componentWillMount() {
    if (this.props.FNBNUCVIV.CODIGO == '') {
      const syncCatalogService = new HousingService();
      let NFCODIGO = await syncCatalogService.getLastNucleoCode(
        this.props.FUBUBIVIV.CODIGO,
      );
      let fNBNUCVIV: any = {
        CODIGO: this.props.FUBUBIVIV.CODIGO + '-' + NFCODIGO,
        FUBUBIVIV_ID: this.props.FUBUBIVIV.ID,
      };
      let insert = await this.props.saveFNBNUCVIV(fNBNUCVIV);
      //console.error('nuevo insert ', insert);
    } else {
    }
  }
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content
            title="Vivienda"
            subtitle={this.props.FNBNUCVIV.CODIGO}/>
        </Appbar.Header>
        <List.Section>
          <List.Item
            title="Vivienda"
            onPress={() => this.goHouseScreen()}
            left={() => <List.Icon icon="home" />}
          />
          <List.Item
            onPress={() => this.goHousingStatusScreen()}
            title="Estado de la vivienda"
            left={() => <List.Icon icon="home-alert" />}
          />
          <List.Item
            title="Condiciones de la vivienda"
            onPress={() => this.goHouseContitionsScreen()}
            left={() => <List.Icon icon="home-heart" />}
          />
          <List.Item
            title="Administrar personas"
            left={() => <List.Icon icon="account-group" />}
            onPress={() => this.goPersonManageScreen()}
          />
          <List.Item
            onPress={() => this.goPollsterScreen()}
            title="Datos del encuestador"
            left={() => <List.Icon icon="account" />}
          />
        </List.Section>
      </View>
    );
  }
  goHomeLocation() {
    this.props.navigation.navigate('HomeLocationScreen');
  }
  goPollsterScreen() {
    this.props.navigation.navigate('PollsterScreen');
  }
  goHouseScreen() {
    this.props.navigation.navigate('HouseScreen');
  }
  goHousingStatusScreen() {
    this.props.navigation.navigate('HousingStatusScreen');
  }
  goHouseContitionsScreen() {
    this.props.navigation.navigate('HouseConditionsScreen');
  }
  goPersonManageScreen() {
    this.props.navigation.navigate('PersonManageScreen');
  }
}
const mapDispatchToProps = {
  saveFNBNUCVIV,
};
const mapStateToProps = (housing: any) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HouseMenuScreen);
