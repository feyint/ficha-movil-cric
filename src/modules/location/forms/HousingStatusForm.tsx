/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BPicker} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {QuestionFamilyCodes} from '../../../core/utils/HousingTypes';
import {
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
} from '../../../state/house/actions';
import {useFNBNUCVIV_FVCCONVIV, useFVCCONVIV} from '../../../hooks';
import {FVCCONVIV} from '../../../types';
const schemaForm = yup.object().shape({
  Techo: yup.number().required(),
  Piso: yup.number().required(),
  Pared: yup.number().required(),
  Ventilacion: yup.number().required(),
  Iluminacion: yup.number().required(),
});
const questions = [
  QuestionFamilyCodes.Techo,
  QuestionFamilyCodes.Piso,
  QuestionFamilyCodes.Pared,
  QuestionFamilyCodes.Ventilacion,
  QuestionFamilyCodes.Iluminacion,
];
const _HousingStatusForm = (props: any) => {
  const navigation = useNavigation();
  const {
    listFVCCONVIV,
    getQuestionsOptions,
    getFVCCONVIVpicker,
  } = useFVCCONVIV();
  const {saveAnswer, getAnswerquestion} = useFNBNUCVIV_FVCCONVIV();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    getAnswersFNBNUCVIV();
  }, [listFVCCONVIV]);

  async function fetchQuestions() {
    getQuestionsOptions(questions);
  }
  async function getAnswersFNBNUCVIV() {
    getAnswers(QuestionFamilyCodes.Techo, 'Techo');
    getAnswers(QuestionFamilyCodes.Piso, 'Piso');
    getAnswers(QuestionFamilyCodes.Pared, 'Pared');
    getAnswers(QuestionFamilyCodes.Ventilacion, 'Ventilacion');
    getAnswers(QuestionFamilyCodes.Iluminacion, 'Iluminacion');
  }
  function onSubmit(data: any) {
    SaveAnswers(QuestionFamilyCodes.Techo, data.Techo);
    SaveAnswers(QuestionFamilyCodes.Piso, data.Piso);
    SaveAnswers(QuestionFamilyCodes.Pared, data.Pared);
    SaveAnswers(QuestionFamilyCodes.Ventilacion, data.Ventilacion);
    SaveAnswers(QuestionFamilyCodes.Iluminacion, data.Iluminacion);
    navigation.goBack();
  }

  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
  ) {
    let question = listFVCCONVIV.find((item: FVCCONVIV) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNBNUCVIV;
      saveAnswer(type, answer, ID, question.FVCELEVIV_ID);
    }
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFVCCONVIV.find((item: FVCCONVIV) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNBNUCVIV;
      let ans = await getAnswerquestion(ID, question.FVCELEVIV_ID, type);
      setValue(prop, '' + ans);
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Techo"
              enabled={true}
              onBlur={onBlur}
              error={errors.Techo}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.Techo)}
            />
          )}
          name="Techo"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Piso"
              enabled={true}
              onBlur={onBlur}
              error={errors.Piso}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.Piso)}
            />
          )}
          name="Piso"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Pared"
              enabled={true}
              onBlur={onBlur}
              error={errors.Pared}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.Pared)}
            />
          )}
          name="Pared"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Ventilación"
              enabled={true}
              onBlur={onBlur}
              error={errors.Ventilacion}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.Ventilacion)}
            />
          )}
          name="Ventilacion"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Iluminación"
              enabled={true}
              onBlur={onBlur}
              error={errors.Iluminacion}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.Iluminacion)}
            />
          )}
          name="Iluminacion"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
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
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
};
const mapStateToProps = (store: any) => {
  return {
    FNBNUCVIV: store.housing.FNBNUCVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_HousingStatusForm);
