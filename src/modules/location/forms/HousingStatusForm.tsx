/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BPicker} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {HousingService} from '../../../services';
import {HousingQuestion} from '../../housing/state/types';
import {
  QuestionFamilyCodes,
  QuestionTypes,
} from '../../../core/utils/HousingTypes';
import {
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
} from '../../../state/house/actions';
import { PickerType } from '../../../core/utils/types';
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
  const syncCatalogService = new HousingService();
  const [TechoSelect, setTechoSelect] = useState<PickerType[]>([]);
  const [PisoSelect, setPisoSelect] = useState<PickerType[]>([]);
  const [ParedSelect, setParedSelect] = useState<PickerType[]>([]);
  const [VentilacionSelect, setVentilacionSelect] = useState<PickerType[]>([]);
  const [IluminacionSelect, setIluminacionSelect] = useState<PickerType[]>([]);
  const [questionsItems, setquestionsItems] = useState<HousingQuestion[]>([]);
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    getAnswersFNBNUCVIV();
  }, [questionsItems]);
  useEffect(() => {
    getAnswers(QuestionTypes.selectOne, QuestionFamilyCodes.Techo, 'Techo');
  }, [TechoSelect]);
  useEffect(() => {
    getAnswers(QuestionTypes.selectOne, QuestionFamilyCodes.Piso, 'Piso');
  }, [PisoSelect]);
  useEffect(() => {
    getAnswers(QuestionTypes.selectOne, QuestionFamilyCodes.Pared, 'Pared');
  }, [ParedSelect]);
  useEffect(() => {
    getAnswers(
      QuestionTypes.selectOne,
      QuestionFamilyCodes.Ventilacion,
      'Ventilacion',
    );
  }, [VentilacionSelect]);
  useEffect(() => {
    getAnswers(
      QuestionTypes.selectOne,
      QuestionFamilyCodes.Iluminacion,
      'Iluminacion',
    );
  }, [IluminacionSelect]);

  async function fetchQuestions() {
    let result = await props.getQuestionWithOptions(questions);
    if (result) {
      setquestionsItems(result);
    }
  }
  async function getAnswersFNBNUCVIV() {
    let TechoQuestion = syncCatalogService.getItemsForQuestionSelect(
      QuestionFamilyCodes.Techo,
      questionsItems,
    );
    setTechoSelect(TechoQuestion);
    let PisoQuestion = syncCatalogService.getItemsForQuestionSelect(
      QuestionFamilyCodes.Piso,
      questionsItems,
    );
    setPisoSelect(PisoQuestion);
    let ParedQuestion = syncCatalogService.getItemsForQuestionSelect(
      QuestionFamilyCodes.Pared,
      questionsItems,
    );
    setParedSelect(ParedQuestion);
    let VentilacionQuestion = syncCatalogService.getItemsForQuestionSelect(
      QuestionFamilyCodes.Ventilacion,
      questionsItems,
    );
    setVentilacionSelect(VentilacionQuestion);
    let IluminacionQuestion = syncCatalogService.getItemsForQuestionSelect(
      QuestionFamilyCodes.Iluminacion,
      questionsItems,
    );
    setIluminacionSelect(IluminacionQuestion);
  }
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
  }
  function onSubmit() {
    navigation.goBack();
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
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Techo,
                  vlue,
                );
              }}
              selectedValue={value}
              items={TechoSelect}
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
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Piso,
                  vlue,
                );
              }}
              selectedValue={value}
              items={PisoSelect}
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
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Pared,
                  vlue,
                );
              }}
              selectedValue={value}
              items={ParedSelect}
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
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Ventilacion,
                  vlue,
                );
              }}
              selectedValue={value}
              items={VentilacionSelect}
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
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Iluminacion,
                  vlue,
                );
              }}
              selectedValue={value}
              items={IluminacionSelect}
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
const mapStateToProps = (session) => {
  return {
    user: session.session.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_HousingStatusForm);
