/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {FamilyList} from '../form';
import {connect} from 'react-redux';
import {setFNBNUCVIV, clearFNBNUCVIV} from '../../../state/house/actions';
import {HousingService} from '../../../services';
import {setConditionQuestionWithOptions} from '../../../state/ConditionPerson/actions';
import {setQuestionWithOptions} from '../../../state/person/actions';
import {setSexAndRepHealthQuestionWithOptions} from '../../../state/SexAndRepHealthPerson/actions';
import BFabButton from '../../../core/components/BFabButton';
import {FNBNUCVIV} from '../../../types/FNBNUCVIV';
import {useNavigation} from '@react-navigation/native';
import {useFNBNUCVIV} from '../../../hooks';

const FamilyScreen = (props: any) => {
  const [families, setFamilies] = useState<FNBNUCVIV[]>([]);
  const navigation = useNavigation();
  const {listFNBNUCVIV, filterFNBNUCVIV} = useFNBNUCVIV();

  useEffect(() => {
    // setHouses(listFUBUBIVIV);
  }, [families]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFamilies();
    });
    return unsubscribe;
  }, [navigation]);

  //TODO añadir el back interceptor
  function _goBack() {
    props.navigation.goBack();
  }
  // async function UNSAFE_componentWillMount() {
  //   //props.setQuestionWithOptions();
  //   //props.setConditionQuestionWithOptions();
  //   //props.setSexAndRepHealthQuestionWithOptions();
  // }

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => _goBack()} />
        <Appbar.Content title="Nucleo Familiar" />
      </Appbar.Header>
      <FamilyList
        families={listFNBNUCVIV}
        onPress={(family: any) => {
          goHouseMenuScreen(family);
        }}
      />
      <BFabButton onPress={() => createNewNF()} />
    </View>
  );

  async function fetchFamilies() {
    // console.error(props.FUBUBIVIV.ID);
    filterFNBNUCVIV(props.FUBUBIVIV.ID);
  }
  function createNewNF() {
    props.clearFNBNUCVIV();
    props.navigation.navigate('HouseMenuScreen');
    // props.navigation.navigate('HouseMenuScreen', {
    //   onGoBack: async () => {
    //     await fetchFamilies();
    //   },
    // });
  }
  async function goHouseMenuScreen(family: any) {
    await props.setFNBNUCVIV(family);
    props.navigation.navigate('HouseMenuScreen');
  }
};
const mapDispatchToProps = {
  setFNBNUCVIV,
  clearFNBNUCVIV,
  //setQuestionWithOptions,
  setConditionQuestionWithOptions,
  setSexAndRepHealthQuestionWithOptions,
};
const mapStateToProps = (housing: any) => {
  return {
    FUBUBIVIV: housing.housing.FUBUBIVIV,
    FNCSALREP: housing.housing.FNCSALREP,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyScreen);
