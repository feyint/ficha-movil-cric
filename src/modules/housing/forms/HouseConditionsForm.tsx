import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BMultiSelect, BPicker} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {HousingService} from '../../../services';
import {HousingQuestion} from '../state/types';
import {QuestionCodes, QuestionTypes} from '../../../core/utils/HousingTypes';
import {
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
} from '../../../state/house/actions';
import {propName, propNameQuestion} from '../../../core/utils/utils';
const questions = [
  QuestionCodes.FuentedeAgua,
  QuestionCodes.AlmacenamientoAguaconsumo,
  QuestionCodes.Tratamientoagua,
  QuestionCodes.Estadodelrecipiente,
  QuestionCodes.ManejoderesiduosBiodegradables,
  QuestionCodes.ManejoresiduosOrdinariosnoreciclables,
  QuestionCodes.ManejoresiduosReciclables,
  QuestionCodes.Manejoresiduospeligrosos,
  QuestionCodes.Eliminacionexcretas,
  QuestionCodes.Eliminacionexcretas,
  QuestionCodes.DisposicionfinalAguasdomesticas,
  QuestionCodes.Presenciadevectoresyroedoresdentrodelacasa,
  QuestionCodes.TipodeRiesgodelavivienda,
  QuestionCodes.Tipodeespacioproductivo,
  QuestionCodes.Destinodelosproductos,
  QuestionCodes.Practicasculturalesenelespacioproductivo,
  QuestionCodes.Actividadesproductivasdentrodelavivienda,
  QuestionCodes.Participalafamiliadepracticasculturalescolectivas,
];
const schemaForm = yup.object().shape({
  FuentedeAgua: yup.array().required(),
  AlmacenamientoAguaconsumo: yup.array().required(),
  Tratamientoagua: yup.array().required(),
  Estadodelrecipiente: yup.number().required(),
  // ManejoderesiduosBiodegradables: yup.array().required(),
  // ManejoresiduosOrdinariosnoreciclables: yup.array().required(),
  // ManejoresiduosReciclables: yup.array().required(),
  // Manejoresiduospeligrosos: yup.array().required(),
  // Eliminacionexcretas: yup.array().required(),
  // DisposicionfinalAguasdomesticas: yup.array().required(),
  // Presenciadevectoresyroedoresdentrodelacasa: yup.array().required(),
  // TipodeRiesgodelavivienda: yup.array().required(),
  // Tipodeespacioproductivo: yup.array().required(),
  // Destinodelosproductos: yup.array().required(),
  // Practicasculturalesenelespacioproductivo: yup.array().required(),
  // Actividadesproductivasdentrodelavivienda: yup.array().required(),
  // Participalafamiliadepracticasculturalescolectivas: yup.array().required(),
});
const _HouseConditionForm = (props: any) => {
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
    console.log('DD ',question);
    setValue(prop, question);
  }
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
    console.log('ddd', data);
    navigation.goBack();
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionCodes.FuentedeAgua)}
              onBlur={onBlur}
              error={errors.FuentedeAgua}
              onChange={(values: any) => {
                console.log('FuentedeAgua ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionCodes.FuentedeAgua,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionCodes.FuentedeAgua,
                  'FuentedeAgua',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(QuestionCodes.FuentedeAgua)}
            />
          )}
          name="FuentedeAgua"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionCodes.Tratamientoagua)}
              onBlur={onBlur}
              error={errors.Tratamientoagua}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionCodes.Tratamientoagua,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionCodes.Tratamientoagua,
                  'Tratamientoagua',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionCodes.Tratamientoagua,
              )}
            />
          )}
          name="Tratamientoagua"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionCodes.AlmacenamientoAguaconsumo)}
              onBlur={onBlur}
              error={errors.AlmacenamientoAguaconsumo}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionCodes.AlmacenamientoAguaconsumo,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionCodes.AlmacenamientoAguaconsumo,
                  'AlmacenamientoAguaconsumo',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionCodes.AlmacenamientoAguaconsumo,
              )}
            />
          )}
          name="AlmacenamientoAguaconsumo"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Estado del recipiente"
              prompt="Seleccione una opción"
              onBlur={onBlur}
              error={errors.Estadodelrecipiente}
              onChange={(vlue: any) => {
                console.error(vlue);
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionCodes.Estadodelrecipiente,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionCodes.Estadodelrecipiente,
                  'Estadodelrecipiente',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionCodes.Estadodelrecipiente)
                  .children
              }
            />
          )}
          name="Estadodelrecipiente"
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HouseConditionForm);
