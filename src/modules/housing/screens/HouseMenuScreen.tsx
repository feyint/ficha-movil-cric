/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setFNBNUCVIV} from '../../../state/house/actions';
import {theme} from '../../../core/style/theme';
import {useFNBNUCVIV} from '../../../hooks';
import {FNBNUCVIV} from '../../../types';

const HouseMenuScreen = (props: any) => {
  const [CODIGO, setCodigo] = useState('');
  const {
    itemFNBNUCVIV,
    loadingFNBNUCVIV,
    getLastNucleoCode,
    createFNBNUCVIV,
    getFNBNUCVIVbyID,
  } = useFNBNUCVIV();
  const navigation = useNavigation();
  useEffect(() => {
    inicialize();
  }, []);
  useEffect(() => {
    if (itemFNBNUCVIV) {
      props.setFNBNUCVIV(itemFNBNUCVIV);
      setCodigo(itemFNBNUCVIV.CODIGO);
    }
  }, [itemFNBNUCVIV]);
  async function inicialize() {
    if (props.FNBNUCVIV.CODIGO == '') {
      let NFCODIGO = await getLastNucleoCode(
        props.FUBUBIVIV.ID,
        props.FUBUBIVIV.CODIGO,
      );
      let fNBNUCVIV: FNBNUCVIV = {
        CODIGO: NFCODIGO,
        FUBUBIVIV_ID: props.FUBUBIVIV.ID,
      };
      createFNBNUCVIV(fNBNUCVIV);
    } else {
      getFNBNUCVIVbyID(props.FNBNUCVIV.ID);
    }
  }
  function _goBack() {
    navigation.goBack();
  }
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => _goBack()} />
        <Appbar.Content title="Vivienda" subtitle={CODIGO} />
      </Appbar.Header>
      <List.Section>
        <List.Item
          key="vivienda"
          title="Vivienda"
          left={() => <List.Icon icon="home" color={theme.colors.gray} />}
          onPress={() => goHouseScreen()}
        />
        <View style={styles.divisor} />
        <List.Item
          key="Estado"
          title="Estado de la vivienda"
          left={() => <List.Icon icon="home-alert" color={theme.colors.gray} />}
          onPress={() => goHousingStatusScreen()}
        />
        <View style={styles.divisor} />
        <List.Item
          key="condiciones"
          title="Condiciones de la vivienda"
          left={() => <List.Icon icon="home-heart" color={theme.colors.gray} />}
          onPress={() => goHouseContitionsScreen()}
        />
        <View style={styles.divisor} />
        <List.Item
          key="datos"
          title="Datos del encuestador"
          left={() => <List.Icon icon="account" color={theme.colors.gray} />}
          onPress={() => goPollsterScreen()}
        />
        <View style={styles.divisor} />
        <List.Item
          key="managep"
          title="Administrar personas"
          left={() => (
            <List.Icon icon="account-group" color={theme.colors.gray} />
          )}
          onPress={() => goPersonManageScreen()}
        />
        <View style={styles.divisor} />
      </List.Section>
    </View>
  );
  function goHomeLocation() {
    props.navigation.navigate('HomeLocationScreen');
  }
  function goPollsterScreen() {
    props.navigation.navigate('PollsterScreen');
  }
  function goHouseScreen() {
    props.navigation.navigate('HouseScreen');
  }
  function goHousingStatusScreen() {
    props.navigation.navigate('HousingStatusScreen');
  }
  function goHouseContitionsScreen() {
    props.navigation.navigate('HouseConditionsScreen');
  }
  function goPersonManageScreen() {
    props.navigation.navigate('PersonManageScreen');
  }
};
const styles = StyleSheet.create({
  divisor: {height: 1, backgroundColor: theme.colors.light},
});
const mapDispatchToProps = {
  setFNBNUCVIV,
};
const mapStateToProps = (housing: any) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HouseMenuScreen);
