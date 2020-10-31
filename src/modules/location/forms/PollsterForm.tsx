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
const schemaForm = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  identification: yup.number().required(),
  identificationType: yup.string().optional(),
});
//TODO añadir el Confirmación de guardar cambios
//TODO cambiar el input text por input numerico en identificiación
const _PollsterForm = (user) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      identificationType: user.user.identificationType,
      firstname: user.user.firstName,
      lastname: user.user.lastName,
      identification: user.user.identification,
    },
  });
  const identificationTypes = [
    {label: 'Cédula de ciudadania', value: '1'},
    {label: 'Tarjeta de identidad', value: '2'},
    {label: 'Registro civil', value: '3'},
  ];
  const onSubmit = (data: any) => {
    navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Tipo de identificación"
              prompt="Seleccione una opción"
              enabled={false}
              onBlur={onBlur}
              error={errors.identificationType}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={identificationTypes}
            />
          )}
          name="identificationType"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Nombres"
              disabled={true}
              onBlur={onBlur}
              error={errors.firstname}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="firstname"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Apellidos"
              onBlur={onBlur}
              disabled={true}
              error={errors.lastname}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="lastname"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BNumberInput
              label="Identificación"
              onBlur={onBlur}
              disabled={true}
              error={errors.identification}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="identification"
        />
        <View>
          <BButton
            color="secondary"
            value="Volver"
            onPress={handleSubmit(onSubmit)}
          />
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
});

const mapStateToProps = (session) => {
  return {
    user: session.session.user,
  };
};
export default connect(mapStateToProps)(_PollsterForm);
