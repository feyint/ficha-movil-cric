/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BButton, ButtonAction} from '../../../../core/components';
import BNumberInput from '../../../../core/components/BNumberInput';
import {theme} from '../../../../core/style/theme';
import {useFNCSALREP, useSGCSISPAR} from '../../../../hooks';
import {FNCPERSON, FNCSALREP} from '../../../../types';
import {SystemParameterEnum} from '../../../../core/utils/SystemParameters';
import moment from 'moment';
import { setFNCNCSALREP } from '../../../../state/SexAndRepHealthPerson/actions';

const schemaForm = yup.object().shape({
  agemenstruation: yup.number().integer().min(1),
  pregnancynumber: yup.number().integer(),
  parideznumber: yup.number().integer(),
  abortionnumber: yup.number().integer(),
  cesariannumber: yup.number().integer(),
  bornnumber: yup.number().integer(),
  bornnumberdeath: yup.number().integer(),
});
const _ReproductiveSexualHealtForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue, getValues} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [agemenstruation, setagemenstruation] = useState<number>();
  const [pregnancynumber, setpregnancynumber] = useState<number>(0);
  const [parideznumber, setparideznumber] = useState<number>(0);
  const [abortionnumber, setabortionnumber] = useState<number>(0);
  const [cesariannumber, setcesariannumber] = useState<number>(0);
  const [bornnumber, setbornnumber] = useState<number>(0);
  const [bornnumberdeath, setbornnumberdeath] = useState<number>(0);
  const {itemFNCSALREP, updateFNCSALREP, loadingFNCSALREP} = useFNCSALREP();
  const {getByCode} = useSGCSISPAR();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (loaded && (!pregnancynumber || pregnancynumber == 0)) {
      setValue('parideznumber', '' + 0);
      setparideznumber(0);
      setValue('pregnancynumber', '' + 0);
      setValue('abortionnumber', '' + 0);
      setabortionnumber(0);
      setValue('cesariannumber', '' + 0);
      setcesariannumber(0);
      setValue('bornnumber', '' + 0);
      setbornnumber(0);
      setValue('bornnumberdeath', '' + 0);
      setbornnumberdeath(0);
    }
  }, [pregnancynumber]);
  const fetchQuestions = async () => {
    const {
      EDAD_PRIMERA_REGLA,
      EDAD_GESTACION,
      GRAVIDEZ,
      PARIDEZ,
      ABORTO,
      CESAREA,
      NACIDOS_VIVOS,
      NACIDOS_MUERTOS,
    } = props.FNCSALREP as FNCSALREP;
    setValue('agemenstruation', '' + EDAD_PRIMERA_REGLA);
    setagemenstruation(EDAD_PRIMERA_REGLA);
    if (PARIDEZ == null || PARIDEZ == 'null') {
    } else {
      setValue('parideznumber', '' + PARIDEZ);
      setparideznumber(PARIDEZ);
    }
    if (ABORTO == null || ABORTO == 'null') {
    } else {
      setValue('abortionnumber', '' + ABORTO);
      setabortionnumber(ABORTO);
    }
    if (CESAREA == null || CESAREA == 'null') {
    } else {
      setValue('cesariannumber', '' + CESAREA);
      setcesariannumber(CESAREA);
    }
    if (NACIDOS_VIVOS == null || NACIDOS_VIVOS == 'null') {
    } else {
      setValue('bornnumber', '' + NACIDOS_VIVOS);
      setbornnumber(NACIDOS_VIVOS);
    }
    if (NACIDOS_MUERTOS == null || NACIDOS_MUERTOS == 'null') {
    } else {
      setValue('bornnumberdeath', '' + NACIDOS_MUERTOS);
      setbornnumberdeath(NACIDOS_MUERTOS);
    }
    if (GRAVIDEZ == null || GRAVIDEZ == 'null') {
    } else {
      setValue('pregnancynumber', '' + GRAVIDEZ);
      setpregnancynumber(Number(GRAVIDEZ));
    }
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };
  const onSubmit = async (data: any) => {
    let item: FNCSALREP = props.FNCSALREP;
    if (validatepregnancynumber()) {
      if (valideateBornPregnancy()) {
        if (item.ID) {
          item.EDAD_PRIMERA_REGLA = data.agemenstruation;
          item.GRAVIDEZ = data.pregnancynumber;
          item.PARIDEZ = data.parideznumber;
          item.ABORTO = data.abortionnumber;
          item.CESAREA = data.cesariannumber;
          item.NACIDOS_VIVOS = data.bornnumber;
          item.NACIDOS_MUERTOS = data.bornnumberdeath;
          let result = await updateFNCSALREP(item);
          await props.setFNCNCSALREP(result);
          navigation.goBack();
        }
      } else {
        Alert.alert(
          'Acción no permitida',
          'La suma de los campos Número de nacidos vivos y  Número de nacidos muertos debe ser mayor o igual al Número de gravidez',
        );
      }
    } else {
      Alert.alert(
        'Acción no permitida',
        'La suma de los campos Número paridez, Número abortos, Número cesárea debe ser igual al Número de gravidez',
      );
    }
  };
  function validateGravidez(type = 0) {
    let pregnancyr = Number(getValues('pregnancynumber'));
    let paridez = Number(getValues('parideznumber'));
    let abortion = Number(getValues('abortionnumber'));
    let cesarian = Number(getValues('cesariannumber'));
    let sum = paridez + abortion + cesarian;
    if (sum > pregnancyr) {
      switch (type) {
        case 1:
          setValue('parideznumber', `${pregnancyr - (abortion + cesarian)}`);
          break;
        case 2:
          setValue('abortionnumber', `${pregnancyr - (paridez + cesarian)}`);
          break;
        case 3:
          setValue('cesariannumber', `${pregnancyr - (abortion + paridez)}`);
          break;
      }
    }
  }
  function validateBorn(type = 0) {
    let pregnancyr = Number(getValues('pregnancynumber'));
    let born = Number(getValues('bornnumber'));
    let bornD = Number(getValues('bornnumberdeath'));
    let sum = born + bornD;
    if (sum < pregnancyr) {
      let saldo = pregnancyr - sum;
      switch (type) {
        case 1:
          if (born < pregnancyr && bornD == 0) {
          } else {
            setValue('bornnumber', `${sum + saldo}`);
          }
          break;
        case 2:
          setValue('bornnumberdeath', `${saldo}`);
          break;
      }
    }
  }
  const validatepregnancynumber = () => {
    let isValid = false;
    let pregnancyr = Number(getValues('pregnancynumber'));
    let paridez = Number(getValues('parideznumber'));
    let abortion = Number(getValues('abortionnumber'));
    let cesarian = Number(getValues('cesariannumber'));
    let sum =
      (paridez ? paridez : 0) +
      (abortion ? abortion : 0) +
      (cesarian ? cesarian : 0);
    if (sum == pregnancyr) {
      isValid = true;
    }
    return isValid;
  };
  const valideateBornPregnancy = () => {
    let isValid = false;
    let pregnancyr = Number(getValues('pregnancynumber'));
    let born = Number(getValues('bornnumber'));
    let bornD = Number(getValues('bornnumberdeath'));
    let sum = (born ? born : 0) + (bornD ? bornD : 0);
    if (sum >= pregnancyr) {
      isValid = true;
    }
    return isValid;
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={3}
              label="Edad de la primera menstruación"
              error={errors.agemenstruation}
              onChange={(value) => {
                onChange(value);
                setagemenstruation(parseInt(value, 10));
              }}
              value={agemenstruation ? '' + agemenstruation : ''}
            />
          )}
          name="agemenstruation"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={3}
              disabled={agemenstruation && agemenstruation > 0 ? false : true}
              label="Número de gravidez"
              error={errors.pregnancynumber}
              onChange={(value) => {
                value = Number(value.replace(/[^\d]/g, ''));
                onChange(value);
                setpregnancynumber(value);
                validateGravidez();
              }}
              value={value ? '' + value : ''}
            />
          )}
          name="pregnancynumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={3}
              label="Número de paridez"
              disabled={!pregnancynumber || pregnancynumber == 0}
              error={errors.parideznumber}
              onChange={(value) => {
                value = Number(value.replace(/[^\d]/g, ''));
                onChange(value);
                validateGravidez(1);
              }}
              value={value ? '' + value : ''}
            />
          )}
          name="parideznumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={3}
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número de abortos"
              error={errors.abortionnumber}
              onChange={(value) => {
                value = Number(value.replace(/[^\d]/g, ''));
                onChange(value);
                validateGravidez(2);
              }}
              value={value ? '' + value : ''}
            />
          )}
          name="abortionnumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={3}
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número de cesárea"
              error={errors.cesariannumber}
              onChange={(value) => {
                value = Number(value.replace(/[^\d]/g, ''));
                onChange(value);
                validateGravidez(3);
              }}
              value={value ? '' + value : ''}
            />
          )}
          name="cesariannumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={3}
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número de nacidos vivos"
              error={errors.bornnumber}
              onChange={(value) => {
                value = Number(value.replace(/[^\d]/g, ''));
                onChange(value);
                validateBorn(1);
              }}
              value={value ? '' + value : ''}
            />
          )}
          name="bornnumber"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BNumberInput
              maxLength={3}
              disabled={!pregnancynumber || pregnancynumber == 0}
              label="Número de nacidos muertos"
              error={errors.bornnumberdeath}
              onChange={(value) => {
                value = Number(value.replace(/[^\d]/g, ''));
                onChange(value);
                validateBorn(2);
              }}
              value={value ? '' + value : ''}
            />
          )}
          name="bornnumberdeath"
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
const mapStateToProps = (store: any) => {
  return {
    FNCPERSON: store.person.FNCPERSON,
    FNCSALREP: store.sarhealthperson.FNCSALREP,
  };
};
const mapDispatchToProps = {
  setFNCNCSALREP,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ReproductiveSexualHealtForm);
