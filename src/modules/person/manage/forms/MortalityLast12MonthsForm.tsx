/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {yupResolver} from '@hookform/resolvers';
import {connect} from 'react-redux';
import * as yup from 'yup';
import {
  BDatePickerModal,
  BImagePicker,
  BPicker,
  ButtonAction,
} from '../../../../core/components';
import {
  QuestionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/person/actions';
import {useFNBINFSAL, useFNBINFSAL_FNCCONSAL} from '../../../../hooks';
import {FNBINFSAL, FNCCONSAL} from '../../../../types';
import {useFNCCONSAL} from '../../../../hooks/useFNCCONSAL';
const questionscodes = [
  QuestionPersonCodes.CausaDeLaMuerte,
  QuestionPersonCodes.PracticasCulturales,
];

const schemaForm = yup.object().shape({
  FechaMuerte: yup.date().required(),
  CausaDeLaMuerte: yup.number().required(),
  PracticasCulturales: yup.number().required(),
  Soportes: yup.array().optional(),
});

const _MortalityLast12MonthsForm = (props: any) => {
  const {
    getQuestionsOptions,
    getLabel,
    getMultiselect,
    getPicker,
    listFNCCONSAL,
  } = useFNCCONSAL();
  const {saveAnswer, getAnswerquestion} = useFNBINFSAL_FNCCONSAL();
  const {itemFNBINFSAL, updateFNBINFSAL, loadingFNBINFSAL} = useFNBINFSAL();
  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (listFNCCONSAL) {
      fetchQuestions();
    }
  }, [listFNCCONSAL]);
  const navigation = useNavigation();
  var aYearFromNow = new Date();
  aYearFromNow.setFullYear(aYearFromNow.getFullYear() - 1);
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  async function fetchQuestions() {
    const {FECHA_MUERTE} = props.FNBINFSAL as FNBINFSAL;
    setValue('FechaMuerte', FECHA_MUERTE);
    getAnswers(QuestionPersonCodes.CausaDeLaMuerte, 'CausaDeLaMuerte');
    getAnswers(QuestionPersonCodes.PracticasCulturales, 'PracticasCulturales');
  }
  async function onSubmit(data: any) {
    let newItem: FNBINFSAL = props.FNBINFSAL;
    newItem.ESTADO = 0;
    newItem.FECHA_MUERTE = data.FechaMuerte;
    await updateFNBINFSAL(newItem);
    SaveAnswers(QuestionPersonCodes.CausaDeLaMuerte, data.CausaDeLaMuerte);
    SaveAnswers(
      QuestionPersonCodes.PracticasCulturales,
      data.PracticasCulturales,
    );
    navigation.goBack();
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNBINFSAL;
      let ans = await getAnswerquestion(ID, question.FNCELESAL_ID, type);
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
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNBINFSAL.ID;
      if (personid > 0) {
        ID = personid;
      }
      saveAnswer(type, answer, ID, question.FNCELESAL_ID);
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BDatePickerModal
              maximumDate={new Date()}
              minimumDate={aYearFromNow}
              label="Fecha de la muerte"
              disabled={false}
              error={errors.FechaMuerte}
              onChange={(value: any) => {
                onChange(value);
              }}
              onLoad={() => {
                console.log('OnLoad BDatePickerModal');
              }}
              value={value}
            />
          )}
          name="FechaMuerte"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={getLabel(QuestionPersonCodes.CausaDeLaMuerte)}
              error={errors.CausaDeLaMuerte}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.CausaDeLaMuerte)}
            />
          )}
          name="CausaDeLaMuerte"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={getLabel(QuestionPersonCodes.PracticasCulturales)}
              error={errors.PracticasCulturales}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.PracticasCulturales)}
            />
          )}
          name="PracticasCulturales"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BImagePicker
              label="Soporte"
              onBlur={onBlur}
              error={errors.Soportes}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
            />
          )}
          name="Soporte"
        />
        <ButtonAction
          onAccept={handleSubmit(onSubmit, (err) => {
            console.error(err);
          })}
          onCancel={() => navigation.goBack()}
        />
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

const mapDispatchToProps = {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
};

const mapStateToProps = (store: any) => {
  return {
    FNBINFSAL: store.person.FNBINFSAL,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_MortalityLast12MonthsForm);
