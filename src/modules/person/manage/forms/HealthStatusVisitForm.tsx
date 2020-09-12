/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BMultiSelect} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {PersonService} from '../../../../services';
//ximport {HousingQuestion} from '..';
import {
  QuestionPersonCodes,
  QuestionTypes,
  //logicOption,
} from '../../../../core/utils/HousingTypes';
import {
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
} from '../../../../state/person/actions';
import { PersonQuestion } from '../state/types';
const questions = [
  //QuestionFamilyCodes.AlmacenamientoAguaconsumo,
  QuestionPersonCodes.DesarmoniaOccidental,
  //QuestionFamilyCodes.Tratamientoagua,
];
const schemaForm = yup.object().shape({
  //FuentedeAgua: yup.array().required(),
  DesarmoniaOccidental: yup.array().required(),
  //Tratamientoagua: yup.array().required(),
});
/* const ResiduosViviendaOption = [
  {value: 'bio', label: 'Biodegradable, Ordinario, Reciclable'},
  {value: 'peligroso', label: 'Peligroso'},
]; */
const _HealthStatusVisitForm = (props: any) => {
  const syncCatalogService = new PersonService();
  const [state, setState] = useState({
    questions: [] as PersonQuestion[],
  });
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
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
  //get answer pendiente
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
  }
  //solo para piker
  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, state.questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
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
        {/* <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionFamilyCodes.FuentedeAgua)}
              onBlur={onBlur}
              error={errors.FuentedeAgua}
              onChange={(values: any) => {
                console.log('FuentedeAgua ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.FuentedeAgua,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.FuentedeAgua,
                  'FuentedeAgua',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.FuentedeAgua,
              )}
            />
          )}
          name="FuentedeAgua"
        /> */}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionPersonCodes.DesarmoniaOccidental)}
              onBlur={onBlur}
              error={errors.DesarmoniaOccidental}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.DesarmoniaOccidental,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.DesarmoniaOccidental,
                  'DesarmoniaOccidental',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionPersonCodes.DesarmoniaOccidental,
              )}
            />
          )}
          name="Tratamientoagua"
        />
        {/* <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.AlmacenamientoAguaconsumo,
              )}
              onBlur={onBlur}
              error={errors.AlmacenamientoAguaconsumo}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.AlmacenamientoAguaconsumo,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.AlmacenamientoAguaconsumo,
                  'AlmacenamientoAguaconsumo',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.AlmacenamientoAguaconsumo,
              )}
            />
          )}
          name="AlmacenamientoAguaconsumo"
        /> */}
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
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
};
const mapStateToProps = (session) => {
  return {
    user: session.session.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HealthStatusVisitForm);
