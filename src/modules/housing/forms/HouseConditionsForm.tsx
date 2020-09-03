import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BMultiSelect} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {HousingService} from '../../../services';
import {HousingQuestion} from '../state/types';
import {capitalizeFirstLetter} from '../../../core/utils/utils';
import {MultiSelectSchema} from '../../../core/utils/types';
import {QuestionCodes, QuestionTypes} from '../../../core/utils/HousingTypes';
import {saveAnswerLocal} from '../../../state/house/actions';
const schemaForm = yup.object().shape({
  FVCELEVIV10: yup.array().required(),
  FVCELEVIV11: yup.array().required(),
  FVCELEVIV12: yup.array().required(),
});
const _HouseConditionForm = (props, user) => {
  const syncCatalogService = new HousingService();
  const [state, setState] = useState({
    questions: [] as HousingQuestion[],
  });
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  useEffect(() => {
    fetchQuestions();
  }, []);
  async function fetchQuestions() {
    let result = await syncCatalogService.getQuestionWithOptions();
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
  }
  function getItemsForQuestion(code: string) {
    let item: MultiSelectSchema = {name: '', id: 0, children: []};
    for (let i = 0; i < state.questions.length; i++) {
      if (state.questions[i].CODIGO === code) {
        item.id = state.questions[i].ID;
        item.name = capitalizeFirstLetter(state.questions[i].NOMBRE);
        for (let option of state.questions[i].OPTIONS) {
          item.children.push({id: option.ID, name: option.NOMBRE});
        }
      }
    }
    return item;
  }
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={
                getItemsForQuestion(
                  QuestionCodes.FuentedeAguaparaelconsumohumano,
                ).name
              }
              prompt="Seleccione una opción"
              onBlur={onBlur}
              error={errors.FVCELEVIV10}
              onChange={(values: any) => {
                console.log('Selected Items: ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionCodes.FuentedeAguaparaelconsumohumano,
                  values,
                );
              }}
              value={value}
              items={getItemsForQuestion(
                QuestionCodes.FuentedeAguaparaelconsumohumano,
              )}
            />
          )}
          name="FVCELEVIV10"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={
                getItemsForQuestion(QuestionCodes.Tratamientodelaguaparaconsumo)
                  .name
              }
              prompt="Seleccione una opción"
              onBlur={onBlur}
              error={errors.FVCELEVIV11}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionCodes.FuentedeAguaparaelconsumohumano,
                  values,
                );
              }}
              value={value}
              items={getItemsForQuestion(
                QuestionCodes.Tratamientodelaguaparaconsumo,
              )}
            />
          )}
          name="FVCELEVIV11"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              single={true}
              label={
                getItemsForQuestion(
                  QuestionCodes.AlmacenamientodelAguaparaconsumo,
                ).name
              }
              prompt="Seleccione una opción"
              onBlur={onBlur}
              error={errors.FVCELEVIV12}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionCodes.FuentedeAguaparaelconsumohumano,
                  values,
                );
              }}
              value={value}
              items={getItemsForQuestion(
                QuestionCodes.AlmacenamientodelAguaparaconsumo,
              )}
            />
          )}
          name="FVCELEVIV12"
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
};
const mapStateToProps = (session) => {
  return {
    user: session.session.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HouseConditionForm);
