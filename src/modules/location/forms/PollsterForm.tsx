import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BTextInput} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
const schemaForm = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  identification: yup.string().required(),
});
export default () => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('MenuHome');
  };
  const onChange = (arg: any) => {
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
            <BTextInput
              label="Nombres"
              onBlur={onBlur}
              error={errors.username}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Apellidos"
              onBlur={onBlur}
              error={errors.password}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Identificación"
              onBlur={onBlur}
              error={errors.password}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="identification"
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
