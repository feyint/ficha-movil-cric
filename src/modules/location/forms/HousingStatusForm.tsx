import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BTextInput, BPicker, AlertBox} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

const schemaForm = yup.object().shape({
  ceiling: yup.string().required(),
  floor: yup.string().required(),
  wall: yup.string().required(),
  ilumination: yup.string().required(),
  ventilation: yup.string().required(),
});

const _HousingStatusForm = (user) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      ceiling: user.user.ceiling,
      floor: user.user.floor,
      wall: user.user.wall,
      ilumination: user.user.ilumination,
      ventilation: user.user.ventilation,
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
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text>Techo</Text>
        <Controller
          defaultValue=""
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Techo"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.ceiling}
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="ceiling"
        />
        <Text>Piso</Text>
        <Controller
          defaultValue=""
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Piso"
              enabled={true}
              onBlur={onBlur}
              error={errors.floor}
              onChange={(value) => onChange(value)}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="floor"
        />
        <Text>Pared</Text>
        <Controller
          defaultValue=""
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Pared"
              onBlur={onBlur}
              enabled={true}
              error={errors.wall}
              onChange={(value) => onChange(value)}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="wall"
        />
        <Text>Ventilacion</Text>
        <Controller
          defaultValue=""
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Ventilation"
              onBlur={onBlur}
              enabled={true}
              error={errors.ventilation}
              onChange={(value) => onChange(value)}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="ventilation"
        />
        <Text>Iluminacion</Text>
        <Controller
          defaultValue=""
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Iluminacion"
              onBlur={onBlur}
              enabled={true}
              error={errors.ilumination}
              onChange={(value) => onChange(value)}
              value={value}
              selectedValue={value}
              items={defaultOptions}
            />
          )}
          name="ilumination"
        />
        <View>
          <AlertBox value="Guardar" onPress={handleSubmit(onSubmit)} />
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
export default connect(mapStateToProps)(_HousingStatusForm);
