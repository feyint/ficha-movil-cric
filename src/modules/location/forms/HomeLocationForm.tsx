import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BTextInput, BPicker, BButton} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getEntitySelect, getLasHouseCode} from '../state/actions';
import {SelectSchema} from '../../../core/utils/types';
import Geolocation from '@react-native-community/geolocation';
import {saveFUBUBIVIV, updateFUBUBIVIV} from '../../../state/house/actions';
import {FUBUBIVIV} from '../../../state/house/types';
import {HousingService} from '../../../services';

interface GeolocationData {
  latitude: string;
  longitude: string;
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
    latitude: '',
    longitude: '',
  });
  const {handleSubmit, control, errors, getValues, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [department, setDepartment] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [originalhouseCode, setoriginalHouseCode] = useState('');
  const [houseCode, setHouseCode] = useState('');
  const [tipoterritorio, setTipoterritorio] = useState('-1');
  const [centropoblado, setCentropoblado] = useState('');
  const [tipoterritorioLabel, setTipoterritorioLabel] = useState('');
  const [barrioVereda, setBarrioVereda] = useState('');
  const [address, setAddress] = useState('');
  const [municipioSelect, setMunicipioSelect] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });
  const [tipoterritorioSelect, setTipoterritorioSelect] = useState<
    SelectSchema
  >({
    id: 0,
    name: '',
    children: [],
  });
  const [departamentoSelect, setDepartamentoSelect] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });
  const [barrioVeredaSelect, setBarrioVeredaSelect] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });
  const [rescentropSelect, setrescentropSelect] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    // useMunicipio();
  }, [municipio]);
  async function fetchQuestions() {
    let FUCDEPART = await props.getEntitySelect('FUCDEPART');
    let FUCTIPTER = await props.getEntitySelect('FUCTIPTER');
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      'FUCDEPART_ID',
      getValues().department,
    );
    setDepartamentoSelect(FUCDEPART);
    setTipoterritorioSelect(FUCTIPTER);
    setMunicipioSelect(FUCMUNICI);
    getDefaultValues();
  }

  async function getDefaultValues() {
    if (props.FUBUBIVIV.CODIGO !== '') {
      setoriginalHouseCode(props.FUBUBIVIV.CODIGO);
      setPosition({
        latitude: '' + props.FUBUBIVIV.COORDENADA_X,
        longitude: '' + props.FUBUBIVIV.COORDENADA_Y,
      });
      setAddress(props.FUBUBIVIV.DIRECCION);
      setHouseCode(props.FUBUBIVIV.CODIGO);
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
      setDepartment('' + dept.ID);
      setMunicipio('' + munici.ID);
      setTipoterritorio('' + cenpoblado.FUCTIPRES_ID);
      if (cenpoblado.FUCTIPRES_ID == '1') {
        changeLabelType('3');
      } else {
        changeLabelType('2');
      }
      let FUCRESGUA = await props.getEntitySelect(
        'FUCRESGUA',
        'FUCMUNICI_ID',
        munici.ID,
        'FUCTIPRES_ID',
        cenpoblado.FUCTIPRES_ID,
      );
      setrescentropSelect(FUCRESGUA);
      setCentropoblado('' + cenpoblado.ID);
      let FUCBARVER = await props.getEntitySelect(
        'FUCBARVER',
        'FUCRESGUA_ID',
        cenpoblado.ID,
      );
      setBarrioVeredaSelect(FUCBARVER);
      setBarrioVereda('' + barver.ID);
      setValue('department', '' + dept.ID);
      setValue('municipality', '' + munici.ID);
      setValue('territoryType', '' + cenpoblado.FUCTIPRES_ID);
      setValue('shelterOrCouncil', '' + cenpoblado.ID);
      setValue('sidewalk', '' + barver.ID);
      setValue('latitude', '' + props.FUBUBIVIV.COORDENADA_X);
      setValue('longitude', '' + props.FUBUBIVIV.COORDENADA_Y);
      setValue('address', '' + props.FUBUBIVIV.DIRECCION);
    } else {
      await getCurrentPosition();
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
      (e) => setError(e.message),
    );
  }
  async function onChangeDept(idDept: any) {
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      'FUCDEPART_ID',
      idDept,
    );
    setMunicipioSelect(FUCMUNICI);
    setValue('municipality', '-1');
    setMunicipio('-1');
  }
  async function onChangeMuni(munid: string, typeid: string) {
    let FUCRESGUA = await props.getEntitySelect(
      'FUCRESGUA',
      'FUCMUNICI_ID',
      munid,
      'FUCTIPRES_ID',
      typeid,
    );
    setrescentropSelect(FUCRESGUA);
    setValue('shelterOrCouncil', '');
    setCentropoblado('');
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
      setBarrioVeredaSelect(FUCBARVER);
      for (let i = 0; i < rescentropSelect.children.length; i++) {
        const item: any = rescentropSelect.children[i];
        if (item.item && item.item.ID == resguaId) {
          let ress = await props.getLasHouseCode(item.item.CODIGO);
          setHouseCode(`${item.item.CODIGO}-${ress}`);
          setValue('housingCode', `${item.item.CODIGO}-${ress}`);
          if (FUCBARVER.children.length == 1) {
            setValue('sidewalk', '', {shouldValidate: true});
            setBarrioVereda('');
          }
          console.log('ress ', ress);
        }
      }
    }
  }
  const onSubmit = async (data: any) => {
    if (props.FUBUBIVIV.CODIGO !== '') {
      console.log(data);
      let item: FUBUBIVIV = {
        ID: props.FUBUBIVIV.ID,
        CODIGO: houseCode,
        COORDENADA_X: position.latitude,
        COORDENADA_Y: position.longitude,
        DIRECCION: data.address,
        FUCBARVER_ID: JSON.parse(data.sidewalk),
      };
      let result = await props.updateFUBUBIVIV(item, originalhouseCode);
      navigation.goBack();
    } else {
      // SAVE
      let item: FUBUBIVIV = {
        CODIGO: houseCode,
        COORDENADA_X: position.latitude,
        COORDENADA_Y: position.longitude,
        DIRECCION: data.address,
        FUCBARVER_ID: JSON.parse(data.sidewalk),
      };
      let result = await props.saveFUBUBIVIV(item);
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
              items={departamentoSelect.children}
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
              onChange={(value) => {
                onChange(value);
                setMunicipio(value);
                onChangeMuni(value, tipoterritorio);
              }}
              selectedValue={municipio}
              items={municipioSelect.children}
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
              onChange={(value) => {
                onChange(value);
                if (value) {
                  setTipoterritorio(value);
                  onChangeTypeTerr(value);
                }
              }}
              selectedValue={tipoterritorio}
              items={tipoterritorioSelect.children}
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
                if (value) {
                  setCentropoblado(value);
                  onChangeCentroOResgua(value);
                }
              }}
              selectedValue={centropoblado}
              items={rescentropSelect.children}
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
              onChange={(value) => {
                onChange(value);
                setBarrioVereda(value);
              }}
              selectedValue={barrioVereda}
              items={barrioVeredaSelect.children}
            />
          )}
          name="sidewalk"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              value={position.latitude}
              label="Latitud"
              disabled={false}
              onBlur={onBlur}
              error={errors.latitude}
              onChange={(value) => {
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
          render={({onChange, onBlur, value}) => (
            <BTextInput
              value={position.longitude}
              label="Longitud"
              disabled={false}
              onBlur={onBlur}
              error={errors.longitude}
              onChange={(value) => {
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
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              value={address}
              label="Dirección"
              disabled={false}
              onBlur={onBlur}
              error={errors.address}
              onChange={(value) => {
                onChange(value);
                setAddress(value);
              }}
            />
          )}
          name="address"
        />
        <View>
          <BButton
            color="secondary"
            value={
              props.FUBUBIVIV.CODIGO == ''
                ? 'Guardar Cambios'
                : 'Actualizar Registro'
            }
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
  updateFUBUBIVIV,
};
const mapStateToProps = (housing: any) => {
  return {
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(_HomeLocationForm);
