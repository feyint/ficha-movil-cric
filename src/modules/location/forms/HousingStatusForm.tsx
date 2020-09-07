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
import {QuestionFamilyCodes, QuestionTypes} from '../../../core/utils/HousingTypes';
import {SelectSchema} from '../../../core/utils/types';
import {capitalizeFirstLetter} from '../../../core/utils/utils';
import {
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
} from '../../../state/house/actions';
const schemaForm = yup.object().shape({
  ceiling: yup.number().positive().required(),
  floor: yup.number().positive().required(),
  wall: yup.number().positive().required(),
  ilumination: yup.number().positive().required(),
  ventilation: yup.number().positive().required(),
});

const _HousingStatusForm = (props: any) => {
  const navigation = useNavigation();
  const syncCatalogService = new HousingService();

  const [state, setState] = useState({
    questions: [] as HousingQuestion[],
  });
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    let result = await syncCatalogService.getQuestionWithOptions([
      QuestionCodes.Techo,
      QuestionCodes.Pared,
      QuestionCodes.Piso,
      QuestionCodes.Ventilacion,
      QuestionCodes.Iluminacion,
    ]);
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
  }

  /* const { handleSubmit, control, errors, setValue } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      ceiling: user.user.ceiling,
      floor: user.user.floor,
      wall: user.user.wall,
      ilumination: user.user.ilumination,
      ventilation: user.user.ventilation,
    },
  }); */
  /* const defaultOptions = [
    { label: 'Seleccione', value: '1' },
    { label: 'Adecuado', value: '2' },
    { label: 'No adecuado', value: '3' },
  ];
 */
  const getItemsForQuestionSelect = (code: string) => {
    let item: SelectSchema = { name: '', id: 0, children: [] };
    for (let i = 0; i < state.questions.length; i++) {
      if (state.questions[i].CODIGO === code) {
        item.id = state.questions[i].ID;
        item.name = capitalizeFirstLetter(state.questions[i].NOMBRE);
        for (let option of state.questions[i].OPTIONS) {
          item.children.push({ value: option.ID.toString(), label: option.NOMBRE });
        }
        item.children.unshift({ value: '-1', label: 'Seleccione' });
      }
    }
    return item;
  }

  const { handleSubmit, control, errors, setValue } = useForm({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.goBack();
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          //defaultValue=""
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              //label="Techo"
              //prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.ceiling}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.Techo).children
              }
            />
          )}
          name="Techo"
        />
        <Text>{getItemsForQuestionSelect(QuestionCodes.Piso).name}</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              //label="Piso"
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
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Piso,
                  'Piso',
                );
              }}
              value={value}
              selectedValue={value}
              items={getItemsForQuestionSelect(QuestionCodes.Piso).children}
            />
          )}
          name="Piso"
        />
        <Text>{getItemsForQuestionSelect(QuestionCodes.Pared).name}</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              //label="Pared"
              onBlur={onBlur}
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
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Pared,
                  'Pared',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.Pared).children
              }
            />
          )}
          name="Pared"
        />
        <Text>{getItemsForQuestionSelect(QuestionCodes.Ventilacion).name}</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              //label="Ventilation"
              onBlur={onBlur}
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
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Ventilacion,
                  'Ventilacion',
                );
              }}
              value={value}
              selectedValue={value}
              items={getItemsForQuestionSelect(QuestionCodes.Ventilacion).children}
            />
          )}
          name="Ventilacion"
        />
        <Text>{getItemsForQuestionSelect(QuestionCodes.Iluminacion).name}</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              //label="Iluminacion"
              onBlur={onBlur}
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
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Iluminacion,
                  'Iluminacion',
                );
              }}
              value={value}
              selectedValue={value}
              items={getItemsForQuestionSelect(QuestionCodes.Iluminacion).children}
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
