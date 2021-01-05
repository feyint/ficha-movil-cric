/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BMultiSelect, ButtonAction} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {QuestionPersonCodes} from '../../../../core/utils/PersonTypes';
import {theme} from '../../../../core/style/theme';
import {useFNCCONSAL} from '../../../../hooks/useFNCCONSAL';
import {FNCCONSAL} from '../../../../types';
import {useFNCDESARM} from '../../../../hooks/useFNCDESARM';
import {getMSelectSchema} from '../../../../core/utils/utils';
import {
  useFNBINFSAL_FNCDESARM,
  useFNBINFSAL_FNCCONSAL,
} from '../../../../hooks';

const questionscodes = [
  QuestionPersonCodes.DesarmoniaOccidental,
  QuestionPersonCodes.AntecedentesFamiliares,
];
const schemaForm = yup.object().shape({
  DesarmoniaPropia: yup.array().optional(),
  DesarmoniaOccidental: yup.array().required(),
  AntecedentesFamiliares: yup.array().required(),
});

const _HealthStatusVisitForm = (props: any) => {
  const {
    getLabel,
    getQuestionsOptions,
    getMultiselect,
    listFNCCONSAL,
  } = useFNCCONSAL();
  const {listFNCDESARM, getAllFNCDESARM} = useFNCDESARM();
  const {saveAnswerDESARM, getAnswerquestionDESARM} = useFNBINFSAL_FNCDESARM();
  const {saveAnswer, getAnswerquestion} = useFNBINFSAL_FNCCONSAL();
  const navigation = useNavigation();
  const {handleSubmit, setValue, control, errors} = useForm({
    resolver: yupResolver(schemaForm),
  });

  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (listFNCCONSAL) {
      fetchQuestions();
    }
  }, [listFNCCONSAL]);

  async function fetchQuestions() {
    getAllFNCDESARM();
    let desarm = await getAnswerquestionDESARM(props.FNBINFSAL.ID);
    setValue('DesarmoniaPropia', desarm);
    await getAnswers(
      QuestionPersonCodes.DesarmoniaOccidental,
      'DesarmoniaOccidental',
      2,
    );
    await getAnswers(
      QuestionPersonCodes.AntecedentesFamiliares,
      'AntecedentesFamiliares',
      2,
    );
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
      let ans = await getAnswerquestion(
        props.FNBINFSAL.ID,
        question.FNCELESAL_ID,
        type,
      );
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
  async function onSubmit(data: any) {
    if (data.DesarmoniaPropia) {
      await saveAnswerDESARM(data.DesarmoniaPropia, props.FNBINFSAL.ID);
    }
    if (data.DesarmoniaOccidental) {
      await SaveAnswers(
        QuestionPersonCodes.DesarmoniaOccidental,
        2,
        data.DesarmoniaOccidental,
      );
    }
    if (data.AntecedentesFamiliares) {
      await SaveAnswers(
        QuestionPersonCodes.AntecedentesFamiliares,
        2,
        data.AntecedentesFamiliares,
      );
    }
    navigation.goBack();
  }
  async function SaveAnswers(
    questionCode: string,
    _type: 1 | 2 = 1,
    answer: any,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      await saveAnswer(
        _type,
        answer,
        props.FNBINFSAL.ID,
        question.FNCELESAL_ID,
      );
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label="Desarmonia propia"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.DesarmoniaPropia}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedItems={value}
              items={getMSelectSchema('FNCDESARM', listFNCDESARM)}
            />
          )}
          name="DesarmoniaPropia"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(QuestionPersonCodes.DesarmoniaOccidental)}
              onBlur={onBlur}
              error={errors.DesarmoniaOccidental}
              onChange={(values: any) => {
                onChange(values);
              }}
              selectedItems={value}
              items={getMultiselect(QuestionPersonCodes.DesarmoniaOccidental)}
            />
          )}
          name="DesarmoniaOccidental"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(QuestionPersonCodes.AntecedentesFamiliares)}
              onBlur={onBlur}
              error={errors.AntecedentesFamiliares}
              onChange={(values: any) => {
                onChange(values);
                //SaveAnswers(QuestionPersonCodes.AntecedentesFamiliares, 2);
              }}
              selectedItems={value}
              items={getMultiselect(QuestionPersonCodes.AntecedentesFamiliares)}
            />
          )}
          name="AntecedentesFamiliares"
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
  spacer: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
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
    FNBINFSAL: store.person.FNBINFSAL,
    FNCPERSON: store.person.FNCPERSON,
  };
};
export default connect(mapStateToProps, null)(_HealthStatusVisitForm);
