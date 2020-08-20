import React from 'react';

import {View, StyleSheet, ScrollView, Text} from 'react-native';

import FormBuilder from 'react-native-paper-form-builder';

import {useForm} from 'react-hook-form';

import {Button} from 'react-native-paper';
import {BHeader} from '../../../core/components';


function BasicExample() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onChange',
  });

  return (
    <View>
     <BHeader>Iniciar Sesión</BHeader>
      <FormBuilder
        form={form}
        formConfigArray={[
          {
            type: 'input',
            name: 'email',
            label: 'Usuario',
            rules: {
              required: {
                value: true,
                message: 'el usuario es requerido',
              },
            },

            textInputProps: {
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            },
          },

          {
            type: 'input',
            name: 'password',
            label: 'Contraseña',
            rules: {
              required: {
                value: true,
                message: 'Contraseña requerida',
              },
            },

            textInputProps: {
              secureTextEntry: true,
            },
          },
        ]}>
        <Button
          mode={'contained'}
          onPress={form.handleSubmit((data: any) => {
            console.log('form data', data);
          })}>
          Iniciar Sesión
        </Button>
      </FormBuilder>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },

  scrollViewStyle: {
    flex: 1,

    padding: 15,

    justifyContent: 'center',
  },

  headingStyle: {
    fontSize: 30,

    textAlign: 'center',

    marginBottom: 40,
  },
});

export default BasicExample;
