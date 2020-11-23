/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {List} from 'react-native-paper';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {setFNCNCSALREP} from '../../../../state/SexAndRepHealthPerson/actions';
import {theme} from '../../../../core/style/theme';
import {FNBNUCVIV, FNCPERSON} from '../../../../types';
import {useFNCGENERO, useFNCPERSON} from '../../../../hooks';
import {setFNCPERSON} from '../../../../state/person/actions';
import {PersonParametersConst} from '../../../../core/utils/SystemParameters';

interface Props {
  FNCPERSON: FNCPERSON;
  FNBNUCVIV: FNBNUCVIV;
  setFNCNCSALREP: any;
}
const ViewPersonScreen = (props: any) => {
  const navigation = useNavigation();
  const {itemFNCPERSON, getFNCPERSONbyID} = useFNCPERSON();
  const {itemFNCGENERO, getbyID} = useFNCGENERO();
  const [created, setcreated] = useState<boolean>(false);
  const [enableSexReproductionHealt, setenableSexReproductionHealt] = useState<
    boolean
  >(false);
  useEffect(() => {
    if (itemFNCPERSON) {
      props.setFNCPERSON(itemFNCPERSON);
    }
  }, [itemFNCPERSON]);
  useEffect(() => {
    if (itemFNCGENERO) {
      if (itemFNCGENERO.CODIGO == PersonParametersConst.onlyGenrecode) {
        setenableSexReproductionHealt(true);
      }
    }
  }, [itemFNCGENERO]);
  useFocusEffect(() => {
    if (!props.FNCPERSON.ID) {
      if (created) {
        if (!props.FNCPERSON.ID) {
          navigation.goBack();
        }
      } else {
        setcreated(true);
        navigate('PersonalInformationScreen');
      }
    } else {
      getFNCPERSONbyID(props.FNCPERSON.ID);
      if (props.FNCPERSON.FNCGENERO_ID) {
        getbyID(props.FNCPERSON.FNCGENERO_ID);
      }
    }
  }, []);
  function _goBack() {
    navigation.goBack();
  }
  return (
    <View>
      <KeyboardAwareScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => _goBack()} />
          <Appbar.Content
            title="Ver persona"
            subtitle={`${props.FNCPERSON.PRIMER_NOMBRE} ${props.FNCPERSON.PRIMER_APELLIDO}`}
          />
        </Appbar.Header>

        <Text style={{fontSize: 16, padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>Nucleo familiar:</Text>{' '}
          {props.FNBNUCVIV.CODIGO}
        </Text>
        <List.Section>
          <List.Item
            title="Datos personales"
            left={() => (
              <List.Icon icon="account-box" color={theme.colors.gray} />
            )}
            onPress={() => navigate('PersonalInformationScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Datos de nacimiento"
            left={() => (
              <List.Icon icon="baby-face" color={theme.colors.gray} />
            )}
            onPress={() => navigate('BirthInformationScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Seguridad social"
            left={() => (
              <List.Icon icon="bottle-tonic-plus" color={theme.colors.gray} />
            )}
            onPress={() => navigate('SocialSecurityScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Datos de contacto"
            left={() => (
              <List.Icon icon="card-account-phone" color={theme.colors.gray} />
            )}
            onPress={() => navigate('ContactInformationScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Otros datos de identificación"
            left={() => (
              <List.Icon icon="card-account-mail" color={theme.colors.gray} />
            )}
            onPress={() => {
              props.FNCPERSON.FNCLUNIND_ID != null
                ? navigate('OtherIdentificationDataScreen')
                : Alert.alert(
                    'Accion no permitida',
                    'Debe seleccionar luna indigena en datos de nacimiento',
                  );
            }}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Informacion de salud"
            left={() => <List.Icon icon="bottle-tonic-plus-outline" />}
            onPress={() => navigate('HealthInformationScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Estado de salud en la visita"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.gray} />
            )}
            onPress={() => navigate('HealthStatusVisitScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Hábitos no saludables"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.gray} />
            )}
            onPress={() => navigate('UnhealthyHabitsScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Salud sexual y reproductiva"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.gray} />
            )}
            onPress={() => {
              enableSexReproductionHealt
                ? navigate('ReproductiveSexualHealtScreen')
                : Alert.alert(
                    'Acción no permitida',
                    'solo aplica para genero "Femenino"',
                  );
            }}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Finalización de la última gestación"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.gray} />
            )}
            onPress={() => navigate('LastPregnancyScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Gestación actual"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.gray} />
            )}
            onPress={() => navigate('CurrentPregnancyScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Otros datos de salud sexual y reproductiva"
            left={() => (
              <List.Icon icon="map-marker" color={theme.colors.gray} />
            )}
            onPress={() => navigate('AnotherReproductiveSexualHealtScreen')}
          />
          <View style={styles.divisor} />
          <List.Item
            title="Mortalidad en los últimos 12 meses"
            left={() => (
              <List.Icon icon="emoticon-dead" color={theme.colors.gray} />
            )}
            onPress={() => navigate('MortalityLast12MonthsScreen')}
          />
          <View style={styles.divisor} />
        </List.Section>
      </KeyboardAwareScrollView>
    </View>
  );

  function navigate(screen: string) {
    navigation.navigate(screen);
  }
};
const styles = StyleSheet.create({
  divisor: {height: 1, backgroundColor: theme.colors.light},
});
const mapDispatchToProps = {
  setFNCNCSALREP,
  setFNCPERSON,
};
const mapStateToProps = (reducer: any) => {
  return {
    FNCPERSON: reducer.person.FNCPERSON,
    FNBNUCVIV: reducer.housing.FNBNUCVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPersonScreen);
