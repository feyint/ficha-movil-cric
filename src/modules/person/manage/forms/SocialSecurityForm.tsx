import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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
import { colors } from 'react-native-elements';
import {theme} from '../../../../core/style/theme';

const questions = [
  QuestionConditionPersonCodes.SeguridadSocial,
  QuestionConditionPersonCodes.EPS,
  QuestionConditionPersonCodes.ProgramaDeSalud,
];

const schemaForm = yup.object().shape({
  SeguridadSocial: yup.number().required(),
  //EPS: yup.number().optional(),
  ProgramaDeSalud: yup.array().required(),
  EPS: yup.string().when('SeguridadSocial', {
    is: '91',
    then: yup.string().required(),
    otherwise: yup.string().notRequired(),
  }),
});

const _SocialSecurityForm = (props: any) => {
  const syncCatalogService = new ConditionPersonService();

  const [state, setState] = useState({
    questions: [] as ConditionPersonQuestion[],
  });

  const [enableEPS, setEnableEPS] = useState(false);

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
    if (prop == 'SeguridadSocial') {
      setEnableEPS(question !== '91');
    }
  }

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, state.questions);
  };
  const validateSocialSecurity = (value: string) => {
    setEnableEPS(value !== '91');
    if (value == '91') {
      props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.EPS,
        null,
      );
    }
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questions,
    );
  };
  function alert(data: any) {
    Alert.alert(
      'Volver!!!',
      'Esta seguro?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => navigation.goBack()},
      ],
      {cancelable: false},
    );
  }
  function onSubmit(data: any) {
    navigation.goBack();
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.SeguridadSocial,
              )}
              error={errors.SeguridadSocial}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.SeguridadSocial,
                    value,
                  );
                  validateSocialSecurity(value);
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.SeguridadSocial,
                  'SeguridadSocial',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.SeguridadSocial,
                ).children
              }
            />
          )}
          name="SeguridadSocial"
        />
        {enableEPS ? (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                enabled={enableEPS}
                label={'Empresa afiliado'}
                onBlur={onBlur}
                error={errors.EPS}
                onChange={(value: any) => {
                  if (value) {
                    onChange(value);
                    props.saveAnswerLocal(
                      QuestionTypes.selectOne,
                      QuestionConditionPersonCodes.EPS,
                      value,
                    );
                  }
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.EPS,
                    'EPS',
                  );
                }}
                selectedValue={value}
                items={
                  getItemsForQuestionSelect(QuestionConditionPersonCodes.EPS)
                    .children
                }
              />
            )}
            name="EPS"
          />
        ) : null}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionConditionPersonCodes.ProgramaDeSalud,
              )}
              onBlur={onBlur}
              error={errors.ProgramaDeSalud}
              onChange={(values: any) => {
                if (values) {
                  onChange(values);
                  props.saveAnswerLocal(
                    QuestionTypes.multiSelect,
                    QuestionConditionPersonCodes.ProgramaDeSalud,
                    values,
                  );
                }
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
        />
        <View
          style={{display: 'flex', flexDirection: 'row', marginLeft: '20%'}}>
          <BButton
            style={styles.aceptButon}
            color="secondary"
            value="Cancelar"
            labelStyle={styles.text}
            onPress={alert}
          />
          <BButton
            style={styles.cancelButon}
            color="secondary"
            //labelStyle={styles.text}
            value="Validar"
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
  buton: {
    width: '25%',
    //backgroundColor: colors.primary,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_SocialSecurityForm);
