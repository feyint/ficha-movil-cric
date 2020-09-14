import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { BButton, BDatePickerModal, BImagePicker, BPicker } from '../../../../core/components';
import { PersonService } from '../../../../services';
import { QuestionPersonCodes } from '../../../../core/utils/PersonTypes';
import { getQuestionWithOptions } from '../../../../state/person/actions';
import { PersonQuestion } from '../state/types';

const questions = [
  QuestionPersonCodes.CausaDeLaMuerte,
  QuestionPersonCodes.RealizacionRitualOPracticasCulturales,
];

const schemaForm = yup.object().shape({
  FechaMuerte: yup.array().required(),
  Causa: yup.array().required(),
  RealizacionritualOpracticasculturales: yup.array().required(),
  Soportes: yup.array().required(),
});

const _MortalityLast12MonthsForm = (props: any) => {

  const syncCatalogService = new PersonService();

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

  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
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
            <BDatePickerModal
              label="Fecha de la muerte"
              disabled={false}
              onBlur={onBlur}
              error={errors.FechaMuerte}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
              value={value}
            />
          )}
          name="FechaMuerte"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionPersonCodes.CausaDeLaMuerte).name
              }
              onBlur={onBlur}
              error={errors.Causa}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              onLoad={() => {
                console.log('onLoad');
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionPersonCodes.CausaDeLaMuerte).children
              }
            />
          )}
          name="Causa"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionPersonCodes.RealizacionRitualOPracticasCulturales).name
              }
              onBlur={onBlur}
              error={errors.RealizacionritualOpracticasculturales}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              onLoad={() => {
                console.log('onLoad');
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionPersonCodes.RealizacionRitualOPracticasCulturales).children
              }
            />
          )}
          name="RealizacionritualOpracticasculturales"
        />
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BImagePicker
              label="Soporte"
              onBlur={onBlur}
              error={errors.Soportes}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Images: ', value);
              }}
              value={value}
            />
          )}
          name="Sportes"
        />
        <BButton
          color="secondary"
          value="Guardar Cambios"
          onPress={handleSubmit(onSubmit)}
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
});

const mapDispatchToProps = {
  getQuestionWithOptions,
};

const mapStateToProps = (session: any) => {
  return {
    user: session.session.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(_MortalityLast12MonthsForm);
