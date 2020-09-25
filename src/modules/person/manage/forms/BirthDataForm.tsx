import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BMultiSelect, BPicker} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {ConditionPersonService} from '../../../../services';

import {
  QuestionConditionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/ConditionPerson/actions';
import {ConditionPersonQuestion} from '../state/types';

const questions = [
  QuestionConditionPersonCodes.LunaOccidental,
  QuestionConditionPersonCodes.LactanciaMaterna,
];

const schemaForm = yup.object().shape({
  LunaOccidental: yup.number().required(),
  LactanciaMaterna: yup.number().required(),
});

const _BirthDataForm = (props: any) => {
  const syncCatalogService = new ConditionPersonService();

  const [state, setState] = useState({
    questions: [] as ConditionPersonQuestion[],
  });

  //const [pikerEnable, setPikerEnable] = useState(false);

  const navigation = useNavigation();

  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

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
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.LunaOccidental,
              )}
              onBlur={onBlur}
              error={errors.LunaOccidental}
              onChange={(value: any) => {
                onChange(value);
                console.log('save luna en la q nacio value es: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LunaOccidental,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LunaOccidental,
                  'LunaOccidental',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.LunaOccidental,
                ).children
              }
            />
          )}
          name="LunaOccidental"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.LactanciaMaterna,
              )}
              onBlur={onBlur}
              error={errors.LactanciaMaterna}
              onChange={(value: any) => {
                onChange(value);
                console.log('save: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LactanciaMaterna,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LactanciaMaterna,
                  'LactanciaMaterna',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.LactanciaMaterna,
                ).children
              }
            />
          )}
          name="LactanciaMaterna"
        />
        {/* <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionConditionPersonCodes.ProgramaDeSalud,
              )}
              onBlur={onBlur}
              error={errors.ProgramaDeSalud}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.ProgramaDeSalud,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.ProgramaDeSalud,
                  'ProgramaDeSalud',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.ProgramaDeSalud,
              )}
            />
          )}
          name="ProgramaDeSalud"
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
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
};
const mapStateToProps = (session: any) => {
  return {
    user: session.session.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_BirthDataForm);
