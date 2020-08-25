import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { BButton, BTextInput, BPicker } from '../../../core/components';
import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

const schemaForm = yup.object().shape({
  housecode: yup.string().required(),
  roofmaterial: yup.string().required(),
  floormaterial: yup.string().required(),
});

const _HouseForm = (props: any) => {

  console.log('HouseForm props: ', props);

  const navigation = useNavigation();

  const catalogsHouse = useSelector((state: any) => state.location.availableCatalogsHouse);

  console.log('catalogsHouse: ', catalogsHouse);

  const { handleSubmit, control, errors, setValue } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      housecode: '',
      roofmaterial: '',
      floormaterial: '',
    },
  });

  const roofmaterials = [
    { label: 'Teja', value: '1' },
    { label: 'Eternit', value: '2' },
    { label: 'Zinc', value: '3' },
  ];

  const floormaterials = [
    { label: 'Tierra', value: '1' },
    { label: 'Semento', value: '2' },
    { label: 'Baldosa', value: '3' },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BTextInput
              label="Código vivienda"
              disabled={false}
              onBlur={onBlur}
              error={errors.housecode}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="housecode"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              label="Material Techo"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.roofmaterial}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={roofmaterials}
            />
          )}
          name="roofmaterial"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              style={styles.input}
              label="Material Piso"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.floormaterial}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={floormaterials}
            />
          )}
          name="floormaterial"
        />
        <View>
          <BButton value="Guardar Cambios" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});


export default _HouseForm;
