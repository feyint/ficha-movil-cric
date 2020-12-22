/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BTextInput,
  BPicker,
  ButtonAction,
  BRow
} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getEntitySelect, getLasHouseCode} from '../state/actions';
import {PickerType} from '../../../core/utils/types';
import Geolocation from '@react-native-community/geolocation';
import {setFUBUBIVIV} from '../../../state/house/actions';
import {FieldValidator} from '../../../providers';
import {
  useFUBUBIVIV,
  useFUCBARVER,
  useFUCDEPART,
  useFUCMUNICI,
  useFUCRESGUA,
  useFUCTIPTER,
  useFUCZONCUI,
} from '../../../hooks';
import {getSelectSchema} from '../../../core/utils/utils';
import {FUBUBIVIV} from '../../../types';
import {Button} from 'react-native-paper';

interface GeolocationData {
  latitude: string;
  longitude: string;
}
const schemaForm = yup.object().shape({
  department: yup.number().required(),
  municipality: yup.number().required(),
  territoryType: FieldValidator.required(yup, 'Tipo de territorio'),
  shelterOrCouncil: FieldValidator.required(yup, 'Centro poblado'),
  sidewalk: FieldValidator.required(yup, 'Barrio o Vereda'),
  carezone: yup.mixed().optional(),
  latitude: yup.string().optional(),
  longitude: yup.string().optional(),
  address: FieldValidator.required(yup, 'Direccion'),
  housingCode: yup.string().optional(),
});

