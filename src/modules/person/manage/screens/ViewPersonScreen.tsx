import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {FNCPERSON} from '../../../../state/person/types';
import {FNBNUCVIV} from '../../../../state/house/types';

interface Props {
  navigation: NavigationProp<any>;
  FNCPERSON: FNCPERSON;
  FNBNUCVIV: FNBNUCVIV;
}
interface State {
  created: boolean;
}

class ViewPersonScreen extends Component<Props, State> {
  state = {
    created: false,
  };
  private _unsubscribe: any;
  _goBack() {
    this.props.navigation.goBack();
  }
  async UNSAFE_componentWillMount() {}
  componentDidMount() {
    if (!this.props.FNCPERSON.ID) {
      this.goPersonalInformation();
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        if (this.state.created) {
          if (!this.props.FNCPERSON.ID) {
            this.props.navigation.goBack();
          }
        } else {
          this.setState({
            created: true,
          });
        }
      });
    }
  }
  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
  render() {
    return (
      <View>
        <KeyboardAwareScrollView>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => this._goBack()} />
            <Appbar.Content title="Ver persona" />
          </Appbar.Header>
          <Text>
            {this.props.FNCPERSON.PRIMER_NOMBRE}{' '}
            {this.props.FNCPERSON.PRIMER_APELLIDO}
          </Text>
          <Text>Nucleo al que pertenece: {this.props.FNBNUCVIV.CODIGO}</Text>
          <List.Section>
            <List.Item
              onPress={() => this.goPersonalInformation()}
              title="Datos personales"
              left={() => <List.Icon icon="account-box" />}
            />
            <List.Item
              title="Datos de nacimiento"
              left={() => <List.Icon icon="baby-face" />}
              onPress={() => this.goBirthDataScreen()}
            />
            <List.Item
              title="Seguridad social"
              left={() => <List.Icon icon="bottle-tonic-plus" />}
              onPress={() => this.goSocialSecurityScreen()}
            />
            <List.Item
              title="Datos de contacto"
              left={() => <List.Icon icon="card-account-phone" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Otros datos de identificación"
              left={() => <List.Icon icon="card-account-mail" />}
              onPress={() => this.goOtherDataIdentificationScreen()}
            />
            <List.Item
              title="Informacion de salud"
              left={() => <List.Icon icon="bottle-tonic-plus-outline" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Estado de salud en la visita"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.goHealthStatusVisitScreen()}
            />
            <List.Item
              title="Hábitos no saludables"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.goUnhealthyHabitsScreen()}
            />
            <List.Item
              title="Salud sexual y reproductiva - Antecedentes gineco obstétricos"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goLastPregnancyScreen()}
            />
            <List.Item
              title="Finalización de la última gestación"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.goLastPregnancyScreen()}
            />
            <List.Item
              title="Gestación actual"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Otros datos de salud sexual y reproductiva"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="Mortalidad en los últimos 12 meses"
              left={() => <List.Icon icon="emoticon-dead" />}
              onPress={() => this.goMortalityLast12MonthsScreen()}
            />
          </List.Section>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  goPersonalInformation() {
    this.props.navigation.navigate('PersonalInformationScreen');
  }
  goHealthStatusVisitScreen() {
    this.props.navigation.navigate('HealthStatusVisitScreen');
  }
  goMortalityLast12MonthsScreen() {
    this.props.navigation.navigate('MortalityLast12MonthsScreen');
  }
  goSocialSecurityScreen() {
    this.props.navigation.navigate('SocialSecurityScreen');
  }
  goUnhealthyHabitsScreen() {
    this.props.navigation.navigate('UnhealthyHabitsScreen');
  }
  goLastPregnancyScreen() {
    this.props.navigation.navigate('LastPregnancyScreen');
  }
  goBirthDataScreen() {
    this.props.navigation.navigate('BirthDataScreen');
  }
  goOtherDataIdentificationScreen() {
    this.props.navigation.navigate('OtherIdentificationDataScreen');
  }
}

const mapStateToProps = (reducer: any) => {
  return {
    FNCPERSON: reducer.person.FNCPERSON,
    FNBNUCVIV: reducer.housing.FNBNUCVIV,
  };
};
export default connect(mapStateToProps, null)(ViewPersonScreen);
