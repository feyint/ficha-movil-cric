import React, {Component} from 'react';
import {BHeader} from '../../../core/components';
import {FamiliarNucleus, Department, SafeForm, CareZone} from '../components';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {saveFNBNUCVIV} from '../../../state/house/actions';
import {HousingService} from '../../../services';
import {theme} from '../../../core/style/theme';

interface Props {
  navigation: NavigationProp<any>;
}
interface State {
  CODIGO: string;
}
class HouseMenuScreen extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      CODIGO: this.props.FUBUBIVIV.CODIGO,
    };
  }
  async componentDidMount() {
    this.inicialize();
  }
  async inicialize() {
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
      this.setState({
        CODIGO: insert.CODIGO,
      });
    } else {
      this.setState({
        CODIGO: this.props.FNBNUCVIV.CODIGO,
      });
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
          <Appbar.Content title="Vivienda" subtitle={this.state.CODIGO} />
        </Appbar.Header>
        <List.Section>
          <List.Item
            key="vivienda"
            title="Vivienda"
            left={() => <List.Icon icon="home" color={theme.colors.gray} />}
            onPress={() => this.goHouseScreen()}
          />
          <View style={styles.divisor} />
          <List.Item
            key="Estado"
            title="Estado de la vivienda"
            left={() => (
              <List.Icon icon="home-alert" color={theme.colors.gray} />
            )}
            onPress={() => this.goHousingStatusScreen()}
          />
          <View style={styles.divisor} />
          <List.Item
            key="condiciones"
            title="Condiciones de la vivienda"
            left={() => (
              <List.Icon icon="home-heart" color={theme.colors.gray} />
            )}
            onPress={() => this.goHouseContitionsScreen()}
          />
          <View style={styles.divisor} />
          <List.Item
            key="datos"
            title="Datos del encuestador"
            left={() => <List.Icon icon="account" color={theme.colors.gray} />}
            onPress={() => this.goPollsterScreen()}
          />
          <View style={styles.divisor} />
          <List.Item
            key="managep"
            title="Administrar personas"
            left={() => (
              <List.Icon icon="account-group" color={theme.colors.gray} />
            )}
            onPress={() => this.goPersonManageScreen()}
          />
          <View style={styles.divisor} />
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
const styles = StyleSheet.create({
  divisor: {height: 1, backgroundColor: theme.colors.light},
});
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
