import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { BButton, BMultiSelect, BPicker } from '../../../../core/components';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { PersonService } from '../../../../services';
import {
  QuestionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import { getQuestionWithOptions, saveAnswerLocal, getQuestionAnswer } from '../../../../state/person/actions';
import { PersonQuestion } from '../state/types';

const questions = [QuestionPersonCodes.Fuma,
QuestionPersonCodes.ConsumeBebidasAlcoholicas,
QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
QuestionPersonCodes.EvidenciaViolencia,
];

const schemaForm = yup.object().shape({
  Fuma: yup.number().required(),
  ConsumeBebidasAlcoholicas: yup.number().required(),
  EvidenciaConsumoSustanciasPsicoactivas: yup.number().required(),
  EvidenciaViolencia: yup.array().required(),
});

const _UnhealthyHabitsForm = (props: any) => {
  const syncCatalogService = new PersonService();

  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

  const [state, setState] = useState({
    questions: [] as PersonQuestion[],
  });

  const navigation = useNavigation();

  const { handleSubmit, control, errors, setValue } = useForm({
    resolver: yupResolver(schemaForm),
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    let result = await props.getQuestionWithOptions(questions);
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
  }

  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
  }

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, state.questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    console.log('state.questions: ', state.questions);
    return syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questions,
    );
  };

  function onSubmit(data: any) {
    navigation.goBack();
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              label={getQuestionlabel(QuestionPersonCodes.Fuma)}
              onBlur={onBlur}
              error={errors.Fuma}
              onChange={(value: any) => {
                onChange(value);
                console.log('save: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionPersonCodes.Fuma,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionPersonCodes.Fuma,
                  'Fuma',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionPersonCodes.Fuma).children
              }
            />
          )}
          name="Fuma"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              label={getQuestionlabel(QuestionPersonCodes.ConsumeBebidasAlcoholicas)}
              onBlur={onBlur}
              error={errors.ConsumeBebidasAlcoholicas}
              onChange={(value: any) => {
                onChange(value);
                console.log('save: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionPersonCodes.ConsumeBebidasAlcoholicas,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionPersonCodes.ConsumeBebidasAlcoholicas,
                  'ConsumeBebidasAlcoholicas',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionPersonCodes.ConsumeBebidasAlcoholicas).children
              }
            />
          )}
          name="ConsumeBebidasAlcoholicas"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              label={getQuestionlabel(QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas)}
              onBlur={onBlur}
              error={errors.EvidenciaConsumoSustanciasPsicoactivas}
              onChange={(value: any) => {
                onChange(value);
                console.log('save: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas,
                  'EvidenciaConsumoSustanciasPsicoactivas',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionPersonCodes.EvidenciaConsumoSustanciasPsicoactivas).children
              }
            />
          )}
          name="EvidenciaConsumoSustanciasPsicoactivas"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionPersonCodes.EvidenciaViolencia,
              )}
              onBlur={onBlur}
              error={errors.EvidenciaViolencia}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.EvidenciaViolencia,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.EvidenciaViolencia,
                  'EvidenciaViolencia',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionPersonCodes.EvidenciaViolencia,
              )}
            />
          )}
          name="EvidenciaViolencia"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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
});
const mapDispatchToProps = {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer
};
const mapStateToProps = (session: any) => {
  return {
    user: session.session.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_UnhealthyHabitsForm);