const _HomeLocationForm = (props: any) => {
  const navigation = useNavigation();
  const [position, setPosition] = useState<GeolocationData>({
    latitude: '',
    longitude: '',
  });
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const {listFUCDEPART, getAllFUCDEPART} = useFUCDEPART();
  const {listFUCMUNICI, getFUCMUNICIFromDept} = useFUCMUNICI();
  const {listFUCTIPTER, getAllFUCTIPTER} = useFUCTIPTER();
  const {listFUCRESGUA, getFilterFUCRESGUA} = useFUCRESGUA();
  const {
    listFUCBARVER,
    itemFUCBARVER,
    getFUCBARVERbyID,
    filterFUCBARVER,
  } = useFUCBARVER();
  const {listFUCZONCUI, filterFUCZONCUI} = useFUCZONCUI();
  const {
    itemFUBUBIVIV,
    itemFUBUBIVIVDETAILS,
    createFUBUBIVIV,
    updateFUBUBIVIV,
    getLastCode,
    getFUBUBIVIVDETAILS,
  } = useFUBUBIVIV();
  //OLD
  const [department, setDepartment] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [originalhouseCode, setoriginalHouseCode] = useState('');
  const [houseCode, setHouseCode] = useState('');
  const [tipoterritorio, setTipoterritorio] = useState('-1');
  const [centropoblado, setCentropoblado] = useState('');
  const [tipoterritorioLabel, setTipoterritorioLabel] = useState('');
  const [barrioVereda, setBarrioVereda] = useState('');
  const [zonacuidado, setZonacuidado] = useState('');
  const [address, setAddress] = useState('');
  const [FUCZONCUIItems, setFUCZONCUIItems] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [municipioSelect, setMunicipioSelect] = useState<PickerType[]>([]);
  const [tipoterritorioSelect, setTipoterritorioSelect] = useState<
    PickerType[]
  >([]);
  const [departamentoSelect, setDepartamentoSelect] = useState<PickerType[]>(
    [],
  );
  const [barrioVeredaSelect, setBarrioVeredaSelect] = useState<PickerType[]>(
    [],
  );
  const [rescentropSelect, setrescentropSelect] = useState<PickerType[]>([]);
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (itemFUBUBIVIV) {
      props.setFUBUBIVIV(itemFUBUBIVIV);
      navigation.goBack();
    }
  }, [itemFUBUBIVIV]);
  useEffect(() => {
    if (listFUCDEPART) {
      let result = getSelectSchema(listFUCDEPART);
      setDepartamentoSelect(result);
    }
  }, [listFUCDEPART]);
  useEffect(() => {
    if (listFUCMUNICI) {
      setMunicipioSelect(getSelectSchema(listFUCMUNICI));
    }
  }, [listFUCMUNICI]);
  useEffect(() => {
    if (listFUCRESGUA) {
      setrescentropSelect(getSelectSchema(listFUCRESGUA));
    }
  }, [listFUCRESGUA]);
  useEffect(() => {
    if (listFUCBARVER) {
      setBarrioVeredaSelect(getSelectSchema(listFUCBARVER));
    }
  }, [listFUCBARVER]);
  useEffect(() => {
    if (listFUCTIPTER) {
      setTipoterritorioSelect(getSelectSchema(listFUCTIPTER));
    }
  }, [listFUCTIPTER]);
  useEffect(() => {
    if (listFUCZONCUI) {
      setFUCZONCUIItems(getSelectSchema(listFUCZONCUI));
    }
  }, [listFUCZONCUI]);
  useEffect(() => {
    if (itemFUCBARVER) {
      filterFUCBARVER(itemFUCBARVER.FUCRESGUA_ID);
    }
  }, [itemFUCBARVER]);
  useEffect(() => {
    if (itemFUBUBIVIVDETAILS) {
      filterFUCZONCUI(itemFUBUBIVIVDETAILS.FUCBARVER_ID);
      setZonacuidado('' + itemFUBUBIVIVDETAILS.FUCZONCUI_ID);
      setBarrioVereda('' + itemFUBUBIVIVDETAILS.FUCBARVER_ID);
      getFUCBARVERbyID(itemFUBUBIVIVDETAILS.FUCBARVER_ID);
      setTipoterritorio('' + itemFUBUBIVIVDETAILS.FUCTIPTER_ID);
      changeLabelType(itemFUBUBIVIVDETAILS.CODIGOTERRITORIO);
      getFilterFUCRESGUA(
        itemFUBUBIVIVDETAILS.FUCMUNICI_ID,
        itemFUBUBIVIVDETAILS.FUCTIPTER_ID,
      );
      getAllFUCDEPART();
      setCentropoblado('' + itemFUBUBIVIVDETAILS.FUCRESGUA_ID);
      getFUCMUNICIFromDept(itemFUBUBIVIVDETAILS.FUCDEPART_ID);
      setMunicipio('' + itemFUBUBIVIVDETAILS.FUCMUNICI_ID);
      setDepartment('' + itemFUBUBIVIVDETAILS.FUCDEPART_ID);
      setValue('carezone', '' + itemFUBUBIVIVDETAILS.FUCZONCUI_ID);
      setValue('department', '' + itemFUBUBIVIVDETAILS.FUCDEPART_ID);
      setValue('municipality', '' + itemFUBUBIVIVDETAILS.FUCMUNICI_ID);
      setValue('territoryType', '' + itemFUBUBIVIVDETAILS.FUCTIPTER_ID);
      setValue('sidewalk', '' + itemFUBUBIVIVDETAILS.FUCRESGUA_ID);
      setValue('shelterOrCouncil', '' + itemFUBUBIVIVDETAILS.FUCBARVER_ID);
    }
  }, [itemFUBUBIVIVDETAILS]);
  async function fetchQuestions() {
    getAllFUCDEPART();
    getAllFUCTIPTER();
    if (props.FUBUBIVIV.CODIGO !== '') {
      getFUBUBIVIVDETAILS(props.FUBUBIVIV.ID);
      setoriginalHouseCode(props.FUBUBIVIV.CODIGO);
      setPosition({
        latitude: '' + props.FUBUBIVIV.COORDENADA_X,
        longitude: '' + props.FUBUBIVIV.COORDENADA_Y,
      });
      setValue('latitude', '' + props.FUBUBIVIV.COORDENADA_X);
      setValue('longitude', '' + props.FUBUBIVIV.COORDENADA_Y);
      setValue('address', '' + props.FUBUBIVIV.DIRECCION);
      setAddress(props.FUBUBIVIV.DIRECCION);
      setHouseCode(props.FUBUBIVIV.CODIGO);
    } else {
      getCurrentPosition();
    }
  }

  async function getCurrentPosition() {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: '' + pos.coords.latitude,
          longitude: '' + pos.coords.longitude,
        });
        setValue('latitude', '' + pos.coords.latitude);
        setValue('longitude', '' + pos.coords.longitude);
      },
      (e) => {
        Alert.alert('location ERROR', JSON.stringify(e));
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  async function onChangeDept(idDept: any) {
    getFUCMUNICIFromDept(idDept);
    onChangeMuni(null, null);
  }
  async function onChangeMuni(munid: any, typeid: any) {
    if (munid && typeid) {
      getFilterFUCRESGUA(munid, typeid);
      setValue('shelterOrCouncil', '');
      setBarrioVereda('');
      setValue('sidewalk', '');
      setZonacuidado('');
      setBarrioVeredaSelect([]);
      setFUCZONCUIItems([]);
      setValue('carezone', '');
      setCentropoblado('');
    } else {
      setValue('municipality', '');
      setMunicipio('');
      setrescentropSelect(getSelectSchema([]));
      onChangeCentroOResgua(null);
    }
  }
  async function onChangeTypeTerr(typeid: any) {
    getFilterFUCRESGUA(parseInt(municipio, 10), typeid);
    setValue('shelterOrCouncil', '');
    setBarrioVereda('');
    setValue('sidewalk', '');
    setZonacuidado('');
    setValue('carezone', '');
    setCentropoblado('');
    onChangeCentroOResgua(null);
    await changeLabelType(typeid);
  }
  async function changeLabelType(codigo: string) {
    if (codigo == '1') {
      await setTipoterritorioLabel('Resguardo o cabildo');
    } else {
      await setTipoterritorioLabel('Centro poblado');
    }
  }
  async function onChangeCentroOResgua(resguaId: any) {
    if (resguaId) {
      filterFUCBARVER(resguaId);
      for (let i = 0; i < rescentropSelect.length; i++) {
        const item: any = rescentropSelect[i];
        if (item.item && item.item.ID == resguaId) {
          let newCode = await getLastCode(item.item.CODIGO);
          setHouseCode(newCode);
          setValue('housingCode', `${newCode}`);
        }
      }
    } else {
      setBarrioVeredaSelect(getSelectSchema([]));
      setBarrioVereda('');
      setValue('sidewalk', '', {shouldValidate: true});
      setBarrioVereda('');
      onChangeBarrioVereda(null);
    }
  }
  async function onChangeBarrioVereda(FUCBARVER_ID: any) {
    if (FUCBARVER_ID) {
      filterFUCZONCUI(parseInt(FUCBARVER_ID, 10));
    } else {
      setZonacuidado('-1');
      setValue('carezone', '');
      setFUCZONCUIItems(getSelectSchema([]));
    }
  }
  const onSubmit = async (data: any) => {
    if (props.FUBUBIVIV.CODIGO !== '') {
      let _item: FUBUBIVIV = props.FUBUBIVIV;
      _item.COORDENADA_X = position.latitude;
      _item.COORDENADA_Y = position.longitude;
      _item.DIRECCION = data.address;
      _item.FUCZONCUI_FUCBARVER_ID = JSON.parse(data.carezone);
      updateFUBUBIVIV(_item);
    } else {
      // SAVE
      let item: FUBUBIVIV = {
        ID: -1,
        CODIGO: houseCode,
        COORDENADA_X: position.latitude,
        COORDENADA_Y: position.longitude,
        DIRECCION: data.address,
        FUCZONCUI_FUCBARVER_ID: JSON.parse(data.carezone),
      };
      createFUBUBIVIV(item);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              label="Codigo de vivienda"
              disabled={true}
              error={errors.housingCode}
              value={houseCode}
              onChange={(valueC: any) => {
                onChange(valueC);
              }}
            />
          )}
          name="housingCode"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Departamento"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.department}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  setDepartment(value);
                  onChangeDept(value);
                }
              }}
              onLoad={() => {
                // todo
              }}
              selectedValue={department}
              items={departamentoSelect}
            />
          )}
          name="department"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Municipio"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.municipality}
              onChange={(value: any) => {
                onChange(value);
                setMunicipio(value);
                onChangeMuni(value, tipoterritorio);
              }}
              selectedValue={municipio}
              items={municipioSelect}
            />
          )}
          name="municipality"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Tipo de Territorio"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.territoryType}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  setTipoterritorio(value);
                  onChangeTypeTerr(value);
                }
              }}
              selectedValue={tipoterritorio}
              items={tipoterritorioSelect}
            />
          )}
          name="territoryType"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={tipoterritorioLabel}
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.shelterOrCouncil}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  setCentropoblado(value);
                  onChangeCentroOResgua(value);
                }
              }}
              selectedValue={centropoblado}
              items={rescentropSelect}
            />
          )}
          name="shelterOrCouncil"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Barrio o vereda"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.sidewalk}
              onChange={(value: any) => {
                onChange(value);
                setBarrioVereda(value);
                onChangeBarrioVereda(value);
              }}
              selectedValue={barrioVereda}
              items={barrioVeredaSelect}
            />
          )}
          name="sidewalk"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Zona de cuidado"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.carezone}
              onChange={(value: any) => {
                onChange(value);
                setZonacuidado(value);
              }}
              selectedValue={zonacuidado}
              items={FUCZONCUIItems}
            />
          )}
          name="carezone"
        />
        <BRow>
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BTextInput
                style={styles.input}
                value={position.latitude}
                label="Latitud"
                disabled={false}
                error={errors.latitude}
                onChange={(value: any) => {
                  onChange(value);
                  setPosition({
                    ...position,
                    latitude: value,
                  });
                }}
              />
            )}
            name="latitude"
          />
          <Controller
            value={position.longitude}
            control={control}
            render={({onChange, value}) => (
              <BTextInput
                style={styles.input}
                value={position.longitude}
                label="Longitud"
                disabled={false}
                error={errors.longitude}
                onChange={(value: any) => {
                  onChange(value);
                  setPosition({
                    ...position,
                    longitude: value,
                  });
                }}
              />
            )}
            name="longitude"
          />
        </BRow>
        <Button
          icon="map-marker"
          mode="text"
          onPress={() => getCurrentPosition()}>
          obtener coordenadas
        </Button>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              value={address}
              label="Dirección"
              disabled={false}
              error={errors.address}
              onChange={(value: any) => {
                onChange(value);
                setAddress(value);
              }}
            />
          )}
          name="address"
        />
        <ButtonAction
          acceptMsg={
            props.FUBUBIVIV.CODIGO == ''
              ? 'Guardar Cambios'
              : 'Actualizar Registro'
          }
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  input: {
    width: '50%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  spacer: {
    height: 70,
  },
  empty: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 100,
  },
});
const mapDispatchToProps = {
  getEntitySelect,
  getLasHouseCode,
  setFUBUBIVIV,
};
const mapStateToProps = (housing: any) => {
  return {
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(_HomeLocationForm);
