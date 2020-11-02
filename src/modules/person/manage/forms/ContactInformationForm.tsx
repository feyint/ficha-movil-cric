import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BButton, BPicker, BTextInput} from '../../../../core/components';
import BNumberInput from '../../../../core/components/BNumberInput';
import {PersonService} from '../../../../services';
import {FNCPERSON} from '../../../../state/person/types';
import {saveFNCPERSON, updateFNCPERSON} from '../../../../state/person/actions';
import {theme} from '../../../../core/style/theme';

const schemaForm = yup.object().shape({
  phonenumber: yup.string().required(),
  phonenumber2: yup.string().required(),
  email: yup.string().email('Correo invalido').required('Correo requerido'),
});
const _ContactInformationForm = (props: any) => {
  const navigation = useNavigation();
  const personService = new PersonService();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [phonenumber, setphonenumber] = useState();
  const [phonenumber2, setphonenumber2] = useState();
  const [email, setEmail] = useState();
  useEffect(() => {
    fetchQuestions();
  }, []);
  function alert(data: any) {
    Alert.alert(
      'Volver!!!',
      'Esta seguro?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => navigation.goBack()},
      ],
      {cancelable: false},
    );
  }
  const fetchQuestions = async () => {
    if (props.FNCPERSON.ID) {
      setValue('phonenumber', props.FNCPERSON.TEL_CELULAR);
      setphonenumber(props.FNCPERSON.TEL_CELULAR);
      setValue('phonenumber2', props.FNCPERSON.TEL_ALTERNO);
      setphonenumber2(props.FNCPERSON.TEL_ALTERNO);
      setValue('email', props.FNCPERSON.CORREO_ELECTRONICO);
      setEmail(props.FNCPERSON.CORREO_ELECTRONICO);
    }
  };
  const onSubmit = async (data: any) => {
    let person: FNCPERSON = props.FNCPERSON;
    let item: any = {};
    item.ID = person.ID;
    item.TEL_CELULAR = data.phonenumber;
    item.TEL_ALTERNO = data.phonenumber2;
    item.CORREO_ELECTRONICO = data.email;
    let inserted = await props.updateFNCPERSON(item);
    navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              label="Número teléfono celular"
              error={errors.phonenumber}
              onChange={(value) => {
                onChange(value);
                setphonenumber(value);
              }}
              value={phonenumber}
            />
          )}
          name="phonenumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              label="Número teléfono 2"
              error={errors.phonenumber2}
              onChange={(value) => {
                onChange(value);
                setphonenumber2(value);
              }}
              value={phonenumber2}
            />
          )}
          name="phonenumber2"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Correo electrónico"
              onBlur={onBlur}
              error={errors.email}
              onChange={(value) => {
                onChange(value);
                setEmail(value);
              }}
              value={email}
            />
          )}
          name="email"
        />
        <View
          style={{display: 'flex', flexDirection: 'row', marginLeft: '20%'}}>
          <BButton
            style={styles.aceptButon}
            color="secondary"
            value="Cancelar"
            labelStyle={styles.text}
            onPress={alert}
          />
          <BButton
            style={styles.cancelButon}
            color="secondary"
            //labelStyle={styles.text}
            value="Validar"
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
  aceptButon: {
    backgroundColor: 'white',
    color: 'white',
    width: '25%',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  cancelButon: {
    //left: 500,
    //position: 'relative',
    //marginTop: -60,
    backgroundColor: theme.colors.primary,
    width: '25%',
    color: 'red',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: theme.colors.primary,
  },
});
const mapStateToProps = (person: any) => {
  return {
    FNCPERSON: person.person.FNCPERSON,
  };
};
const mapDispatchToProps = {
  updateFNCPERSON,
  saveFNCPERSON,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ContactInformationForm);
