/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BMultiSelect, BPicker, ButtonAction} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/ConditionPerson/actions';
import {useFNCCONPER, useFNCPERSON_FNCCONPER} from '../../../../hooks';
import {FNCCONPER} from '../../../../types';
import { PersonParametersConst } from '../../../../core/utils/SystemParameters';

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
  const {
    listFNCCONPER,
    getLabel,
    getQuestionsOptions,
    getPicker,
    getMultiselect,
    getByID,
  } = useFNCCONPER();
  const {saveAnswer, getAnswerquestion} = useFNCPERSON_FNCCONPER();
  const [enableEPS, setEnableEPS] = useState(false);
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  useEffect(() => {
    getQuestionsOptions(questions);
  }, []);
  useEffect(() => {
    getAnswersFNCCONPER();
  }, [listFNCCONPER]);
  async function getAnswersFNCCONPER() {
    let ans = await getAnswers(
      QuestionConditionPersonCodes.SeguridadSocial,
      'SeguridadSocial',
    );
    getAnswers(QuestionConditionPersonCodes.EPS, 'EPS');
    getAnswers(
      QuestionConditionPersonCodes.ProgramaDeSalud,
      'ProgramaDeSalud',
      2,
    );
    validateSocialSecurity(ans);
  }
  function onSubmit(data: any) {
    SaveAnswers(
      QuestionConditionPersonCodes.SeguridadSocial,
      data.SeguridadSocial,
    );
    SaveAnswers(QuestionConditionPersonCodes.EPS, data.EPS);
    SaveAnswers(
      QuestionConditionPersonCodes.ProgramaDeSalud,
      data.ProgramaDeSalud,
      2,
    );
    navigation.goBack();
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONPER.find((item: FNCCONPER) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNCPERSON;
      await saveAnswer(type, answer, ID, question.FNCELEPER_ID);
    }
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONPER.find((item: FNCCONPER) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNCPERSON;
      let ans = await getAnswerquestion(ID, question.FNCELEPER_ID, type);
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
  function validateSocialSecurity(id: any) {
    let item: FNCCONPER = getByID(id);
    if (
      item &&
      item.CODIGO !== PersonParametersConst.poplacionpobrenoaseguradacode
    ) {
      setEnableEPS(true);
    } else {
      setEnableEPS(false);
      setValue('EPS', '');
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={getLabel(QuestionConditionPersonCodes.SeguridadSocial)}
              error={errors.SeguridadSocial}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  validateSocialSecurity(value);
                }
              }}
              selectedValue={value}
              items={getPicker(QuestionConditionPersonCodes.SeguridadSocial)}
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
                  }
                }}
                selectedValue={value}
                items={getPicker(QuestionConditionPersonCodes.EPS)}
              />
            )}
            name="EPS"
          />
        ) : null}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(QuestionConditionPersonCodes.ProgramaDeSalud)}
              onBlur={onBlur}
              error={errors.ProgramaDeSalud}
              onChange={(values: any) => {
                if (values) {
                  onChange(values);
                }
              }}
              selectedItems={value}
              items={getMultiselect(
                QuestionConditionPersonCodes.ProgramaDeSalud,
              )}
            />
          )}
          name="ProgramaDeSalud"
        />
        <ButtonAction
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
      </View>
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
    FNCPERSON: session.person.FNCPERSON,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_SocialSecurityForm);
