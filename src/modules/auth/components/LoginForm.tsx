import React, {useEffect, useState, useRef} from 'react';
import {Form, TextInputBase} from '../../../core/forms/components';
import {BButton} from '../../../core/components';
import {Required} from '../../../core/forms/rules';
import {StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';


export default function LoginForm(props) {
  const defaultValues = {
    mode: 'onChange',
    username: '',
  };
  let hasErrorSave = false;

  // Objetos de useForm Hooks para el Formulario
  const FormRef = Form(defaultValues);
  const {handleSubmit, triggerValidation} = useForm({
    mode: 'onChange',
    defaultValues: {username: ''},
  });
  const rules = {
    username: [Required()],
  };

 save = () => {
    handleSubmit(onSubmit)().then(async () => {
      const validUserForm = hasErrorSave
        ? hasErrorSave
        : await triggerValidation();
      console.log(validUserForm);
      if (!validUserForm) {
      }
    });
  };
 onSubmit = async (data: any) => {
    hasErrorSave = false;
    console.log('validado', data);
  };
  return (
    <View>
      <TextInputBase
        {...props}
        form={FormRef}
        name="username"
        placeholder="Usuario"
        rules={rules.username}
      />
    </View>
  );
}
