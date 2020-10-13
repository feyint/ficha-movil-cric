import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
const schemaForm = yup.object().shape({
  firstname: yup.string().required(),
  middlename: yup.string().optional(),
  lastname: yup.string().required(),
  secondlastname: yup.string().optional(),
  identification: yup.string().required(),
  identificationType: yup.string().required(),
  gender: yup.string().required(),
});
const _PersonalInformationForm = (props: any) => {
  const navigation = useNavigation();
  const personService = new PersonService();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const identificationTypes = [
    {label: 'Seleccione', value: '-1'},
    {label: 'Cédula de ciudadania', value: '1'},
    {label: 'Tarjeta de identidad', value: '2'},
    {label: 'Registro civil', value: '3'},
  ];
  const [genders, setGenders] = useState<{label: any; value: any}[]>([]);
  const [gender, setGender] = useState();
  const [identification, setIdentification] = useState();
  const [identificationType, setIdentificationType] = useState<any>();
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    let result = await personService.getGenderList();
    setGenders(result);
    if (props.FNCPERSON.ID) {
      setValue('firstname', props.FNCPERSON.PRIMER_NOMBRE);
      setValue('middlename', props.FNCPERSON.SEGUNDO_NOMBRE);
      setValue('lastname', props.FNCPERSON.PRIMER_APELLIDO);
      setValue('secondlastname', props.FNCPERSON.SEGUNDO_APELLIDO);
      setValue('identification', props.FNCPERSON.IDENTIFICACION);
      setIdentification(props.FNCPERSON.IDENTIFICACION);
      setValue('identificationType', props.FNCPERSON.FNCTIPIDE_ID);
      setIdentificationType('' + props.FNCPERSON.FNCTIPIDE_ID);
      setValue('gender', props.FNCPERSON.FNCGENERO_ID);
      setGender(props.FNCPERSON.FNCGENERO_ID);
    }
  };
  const onSubmit = async (data: any) => {
    let person: FNCPERSON = props.FNCPERSON;
    if (person.ID != null) {
      try {
        let inserted = await props.updateFNCPERSON({
          ID: person.ID,
          PRIMER_NOMBRE: data.firstname,
          SEGUNDO_NOMBRE: data.middlename ? data.middlename : '',
          PRIMER_APELLIDO: data.lastname,
          SEGUNDO_APELLIDO: data.secondlastname ? data.secondlastname : '',
          IDENTIFICACION: data.identification,
          FNCTIPIDE_ID: JSON.parse(data.identificationType),
          FNCGENERO_ID: JSON.parse(data.gender),
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      let item: any = {};
      item.PRIMER_NOMBRE = data.firstname;
      item.SEGUNDO_NOMBRE = data.middlename ? data.middlename : '';
      item.PRIMER_APELLIDO = data.lastname;
      item.SEGUNDO_APELLIDO = data.secondlastname ? data.secondlastname : '';
      item.IDENTIFICACION = data.identification;
      item.FNCTIPIDE_ID = JSON.parse(data.identificationType);
      item.FNCGENERO_ID = JSON.parse(data.gender);
      let inserted = await props.saveFNCPERSON(item);
    }
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
              onBlur={onBlur}
              error={errors.identificationType}
              onChange={(value) => {
                onChange(value);
                setIdentificationType(value);
              }}
              selectedValue={identificationType}
              items={identificationTypes}
            />
          )}
          name="identificationType"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              label="Identificación"
              error={errors.identification}
              onChange={(value) => {
                onChange(value);
                setIdentification(value);
              }}
              value={identification}
            />
          )}
          name="identification"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label="Género"
              error={errors.gender}
              onChange={(value: any) => {
                onChange(value);
                setGender(value);
              }}
              onLoad={() => {}}
              selectedValue={gender}
              items={genders}
            />
          )}
          name="gender"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Primer nombre"
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
              label="Segundo nombre"
              onBlur={onBlur}
              error={errors.middlename}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="middlename"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Primer apellido"
              onBlur={onBlur}
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
            <BTextInput
              label="Segundo Apellido"
              onBlur={onBlur}
              error={errors.secondlastname}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="secondlastname"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
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
)(_PersonalInformationForm);
