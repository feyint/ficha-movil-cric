/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BDatePickerModal,
  BMultiSelect,
  BRadioButton,
  BTextInput,
  ButtonAction,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import {
  logicOption,
  QuestionSexAndRepHealthPersonCodes,
} from '../../../../core/utils/PersonTypes';
import {theme} from '../../../../core/style/theme';
import {useFNCSALREP, useFNCSALREP_FNCCONREP} from '../../../../hooks';
import {useFNCCONREP} from '../../../../hooks/useFNCCONREP';
import {FNCCONREP, FNCSALREP} from '../../../../types';
import moment from 'moment';
import { Text } from 'react-native-paper';

const questionscodes = [
  QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
  QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
  QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
];
const schemaForm = yup.object().shape({
  FechaUltimaMenstruacion: yup.date().required(),
  PracticasCulturalesDuranteLaGestacion: yup.array().required(),
  acompanamientoDeGestacion: yup.array().required(),
  AcompanamientoFamilia: yup.boolean().required(),
  FactoresDeRiesgoGestante: yup.array().required(),
  RealizacionPruebaSerologia: yup.boolean().required(),
  RealizacionPruebaVIH: yup.boolean().required(),
});

const _CurrentPregnancyForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [edadGestacional, setEdadGestacional] = useState('');
  const [fechaUltimaM, setfechaUltimaM] = useState<any>();
  const [fechaProbableParto, setFechaProbableParto] = useState<any>();
  const {itemFNCSALREP, updateFNCSALREP, loadingFNCSALREP} = useFNCSALREP();
  const [loaded, setLoaded] = useState<boolean>(false);

  const {
    getQuestionsOptions,
    getMultiselect,
    getPicker,
    getLabel,
    listFNCCONREP,
  } = useFNCCONREP();
  const {saveAnswer, getAnswerquestion} = useFNCSALREP_FNCCONREP();
  useEffect(() => {
    getQuestionsOptions(questionscodes);
    validatepregnancynumber();
  }, []);
  useEffect(() => {
    if (listFNCCONREP) {
      fetchQuestions();
    }
  }, [listFNCCONREP]);

  async function fetchQuestions() {
    const {
      ULTIMA_REGLA,
      EDAD_GESTACION,
      PARTO_ESTIMADO,
      PRESENCIA_FAM,
      SEROLOGIA,
      VIH,
    } = props.FNCSALREP as FNCSALREP;
    if (ULTIMA_REGLA) {
      //setfechaUltimaM(moment(value1).toDate());
      setValue('FechaUltimaMenstruacion', moment(ULTIMA_REGLA).toDate());
      calculateGestacion(ULTIMA_REGLA);
    }
    setValue('EdadGestacional', EDAD_GESTACION);
    //setValue('FechaProbableParto', PARTO_ESTIMADO);
    if (PRESENCIA_FAM) {
      setValue('AcompanamientoFamilia', Boolean(PRESENCIA_FAM));
    }
    if (SEROLOGIA) {
      setValue('RealizacionPruebaSerologia', Boolean(SEROLOGIA));
    }
    if (VIH) {
      setValue('RealizacionPruebaVIH', Boolean(VIH));
    }
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
      'PracticasCulturalesDuranteLaGestacion',
      2,
    );
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
      'acompanamientoDeGestacion',
      2,
    );
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
      'FactoresDeRiesgoGestante',
      2,
    );
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONREP.find((item: FNCCONREP) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNCSALREP;
      let ans = await getAnswerquestion(ID, question.FNCELEREP_ID, type);
      if (ans) {
        if (type == 1) {
          setValue(prop, '' + ans);
        } else {
          setValue(prop, ans);
        }
      }
      return ans;
    }
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
    personid = 0,
  ) {
    let question = listFNCCONREP.find((item: FNCCONREP) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNCSALREP.ID;
      if (personid > 0) {
        ID = personid;
      }
      saveAnswer(type, answer, ID, question.FNCELEREP_ID);
    }
  }

  async function onSubmit(data: any) {
    let item: FNCSALREP = props.FNCSALREP;
    if (item.ID) {
      item.ULTIMA_REGLA = fechaUltimaM;
      item.EDAD_GESTACION = edadGestacional;
      item.PARTO_ESTIMADO = fechaProbableParto;
      item.PRESENCIA_FAM = data.AcompanamientoFamilia;
      item.SEROLOGIA = data.RealizacionPruebaSerologia;
      item.VIH = data.RealizacionPruebaVIH;
      await updateFNCSALREP(item);
    }
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
      data.PracticasCulturalesDuranteLaGestacion,
      2,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
      data.acompanamientoDeGestacion,
      2,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
      data.FactoresDeRiesgoGestante,
      2,
    );
    navigation.goBack();
  }
  function calculateGestacion(value: any) {
    const value1 = value;
    if (value) {
      let bdate = moment(value).toDate();
      var days = moment().diff(moment(bdate, 'DD-MM-YYYY'), 'days');
      console.error('days ', days);
      if (days > 280) {
        Alert.alert(
          'Error',
          'La fecha de la última menstruación es mayor a 9 meses y 7 días',
        );
        setfechaUltimaM(null);
        setValue('FechaUltimaMenstruacion', null);
        setFechaProbableParto('');
        setEdadGestacional('');
      } else {
        setfechaUltimaM(moment(value1).toDate());
        var diff = (new Date().getTime() - value.getTime()) / 1000;
        diff /= 60 * 60 * 24 * 7;
        setEdadGestacional(`${Math.abs(Math.round(diff))} Semanas`);
        //var newDate = new Date(value2.setMonth(value2.getMonth() + 8));
        let newDate = moment(value1).add(8, 'months').calendar();
        setFechaProbableParto(newDate);
      }
    } else {
      setEdadGestacional('');
    }
  }
  function validatepregnancynumber() {
    const {GRAVIDEZ, PARIDEZ, ABORTO, CESAREA} = props.FNCSALREP as FNCSALREP;
    let isValid = false;
    let pregnancyr = Number(GRAVIDEZ);
    if (!pregnancyr || pregnancyr == 'null' || pregnancyr == 0) {
      Alert.alert(
        'Acción no permitida',
        'El número de gravidez debe ser mayor a cero',
      );
      navigation.goBack();
    }
    let paridez = Number(PARIDEZ);
    let abortion = Number(ABORTO);
    let cesarian = Number(CESAREA);
    let sum =
      (paridez ? paridez : 0) +
      (abortion ? abortion : 0) +
      (cesarian ? cesarian : 0);
    if (sum == pregnancyr) {
      isValid = true;
    }
    return isValid;
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BDatePickerModal
              label="Fecha de la última Menstruación"
              maximumDate={new Date()}
              error={errors.FechaUltimaMenstruacion}
              onChange={(value: any) => {
                onChange(value);
                calculateGestacion(value);
              }}
              value={fechaUltimaM}
            />
          )}
          name="FechaUltimaMenstruacion"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={'Edad gestacional'}
              onBlur={onBlur}
              disabled={true}
              error={errors.EdadGestacional}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={edadGestacional}
            />
          )}
          name="EdadGestacional"
        />
        <Text style={styles.containerage}>{fechaProbableParto}</Text>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BMultiSelect
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
              )}
              error={errors.PracticasCulturalesDuranteLaGestacion}
              onChange={(values: any) => {
                onChange(values);
              }}
              selectedItems={value}
              items={getMultiselect(
                QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
              )}
            />
          )}
          name="PracticasCulturalesDuranteLaGestacion"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
              )}
              onBlur={onBlur}
              error={errors.acompanamientoDeGestacion}
              onChange={(values: any) => {
                onChange(values);
              }}
              selectedItems={value}
              items={getMultiselect(
                QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
              )}
            />
          )}
          name="acompanamientoDeGestacion"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Acompañamiento de la familia"
              value={value}
              error={errors.AcompanamientoFamilia}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                }
              }}
            />
          )}
          name="AcompanamientoFamilia"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
              )}
              onBlur={onBlur}
              error={errors.FactoresDeRiesgoGestante}
              onChange={(values: any) => {
                onChange(values);
              }}
              selectedItems={value}
              items={getMultiselect(
                QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
              )}
            />
          )}
          name="FactoresDeRiesgoGestante"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Realización de prueba serología en el último trimestre gestacional"
              value={value}
              error={errors.RealizacionPruebaSerologia}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                }
              }}
            />
          )}
          name="RealizacionPruebaSerologia"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Realización de prueba VIH en el último trimestre gestacional"
              value={value}
              error={errors.RealizacionPruebaVIH}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                }
              }}
            />
          )}
          name="RealizacionPruebaVIH"
        />
        <ButtonAction
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
      </View>
      <View style={styles.spacer} />
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
  containerage: {
    fontSize: 16,
    padding: 10,
    marginBottom: 5,
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  spacer: {
    height: 50,
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

const mapStateToProps = (sarhealthperson: any) => {
  return {
    FNCSALREP: sarhealthperson.sarhealthperson.FNCSALREP,
  };
};
export default connect(mapStateToProps, null)(_CurrentPregnancyForm);
