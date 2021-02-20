/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BButton,
  BDatePickerModal,
  BMultiSelect,
  BPicker,
  ButtonAction,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import {
  QuestionSexAndRepHealthPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {SexAndRepHealthPersonQuestion} from '../state/types';
import {theme} from '../../../../core/style/theme';
import {useFNCSALREP, useFNCSALREP_FNCCONREP, useSGCSISPAR} from '../../../../hooks';
import {useFNCCONREP} from '../../../../hooks/useFNCCONREP';
import {FNCCONREP, FNCPERSON, FNCSALREP} from '../../../../types';
import moment from 'moment';
import { SystemParameterEnum } from '../../../../core/utils/SystemParameters';

const questionscodes = [
  QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
  QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
  QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
  QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
];

const schemaForm = yup.object().shape({
  TerminacionGestacion: yup.number().positive().optional(),
  FechaTerminacionDeLaGestacion: yup.date().optional(),
  PersonaQueAtendioUltimoParto: yup.number().optional(),
  LugarAtencionUltimoParto: yup.number().optional(),
  ComplicacionAtencionUltimoParto: yup.array().optional(),
});

const _LastPregnancyForm = (props: any) => {
  const {itemFNCSALREP, updateFNCSALREP, loadingFNCSALREP} = useFNCSALREP();
  const {getByCode} = useSGCSISPAR();
  const {
    getQuestionsOptions,
    getMultiselect,
    getPicker,
    getLabel,
    listFNCCONREP,
  } = useFNCCONREP();
  const [vDate, setvDate] = useState<Date>();
  const [enableFinishPergancy, setenableFinishPergancy] = useState<boolean>(false);

  const {saveAnswer, getAnswerquestion} = useFNCSALREP_FNCCONREP();
  useEffect(() => {
    getQuestionsOptions(questionscodes);
    const {GRAVIDEZ} = props.FNCSALREP as FNCSALREP;
    console.error(GRAVIDEZ);
    if (!GRAVIDEZ || GRAVIDEZ == null || GRAVIDEZ == 'null' || GRAVIDEZ == 0) {
      setenableFinishPergancy(false);
      Alert.alert(
        'Acción no permitida',
        'Opción valida solo cuando a tenido gravidez',
      );
      navigation.goBack();
    } else if (GRAVIDEZ > 0) {
      
    }
  }, []);
  useEffect(() => {
    if (listFNCCONREP) {
      fetchQuestions();
    }
  }, [listFNCCONREP]);
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue, getValues} = useForm({
    resolver: yupResolver(schemaForm),
  });

  async function fetchQuestions() {
    const {PARTO_ULTIMO} = props.FNCSALREP as FNCSALREP;
    const {FECHA_NACIMIENTO} = props.FNCPERSON as FNCPERSON;
    if (FECHA_NACIMIENTO) {
      let birthDate = moment(FECHA_NACIMIENTO).toDate();
      var years = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years');
      var days = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'days');
      let edadMinima = await getByCode(SystemParameterEnum.PRM020);
      if (days > Number(edadMinima.VALOR)) {
        setenableFinishPergancy(false);
        for (let i = 0; i < listFNCCONREP.length; i++) {
          const element = listFNCCONREP[i];
          if (
            element.QUESTIONCODE ==  QuestionSexAndRepHealthPersonCodes.TerminacionGestacion &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('TerminacionGestacion', '' + element.ID);
          }
        }
      } else {
        setenableFinishPergancy(true);
      }
    }
    if (PARTO_ULTIMO) {
      setvDate(moment(PARTO_ULTIMO).toDate());
      setValue('FechaTerminacionDeLaGestacion', PARTO_ULTIMO);
    }
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
      'TerminacionGestacion',
    );
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
      'PersonaQueAtendioUltimoParto',
    );
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
      'LugarAtencionUltimoParto',
    );
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
      'ComplicacionAtencionUltimoParto',
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
      item.PARTO_ULTIMO = data.FechaTerminacionDeLaGestacion;
      await updateFNCSALREP(item);
    }
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
      data.TerminacionGestacion,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
      data.PersonaQueAtendioUltimoParto,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
      data.LugarAtencionUltimoParto,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
      data.ComplicacionAtencionUltimoParto,
      2,
    );
    navigation.goBack();
  }
  function changeTerminacion() {
    setenableFinishPergancy(true);
    let value = getValues('TerminacionGestacion');
    for (let i = 0; i < listFNCCONREP.length; i++) {
      const element = listFNCCONREP[i];
      if (
        element.QUESTIONCODE ==  QuestionSexAndRepHealthPersonCodes.TerminacionGestacion &&
        element.NOMBRE.includes('No aplica')
      ) {
        console.error(element.ID, value);
        if (element.ID == value) {
          setenableFinishPergancy(false);
          for (let i = 0; i < listFNCCONREP.length; i++) {
            const item = listFNCCONREP[i];
            if (
              item.QUESTIONCODE ==  QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto &&
              item.NOMBRE.includes('No aplica')
            ) {
              setValue('PersonaQueAtendioUltimoParto', '' + item.ID);
            }
          }
          for (let i = 0; i < listFNCCONREP.length; i++) {
            const item = listFNCCONREP[i];
            if (
              item.QUESTIONCODE ==  QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto &&
              item.NOMBRE.includes('No aplica')
            ) {
              setValue('LugarAtencionUltimoParto', '' + item.ID);
            }
          }
          for (let i = 0; i < listFNCCONREP.length; i++) {
            const item = listFNCCONREP[i];
            if (
              item.QUESTIONCODE ==  QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto &&
              item.NOMBRE.includes('No aplica')
            ) {
              setValue('LugarAtencionUltimoParto', '' + item.ID);
            }
          }
        }
      }
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              enabled={true}
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
              )}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
                changeTerminacion();
              }}
              selectedValue={value}
              items={getPicker(
                QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
              )}
            />
          )}
          name="TerminacionGestacion"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BDatePickerModal
              label="Fecha Terminacion De La Gestacion"
              error={errors.FechaTerminacionDeLaGestacion}
              onChange={(value: any) => {
                onChange(value);
                setvDate(value);
              }}
              value={vDate}
            />
          )}
          name="FechaTerminacionDeLaGestacion"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              enabled={enableFinishPergancy}
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
              )}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(
                QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
              )}
            />
          )}
          name="PersonaQueAtendioUltimoParto"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              enabled={enableFinishPergancy}
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
              )}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(
                QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
              )}
            />
          )}
          name="LugarAtencionUltimoParto"
        />
        {enableFinishPergancy ? (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BMultiSelect
                label={getLabel(
                  QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
                )}
                onBlur={onBlur}
                error={errors.ComplicacionAtencionUltimoParto}
                onChange={(values: any) => {
                  onChange(values);
                }}
                selectedItems={value}
                items={getMultiselect(
                  QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
                )}
              />
            )}
            name="ComplicacionAtencionUltimoParto"
          />
        ) : null}
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
const mapStateToProps = (store: any) => {
  return {
    FNCSALREP: store.sarhealthperson.FNCSALREP,
    FNCPERSON: store.person.FNCPERSON,
  };
};
export default connect(mapStateToProps, null)(_LastPregnancyForm);
