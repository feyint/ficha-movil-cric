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

import {
  QuestionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {getQuestionWithOptions} from '../../../../state/person/actions';
import {PersonQuestion} from '../state/types';

const questions = [
  QuestionPersonCodes.DesarmoniaOccidental,
  QuestionPersonCodes.AntecedentesFamiliares,
];

const schemaForm = yup.object().shape({
  DesarmoniaOccidental: yup.array().required(),
  AntecedentesFamiliares: yup.array().required(),
});

const _SocialSecurityForm = (props: any) => {
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
            <BMultiSelect
              label={getQuestionlabel(QuestionPersonCodes.DesarmoniaOccidental)}
              onBlur={onBlur}
              error={errors.DesarmoniaOccidental}
              onChange={(values: any) => {
                onChange(values);
                console.log('save');
              }}
              onLoad={() => {
                console.log('onLoad');
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionPersonCodes.DesarmoniaOccidental,
              )}
            />
          )}
          name="DesarmoniasOccidentales"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionPersonCodes.AntecedentesFamiliares,
              )}
              onBlur={onBlur}
              error={errors.AntecedentesFamiliares}
              onChange={(values: any) => {
                onChange(values);
                console.log('save');
              }}
              onLoad={() => {
                console.log('onLoad');
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionPersonCodes.AntecedentesFamiliares,
              )}
            />
          )}
          name="AntecedentesFamiliares"
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
};
const mapStateToProps = (session: any) => {
  return {
    user: session.session.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_SocialSecurityForm);
