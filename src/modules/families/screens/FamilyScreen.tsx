/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Appbar, Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {FamilyList} from '../form';
import {connect} from 'react-redux';
import {setFNBNUCVIV, clearFNBNUCVIV} from '../../../state/house/actions';
import BFabButton from '../../../core/components/BFabButton';
import {useNavigation} from '@react-navigation/native';
import {useFNBNUCVIV} from '../../../hooks';
import {Bloader, BPicker, BRadioButton} from '../../../core/components';
import {getSelectSchema} from '../../../core/utils/utils';

const FamilyScreen = (props: any) => {
  const createOption = [
    {value: true, label: 'Sí'},
    {value: false, label: 'No'},
  ];
  const navigation = useNavigation();
  const {
    loadingFNBNUCVIV,
    listFNBNUCVIV,
    filterFNBNUCVIV,
    cloneFNBNUCVIV,
  } = useFNBNUCVIV();
  const [visible, setVisible] = React.useState(false);
  const [diffByNucleo, setDiff] = React.useState(false);
  const [selectFNBNUCVIV, setNUCVIV] = React.useState<any>();
  const [enableModal, setEnablemodal] = React.useState<boolean>(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFamilies();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    var item = listFNBNUCVIV[listFNBNUCVIV.length - 1];
    if (item && listFNBNUCVIV.length > 0) {
      setNUCVIV('' + item.ID);
      setEnablemodal(true);
    } else {
      setEnablemodal(false);
    }
  }, [listFNBNUCVIV]);
  function _goBack() {
    props.navigation.goBack();
  }
  function duplicateNUCVIV() {
    hideDialog();
    if (selectFNBNUCVIV) {
      listFNBNUCVIV.forEach(async (fNBNUCVIV) => {
        if (fNBNUCVIV.ID == selectFNBNUCVIV) {
          let created = await cloneFNBNUCVIV(
            fNBNUCVIV,
            props.FUBUBIVIV.ID,
            props.FUBUBIVIV.CODIGO,
          );
          hideDialog();
          if (created) {
            goHouseMenuScreen(created);
          }
        }
      });
    }
  }
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
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Crear nuevo nucleo familiar</Dialog.Title>
            <Dialog.Content>
              <BRadioButton
                value={diffByNucleo}
                label="Diferenciar datos de vivienda por núcleo familiar?"
                items={createOption}
                onChange={(value: any) => {
                  setDiff(value);
                }}
              />
              {diffByNucleo === 'true' ? (
                <View>
                  <Paragraph>
                    'Seleccione el nucleo Núcleo familiar que quiere reusar la
                    información'
                  </Paragraph>
                  <BPicker
                    label="Nucleos familiares"
                    prompt="Seleccione una opción"
                    onChange={(value: any) => {
                      setNUCVIV(value);
                    }}
                    selectedValue={selectFNBNUCVIV}
                    items={getSelectSchema(listFNBNUCVIV, false)}
                  />
                </View>
              ) : (
                <Paragraph> 'Se creara un nucleo familiar vacio' </Paragraph>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancelar</Button>
              <Button onPress={duplicateNUCVIV}>Crear</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <Bloader visible={loadingFNBNUCVIV} />
    </View>
  );

  async function fetchFamilies() {
    // console.error(props.FUBUBIVIV.ID);
    filterFNBNUCVIV(props.FUBUBIVIV.ID);
  }

  function createNewNF() {
    if (enableModal) {
      showDialog();
    } else {
      props.clearFNBNUCVIV();
      props.navigation.navigate('HouseMenuScreen');
    }
  }
  async function goHouseMenuScreen(family: any) {
    await props.setFNBNUCVIV(family);
    props.navigation.navigate('HouseMenuScreen');
  }
};
const mapDispatchToProps = {
  setFNBNUCVIV,
  clearFNBNUCVIV,
};
const mapStateToProps = (housing: any) => {
  return {
    FUBUBIVIV: housing.housing.FUBUBIVIV,
    FNCSALREP: housing.housing.FNCSALREP,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyScreen);
