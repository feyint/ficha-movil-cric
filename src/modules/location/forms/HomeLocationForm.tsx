import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BTextInput, BPicker, AlertBox} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import BNumberInput from '../../../core/components/BNumberInput';
import {SafeAreaView} from 'react-native-safe-area-context';

const schemaForm = yup.object().shape({
  ceiling: yup.string().required(),
  floor: yup.string().required(),
  wall: yup.string().required(),
  ilumination: yup.string().required(),
  ventilation: yup.string().required(),
});

const _HomeLocationForm = (user) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      department: user.user.department,
      municipality: user.user.municipality,
      territoryType: user.user.territoryType,
      shelterOrCouncil: user.user.shelterOrCouncil,
      populatedCenter: user.user.populatedCenter,
      zone: user.user.zone,
      sidewalk: user.user.sidewalk,
      careUnit: user.user.careUnit,
      careZone: user.user.careZone,
      address: user.user.address,
      housingCode: user.user.housingCode,
      XCoordinates: user.user.XCoordinates,
      YCoordinates: user.user.YCoordinates,
      nucleusFamilyNumber: user.user.nucleusFamilyNumber,
      nucleusFamily: user.user.nucleusFamily,
    },
  });
  const defaultOptions = [
    {label: 'Seleccione', value: '1'},
    {label: 'Adecuado', value: '2'},
    {label: 'No adecuado', value: '3'},
  ];

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView scroll>
      <View style={styles.container}>
        <Text>Departamento</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Departamento"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.department}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="department"
        />

        <Text>Municipio</Text>
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
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="municipality"
        />
        <Text>Tipo de Territorio</Text>
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
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="territoryType"
        />
        <Text>Resguardo o cabildo</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Resguardo o cabildo"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.shelterOrCouncil}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="shelterOrCouncil"
        />
        <Text>Centro poblado</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Centro poblado"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.populatedCenter}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="populatedCenter"
        />
        <Text>Zona</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Zona"
              prompt="Seleccione una opción"
              enabled={false}
              onBlur={onBlur}
              error={errors.zone}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="zone"
        />
        <Text>Vereda</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="vereda"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.sidewalk}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="sidewalk"
        />
        <Text>Unidad de cuidado</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Unidad de cuidado"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.careUnit}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="careUnit"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Zona de Cuidado"
              disabled={false}
              onBlur={onBlur}
              error={errors.careZone}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="careZone"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Direccion"
              disabled={false}
              onBlur={onBlur}
              error={errors.address}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="address"
        />
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
            <BTextInput
              label="CoordenadasX"
              disabled={false}
              onBlur={onBlur}
              error={errors.XCoordinates}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="XCoordinates"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="CoordenadasY"
              disabled={false}
              onBlur={onBlur}
              error={errors.YCoordinates}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="YCoordinates"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BNumberInput
              label="Numero de nucleos familiares en la vivienda"
              disabled={false}
              onBlur={onBlur}
              error={errors.nucleusFamilyNumber}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="nucleusFamilyNumber"
        />
        <View>
          <AlertBox value="Guardar" onPress={handleSubmit(onSubmit)} />
          <View style={styles.empty} />
        </View>
      </View>
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
  empty: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 100,
  },
});

const mapStateToProps = (session) => {
  return {
    user: session.session.user,
  };
};
export default connect(mapStateToProps)(_HomeLocationForm);
