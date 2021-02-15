/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BTextInput, ButtonAction} from '../../../../core/components';
import BNumberInput from '../../../../core/components/BNumberInput';
import {FNCPERSON} from '../../../../state/person/types';
import {useFNCPERSON, useSGCSISPAR} from '../../../../hooks';
import {setFNCPERSON} from '../../../../state/person/actions';
import moment from 'moment';
import {SystemParameterEnum} from '../../../../core/utils/SystemParameters';
const schemaForm = yup.object().shape({
  phonenumber: yup.number().required(),
  phonenumber2: yup.number().required(),
  email: yup
    .string()
    .email('El correo ingresado no es válido')
    .required('Correo requerido'),
});
const _ContactInformationForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [phonenumber, setphonenumber] = useState();
  const [disableForm, setDisbale] = useState<boolean>(false);
  const [phoneLength, setPhoneLength] = useState<number>();
  const [phonenumber2, setphonenumber2] = useState();
  const [email, setEmail] = useState();
  const {itemFNCPERSON, updateFNCPERSON} = useFNCPERSON();
  const {getByCode} = useSGCSISPAR();
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (itemFNCPERSON) {
      props.setFNCPERSON(itemFNCPERSON);
    }
  }, [itemFNCPERSON]);
  const fetchQuestions = async () => {
    if (props.FNCPERSON.ID) {
      setValue('phonenumber', props.FNCPERSON.TEL_CELULAR);
      setphonenumber(props.FNCPERSON.TEL_CELULAR);
      setValue('phonenumber2', props.FNCPERSON.TEL_ALTERNO);
      setphonenumber2(props.FNCPERSON.TEL_ALTERNO);
      setValue('email', props.FNCPERSON.CORREO_ELECTRONICO);
      setEmail(props.FNCPERSON.CORREO_ELECTRONICO);
      validateParameters();
    }
  };
  const onSubmit = async (data: any) => {
    let person: FNCPERSON = props.FNCPERSON;
    person.TEL_CELULAR = data.phonenumber;
    person.TEL_ALTERNO = data.phonenumber2;
    person.CORREO_ELECTRONICO = data.email;
    await updateFNCPERSON(person);
    navigation.goBack();
  };
  const validateParameters = async () => {
    let person: FNCPERSON = props.FNCPERSON;
    if (person.FECHA_NACIMIENTO) {
      let birthDe = moment(person.FECHA_NACIMIENTO).toDate();
      var years = moment().diff(moment(birthDe, 'DD-MM-YYYY'), 'years');
      var days = moment().diff(moment(birthDe, 'DD-MM-YYYY'), 'days');
      let edad = await getByCode(SystemParameterEnum.PRM009);
      if (years < Number(edad.VALOR)) {
        setDisbale(true);
      } else {
        let max = await getByCode(SystemParameterEnum.PRM006);
        setPhoneLength(Number(max.VALOR));
      }
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={phoneLength}
              disabled={disableForm}
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
              maxLength={phoneLength}
              disabled={disableForm}
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
              disabled={disableForm}
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
        <ButtonAction
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});
const mapStateToProps = (store: any) => {
  return {
    FNCPERSON: store.person.FNCPERSON,
  };
};
const mapDispatchToProps = {
  setFNCPERSON,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ContactInformationForm);
