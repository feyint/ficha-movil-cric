import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props {
  navigation: NavigationProp<any>;
}
class ViewPersonScreen extends Component<any, any> {
  _goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <KeyboardAwareScrollView>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => this._goBack()} />
            <Appbar.Content title="Ver persona" />
          </Appbar.Header>
          <List.Section>
            <List.Item
              title="1. Nucleo Familiar al que pertenece"
              left={() => <List.Icon icon="home-heart" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              //onPress={() => this.goFamilyScreen() /*this.goHouseMenuScreen()*/}
              title="2. Datos personales   -   Consecutivo: 1 "
              left={() => <List.Icon icon="account-box" />}
            />
            <List.Item
              title="3. Datos de nacimiento"
              left={() => <List.Icon icon="baby-face" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="4. Seguridad social"
              left={() => <List.Icon icon="bottle-tonic-plus" />}
              onPress={() => this.goSocialSecurityScreen()}
            />
            <List.Item
              title="5. Datos de contacto"
              left={() => <List.Icon icon="card-account-phone" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="6. Otros datos de identificación"
              left={() => <List.Icon icon="card-account-mail" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="7. Informacion de salud"
              left={() => <List.Icon icon="bottle-tonic-plus-outline" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="8. Estado de salud en la visita"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.goHealthStatusVisitScreen()}
            />
            <List.Item
              title="9. Hábitos no saludables"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.goUnhealthyHabitsScreen()}
            />
            <List.Item
              title="10. Salud sexual y reproductiva - Antecedentes gineco obstétricos"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goLastPregnancyScreen()}
            />
            <List.Item
              title="11. Finalización de la última gestación"
              left={() => <List.Icon icon="map-marker" />}
              onPress={() => this.goLastPregnancyScreen()}
            />
            <List.Item
              title="12. Gestación actual"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="13. Otros datos de salud sexual y reproductiva"
              left={() => <List.Icon icon="map-marker" />}
              //onPress={() => this.goHomeLocation()}
            />
            <List.Item
              title="14. Mortalidad en los últimos 12 meses"
              left={() => <List.Icon icon="emoticon-dead" />}
              onPress={() => this.goMortalityLast12MonthsScreen()}
            />
          </List.Section>
        </KeyboardAwareScrollView>
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
}

export default ViewPersonScreen;
