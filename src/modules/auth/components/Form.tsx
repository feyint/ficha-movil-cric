import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton} from '../../../core/components';
import {HelperText, TextInput} from 'react-native-paper';
const schemaForm = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
export default () => {
  const {register, setValue, handleSubmit, control, errors} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              mode="outlined"
              label="Usuario"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="username"
        />
        {errors.username ? (
          <HelperText type="error">Campo obligatorio</HelperText>
        ) : null}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              secureTextEntry={true}
              mode="outlined"
              style={styles.inputt}
              label="Contraseña"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password ? (
          <HelperText type="error">Campo obligatorio</HelperText>
        ) : null}

        <View>
          <BButton value="Iniciar Sesión" onPress={handleSubmit(onSubmit)} />
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
  inputt: {
  },
});
