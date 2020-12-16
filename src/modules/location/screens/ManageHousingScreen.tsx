import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setQuestionWithOptions} from '../../../state/house/actions';
import {theme} from '../../../core/style/theme';
import { BAppBar } from '../../../core/components';

interface Props {
  navigation: NavigationProp<any>;
}
class ManageHousingScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      houses: [],
    };
  }
  async componentDidMount() {
    await this.props.setQuestionWithOptions();
    if (this.props.FUBUBIVIV && this.props.FUBUBIVIV.CODIGO == '') {
      this.goHomeLocation();
    }
  }
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <BAppBar
          backH={false}
          onPress={() => this._goBack()}
          title="Administrar Vivienda"
          subtitle={this.props.FUBUBIVIV.CODIGO}
        />
        <List.Section>
          <List.Subheader>Seleccione una opción</List.Subheader>
          <List.Item
            titleEllipsizeMode={'tail'}
            titleStyle={{ fontWeight: 'normal', color: theme.colors.secondary}}
            key={'Ubicacion'}
            title="UBICACIÓN DE LA VIVIENDA"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.secondary} />
            )}
            onPress={() => this.goHomeLocation()}
          />
          <View style={styles.divisor} />
          {this.props.FUBUBIVIV && this.props.FUBUBIVIV.CODIGO !== '' && (
            <List.Item
              titleStyle={{ fontWeight: 'normal', color: theme.colors.secondary}}
              key={'Nucleo'}
              onPress={() => this.goFamilyScreen()}
              title="NUCLEO FAMILIAR"
              left={() => (
                <List.Icon
                  icon="account-group"
                  color={theme.colors.secondary}
                />
              )}
            />
          )}
        </List.Section>
        <View style={styles.divisor} />
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
const styles = StyleSheet.create({
  divisor: {height: 1, backgroundColor: theme.colors.light},
});
const mapStateToProps = (housing: any) => {
  return {
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};
const mapDispatchToProps = {
  setQuestionWithOptions,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageHousingScreen);
