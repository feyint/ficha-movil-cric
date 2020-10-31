import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setQuestionWithOptions} from '../../../state/house/actions';
import {theme} from '../../../core/style/theme';

interface Props {
  navigation: NavigationProp<any>;
}
class ManageHousingScreen extends Component<any, any> {
  _goBack() {
    this.props.navigation.goBack();
  }
  UNSAFE_componentWillMount() {
    this.props.setQuestionWithOptions();
    let fubi = this.props.FUBUBIVIV;
    if (this.props.FUBUBIVIV && this.props.FUBUBIVIV.CODIGO == '') {
      this.goHomeLocation();
    }
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content
            title="Administrar Vivienda"
            subtitle={this.props.FUBUBIVIV.CODIGO}
          />
        </Appbar.Header>
        <List.Section>
          <List.Item
            title="Ubicación de la vivienda"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.gray} />
            )}
            right={() => <Text style={styles.numberIndicator}>01</Text>}
            onPress={() => this.goHomeLocation()}
          />
          <View style={styles.divisor} />
          {this.props.FUBUBIVIV && this.props.FUBUBIVIV.CODIGO !== ''
            ? [
                <List.Item
                  onPress={() => this.goFamilyScreen()}
                  title="Nucleo Familiar"
                  left={() => (
                    <List.Icon icon="account-group" color={theme.colors.gray} />
                  )}
                />,
                <View style={styles.divisor} />,
              ]
            : null}
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
const styles = StyleSheet.create({
  divisor: {height: 1, backgroundColor: theme.colors.light},
  numberIndicator: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.secondaryFont,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
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
