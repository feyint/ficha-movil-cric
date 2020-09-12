import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BTextInput, BPicker, AlertBox, BButton} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getEntitySelect, getLasHouseCode} from '../state/actions';
import {SelectSchema} from '../../../core/utils/types';
import Geolocation from '@react-native-community/geolocation';
import {saveFUBUBIVIV} from '../../../state/house/actions';
import {FUBUBIVIV} from '../../../state/house/types';
import {HousingService} from '../../../services';

interface GeolocationData {
  latitude: number;
  longitude: number;
}
const schemaForm = yup.object().shape({
  department: yup.string().required(),
  municipality: yup.string().required(),
  territoryType: yup.string().required(),
  shelterOrCouncil: yup.string().required(),
  sidewalk: yup.string().required(),
  latitude: yup.string().required(),
  longitude: yup.string().required(),
  address: yup.string().required(),
  housingCode: yup.string().optional(),
});

const _HomeLocationForm = (props: any) => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [position, setPosition] = useState<GeolocationData>({
    latitude: 0,
    longitude: 0,
  });
  const {handleSubmit, control, errors, getValues, setValue} = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      department: '1', // Cauca 8
      territoryType: '',
      housingCode: '',
    },
  });
  const [state, setState] = useState({
    departamentoSelect: {id: 0, name: '', children: []} as SelectSchema,
    tipoterritorioSelect: {id: 0, name: '', children: []} as SelectSchema,
    isresguardo: false,
    municipioSelect: {id: 0, name: '', children: []} as SelectSchema,
    resguardoSelect: {id: 0, name: '', children: []} as SelectSchema,
    centropobladoSelect: {id: 0, name: '', children: []} as SelectSchema,
  });
  const [municipio, setMunicipio] = useState('');
  const [houseCode, setHouseCode] = useState({secuense: 0, code: ''});
  const [tipoterritorio, setTipoterritorio] = useState('-1');
  const [tipoterritorioLabel, setTipoterritorioLabel] = useState('');
  const [barrioVereda, setBarrioVereda] = useState({
    id: 0,
    name: '',
    children: [],
  });
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMunicipio();
  }, [municipio]);

  async function fetchQuestions() {
    let FUCDEPART = await props.getEntitySelect('FUCDEPART');
    let FUCTIPTER = await props.getEntitySelect('FUCTIPTER');
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      'FUCDEPART_ID',
      getValues().department,
    );
    setState({
      ...state,
      tipoterritorioSelect: FUCTIPTER,
      departamentoSelect: FUCDEPART,
      municipioSelect: FUCMUNICI,
    });
    setTimeout(() => {
      getDefaultValues();
    });
  }
  async function getDefaultValues() {
    console.error(props.FUBUBIVIV);
    if (props.FUBUBIVIV.CODIGO !== '') {
      setValue('latitude', '' + props.FUBUBIVIV.COORDENADA_X);
      setValue('longitude', '' + props.FUBUBIVIV.COORDENADA_Y);
      setValue('address', props.FUBUBIVIV.DIRECCION);
      setValue('housingCode', props.FUBUBIVIV.CODIGO);
      let FUCBARVER_ID = props.FUBUBIVIV.FUCBARVER_ID;
      let service: HousingService = new HousingService();
      let barver = await service.getUbicationEntity(
        'FUCBARVER',
        'ID',
        FUCBARVER_ID,
        null,
        null,
        true,
      );
      let cenpoblado = await service.getUbicationEntity(
        'FUCRESGUA',
        'ID',
        barver.FUCRESGUA_ID,
        null,
        null,
        true,
      );
      let munici = await service.getUbicationEntity(
        'FUCMUNICI',
        'ID',
        cenpoblado.FUCMUNICI_ID,
        null,
        null,
        true,
      );
      let dept = await service.getUbicationEntity(
        'FUCDEPART',
        'ID',
        munici.FUCDEPART_ID,
        null,
        null,
        true,
      );
      setValue('department', '' + dept.ID);
      //setValue('municipality', '' + munici.ID);
      //setMunicipio('' + munici.ID);
      //onChangeDept('' + munici.ID);
      console.error(barver);
      console.error(cenpoblado);
      console.error(munici);
      console.error(dept);
    } else {
      getCurrentPosition();
    }
  }
  async function getCurrentPosition() {
    Geolocation.getCurrentPosition(
      (pos) => {
        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setValue('latitude', '' + pos.coords.latitude);
        setValue('longitude', '' + pos.coords.longitude);
      },
      (e) => setError(e.message),
    );
  }
  async function useMunicipio() {
    setTipoterritorio('-1');
    setValue('territoryType', '-1');
    setState({
      ...state,
      resguardoSelect: {id: 0, name: '', children: []},
    });
  }
  async function onChangeDept(idDept: any) {
    console.log('se llamaaaaaaaaaaaaaaa');
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      'FUCDEPART_ID',
      idDept,
    );
    setState({
      ...state,
      municipioSelect: FUCMUNICI,
    });
    setValue('municipality', '-1');
    setMunicipio('-1');
  }
  async function onChangeMuni(munid, typeid = '') {
    let FUCRESGUA = await props.getEntitySelect(
      'FUCRESGUA',
      'FUCMUNICI_ID',
      munid,
      'FUCTIPRES_ID',
      typeid !== '' ? typeid : tipoterritorio,
    );
    setState({
      ...state,
      resguardoSelect: FUCRESGUA,
    });
    setMunicipio(munid);
    setTipoterritorio(typeid);
  }
  async function onChangeTypeTerr(typeid: any) {
    if (typeid == '1') {
      typeid = '3';
    } else {
      typeid = '2';
    }
    onChangeMuni(municipio, typeid);
    await changeLabelType(typeid);
  }
  async function changeLabelType(typeid: any) {
    if (typeid == '3') {
      await setTipoterritorioLabel('Resguardo o cabildo');
    } else {
      await setTipoterritorioLabel('Centro poblado');
    }
  }
  async function onChangeCentroOResgua(resguaId: any) {
    if (resguaId) {
      let FUCBARVER = await props.getEntitySelect(
        'FUCBARVER',
        'FUCRESGUA_ID',
        resguaId,
      );
      setBarrioVereda(FUCBARVER);
      for (let i = 0; i < state.resguardoSelect.children.length; i++) {
        const item = state.resguardoSelect.children[i];
        if (item.item && item.item.ID == resguaId) {
          console.log('item  ', item.item.CODIGO);
          let ress = await props.getLasHouseCode(item.item.CODIGO);
          setValue('housingCode', `${item.item.CODIGO}-${ress}`);
          console.log('ress ', ress);
        }
      }
    }
  }
  const onSubmit = async (data: any) => {
    if (props.FUBUBIVIV.CODIGO !== '') {
    } else {
      console.log(data);
      let item: FUBUBIVIV = {
        CODIGO: data.housingCode,
        COORDENADA_X: position.latitude,
        COORDENADA_Y: data.longitude,
        DIRECCION: data.address,
        FUCBARVER_ID: JSON.parse(data.sidewalk),
      };
      await props.saveFUBUBIVIV(item);
      navigation.goBack();
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Codigo de vivienda"
              disabled={true}
              onBlur={onBlur}
              error={errors.housingCode}
              onChange={(value) => onChange(value)}
              value={value}
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
                  onChangeDept(value);
                }
              }}
              onLoad={() => {
                // todo
              }}
              value={value}
              selectedValue={value}
              items={state.departamentoSelect.children}
            />
          )}
          defaultValue=""
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
              onChange={(value) => {
                onChange(value);
                onChangeMuni(value);
              }}
              value={value}
              selectedValue={value}
              items={state.municipioSelect.children}
            />
          )}
          defaultValue=""
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
              onChange={(value) => {
                onChange(value);
                onChangeTypeTerr(value);
              }}
              value={value}
              selectedValue={value}
              items={state.tipoterritorioSelect.children}
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
              onChange={(value) => {
                onChange(value);
                onChangeCentroOResgua(value);
              }}
              value={value}
              selectedValue={value}
              items={state.resguardoSelect.children}
            />
          )}
          defaultValue=""
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
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={barrioVereda.children}
            />
          )}
          defaultValue=""
          name="sidewalk"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="CoordenadasX"
              disabled={false}
              onBlur={onBlur}
              error={errors.longitude}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          defaultValue=""
          name="longitude"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="CoordenadasY"
              disabled={false}
              onBlur={onBlur}
              error={errors.latitude}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          defaultValue=""
          name="latitude"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Dirección"
              disabled={false}
              onBlur={onBlur}
              error={errors.address}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          defaultValue=""
          name="address"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
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
  saveFUBUBIVIV,
};
const mapStateToProps = (housing: any) => {
  return {
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(_HomeLocationForm);
