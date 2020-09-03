import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { BButton, BTextInput, BPicker } from '../../../core/components';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as catalogsAction from '../../location/state/actions';
import * as catalogutilities from '../../../core/utils/catalog';
import { Catalog } from '../state/types';
import { capitalizeFirstLetter } from '../../../core/utils/utils';
import { HousingService } from '../../../services';
import { HousingQuestion } from '../../housing/state/types';
import { SelectSchema } from '../../../core/utils/types';
import { QuestionCodes, QuestionTypes } from '../../../core/utils/HousingTypes';

const schemaForm = yup.object().shape({
  housecode: yup.string().required(),
  roofmaterial: yup.string().required(),
  floormaterial: yup.string().required(),
  wallmaterial: yup.string().required(),
  houseTenure: yup.string().required(),
});

/*const questionsCodes = {
  FVCELEVIV2: '2',
  FVCELEVIV3: '3',
  FVCELEVIV4: '4',
};*/

const _HouseForm = (props: any) => {
  const navigation = useNavigation();

  const syncCatalogService = new HousingService();
  const [state, setState] = useState({
    questions: [] as HousingQuestion[],
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    let result = await syncCatalogService.getQuestionWithOptions();
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
  }

  const getItemsForQuestion = (code: string) => {
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
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text>Código vivienda</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BTextInput
              label="Código vivienda"
              disabled={false}
              onBlur={onBlur}
              error={errors.housecode}
              onChange={(value: any) => {
                console.log('Selected Item: ', value);
              }}
              value={value}
            />
          )}
          name="housecode"
        />
        <Text>{getItemsForQuestion(QuestionCodes.MaterialTecho).name}</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              // label="Material Techo"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.roofmaterial}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
              value={value}
              selectedValue={value}
              items={getItemsForQuestion(QuestionCodes.MaterialTecho).children}
            />
          )}
          name="roofmaterial"
        />
        <Text>{getItemsForQuestion(QuestionCodes.MaterialPiso).name}</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              // label="Material Piso"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.floormaterial}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={getItemsForQuestion(QuestionCodes.MaterialPiso).children}
            />
          )}
          name="floormaterial"
        />
        <Text>{getItemsForQuestion(QuestionCodes.MaterialPared).name}</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              // label="Material Pared"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.wallmaterial}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={getItemsForQuestion(QuestionCodes.MaterialPared).children}
            />
          )}
          name="wallmaterial"
        />
        <Text>{getItemsForQuestion(QuestionCodes.Tenenciavivienda).name}</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <BPicker
              // label="Tenencia vivienda"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.wallmaterial}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={getItemsForQuestion(QuestionCodes.Tenenciavivienda).children}
            />
          )}
          name="houseTenure"
        />
        <View>
          <BButton
            color="primary"
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
    padding: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default _HouseForm;
