import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BButton,
  BMultiSelect,
  BPicker,
  BRadioButton,
  BTextInput,
} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {HousingService} from '../../../services';
import {HousingQuestion} from '../state/types';
import {
  QuestionFamilyCodes,
  QuestionTypes,
  logicOption,
} from '../../../core/utils/HousingTypes';
import {
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
  saveFNBNUCVIVPropiety,
} from '../../../state/house/actions';
import BNumberInput from '../../../core/components/BNumberInput';
const questions = [
  QuestionFamilyCodes.FuentedeAgua,
  QuestionFamilyCodes.AlmacenamientoAguaconsumo,
  QuestionFamilyCodes.Tratamientoagua,
  QuestionFamilyCodes.Estadodelrecipiente,
  QuestionFamilyCodes.ManejoderesiduosBiodegradables,
  QuestionFamilyCodes.ManejoresiduosOrdinariosnoreciclables,
  QuestionFamilyCodes.ManejoresiduosReciclables,
  QuestionFamilyCodes.Manejoresiduospeligrosos,
  QuestionFamilyCodes.Eliminacionexcretas,
  QuestionFamilyCodes.Eliminacionexcretas,
  QuestionFamilyCodes.DisposicionfinalAguasdomesticas,
  QuestionFamilyCodes.ConvivenciaAnimalesCasa,
  QuestionFamilyCodes.PresenciadevectoresCasa,
  QuestionFamilyCodes.TipodeRiesgodelavivienda,
  QuestionFamilyCodes.Tipodeespacioproductivo,
  QuestionFamilyCodes.Destinodelosproductos,
  QuestionFamilyCodes.PracticasCulturalesProductivo,
  QuestionFamilyCodes.ActividadesProductivasVivienda,
  QuestionFamilyCodes.FamiliaPracticasCulturales,
];
const schemaForm = yup.object().shape({
  FuentedeAgua: yup.array().required(),
  AlmacenamientoAguaconsumo: yup.array().required(),
  Tratamientoagua: yup.array().required(),
  Estadodelrecipiente: yup.number().required(),
  ResiduosGeneranenVivienda: yup
    .string()
    .required()
    .oneOf(['bio', 'peligroso']),
  ManejoderesiduosBiodegradables: yup.number().required(),
  ManejoresiduosOrdinariosnoreciclables: yup.number().required(),
  ManejoresiduosReciclables: yup.number().required(),
  Manejoresiduospeligrosos: yup.number().required(),
  Eliminacionexcretas: yup.number().required(),
  ConvivenciaAnimalesCasa: yup.number().required(),
  DisposicionfinalAguasdomesticas: yup.number().required(),
  PresenciadevectoresCasa: yup.array().required(),
  TipodeRiesgodelavivienda: yup.array().required(),
  Tipodeespacioproductivo: yup.number().required(),
  Destinodelosproductos: yup.array().required(),
  PracticasCulturalesProductivo: yup.array().required(),
  ActividadesProductivasVivienda: yup.array().required(),
  FamiliaPracticasCulturales: yup.array().required(),
  RiesgoVivienda: yup.string().required().oneOf(['SI', 'NO']),
  NumeroAnimales: yup.number().required(),
  NumeroAnimalesnoVacunados: yup.number().required(),
  Observaciones: yup.string().optional(),
});
const ResiduosViviendaOption = [
  {value: 'bio', label: 'Biodegradable, Ordinario, Reciclable'},
  {value: 'peligroso', label: 'Peligroso'},
];
const _HouseConditionForm = (props: any) => {
  const syncCatalogService = new HousingService();
  const [state, setState] = useState({
    questions: [] as HousingQuestion[],
  });
  const [numeroAnimales, setNumeroAnimales] = useState('');
  const [numeroAnimalesnoVacunados, setNumeroAnimalesnoVacunados] = useState('');
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
        questions: result,
      });
    }

    //getAnswersFNBNUCVIV();
    // console.error(
    //   'props.FNBNUCVIV.ANIMAL_VACUNADO',
    //   props.FNBNUCVIV.ANIMAL_VACUNADO,
    // );
    getAnswersFNBNUCVIV();
  }
  async function getAnswersFNBNUCVIV() {
    if (
      props.FNBNUCVIV.ANIMAL_VACUNADO &&
      props.FNBNUCVIV.ANIMAL_VACUNADO !== 'null'
    ) {
      setValue('NumeroAnimales', '' + props.FNBNUCVIV.ANIMAL_VACUNADO);
      setNumeroAnimales('' + props.FNBNUCVIV.ANIMAL_VACUNADO);
    }
    if (
      props.FNBNUCVIV.ANIMAL_NOVACUNADO &&
      props.FNBNUCVIV.ANIMAL_NOVACUNADO !== 'null'
    ) {
      setValue(
        'NumeroAnimalesnoVacunados',
        '' + props.FNBNUCVIV.ANIMAL_NOVACUNADO,
      );
    }
    setValue('ResiduosGeneranenVivienda', props.FNBNUCVIV.RESIDUO_BOR);
    setValue('setNumeroAnimalesnoVacunados', props.FNBNUCVIV.RIESGO);
    setValue('Observaciones', props.FNBNUCVIV.OBSERVACION);
  }
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
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
    navigation.goBack();
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionFamilyCodes.FuentedeAgua)}
              onBlur={onBlur}
              error={errors.FuentedeAgua}
              onChange={(values: any) => {
                console.log('FuentedeAgua ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.FuentedeAgua,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.FuentedeAgua,
                  'FuentedeAgua',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.FuentedeAgua,
              )}
            />
          )}
          name="FuentedeAgua"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionFamilyCodes.Tratamientoagua)}
              onBlur={onBlur}
              error={errors.Tratamientoagua}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.Tratamientoagua,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.Tratamientoagua,
                  'Tratamientoagua',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.Tratamientoagua,
              )}
            />
          )}
          name="Tratamientoagua"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.AlmacenamientoAguaconsumo,
              )}
              onBlur={onBlur}
              error={errors.AlmacenamientoAguaconsumo}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.AlmacenamientoAguaconsumo,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.AlmacenamientoAguaconsumo,
                  'AlmacenamientoAguaconsumo',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.AlmacenamientoAguaconsumo,
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
              onBlur={onBlur}
              error={errors.Estadodelrecipiente}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Estadodelrecipiente,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Estadodelrecipiente,
                  'Estadodelrecipiente',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Estadodelrecipiente,
                ).children
              }
            />
          )}
          name="Estadodelrecipiente"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BRadioButton
              label="Residuos que se generan en la vivienda"
              value={value}
              items={ResiduosViviendaOption}
              error={errors.ResiduosGeneranenVivienda}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  props.saveFNBNUCVIVPropiety('RESIDUO_BOR', value);
                }
              }}
            />
          )}
          name="ResiduosGeneranenVivienda"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Manejo de residuos Biodegradables"
              onBlur={onBlur}
              error={errors.ManejoderesiduosBiodegradables}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ManejoderesiduosBiodegradables,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ManejoderesiduosBiodegradables,
                  'ManejoderesiduosBiodegradables',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.ManejoderesiduosBiodegradables,
                ).children
              }
            />
          )}
          name="ManejoderesiduosBiodegradables"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Manejo residuos Ordinarios no reciclables"
              onBlur={onBlur}
              error={errors.ManejoresiduosOrdinariosnoreciclables}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ManejoresiduosOrdinariosnoreciclables,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ManejoresiduosOrdinariosnoreciclables,
                  'ManejoresiduosOrdinariosnoreciclables',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.ManejoresiduosOrdinariosnoreciclables,
                ).children
              }
            />
          )}
          name="ManejoresiduosOrdinariosnoreciclables"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Manejo residuos Reciclables"
              onBlur={onBlur}
              error={errors.ManejoresiduosReciclables}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ManejoresiduosReciclables,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ManejoresiduosReciclables,
                  'ManejoresiduosReciclables',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.ManejoresiduosReciclables,
                ).children
              }
            />
          )}
          name="ManejoresiduosReciclables"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Manejo residuos peligrosos"
              onBlur={onBlur}
              error={errors.Manejoresiduospeligrosos}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Manejoresiduospeligrosos,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Manejoresiduospeligrosos,
                  'Manejoresiduospeligrosos',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Manejoresiduospeligrosos,
                ).children
              }
            />
          )}
          name="Manejoresiduospeligrosos"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Eliminación excretas"
              onBlur={onBlur}
              error={errors.Eliminacionexcretas}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Eliminacionexcretas,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Eliminacionexcretas,
                  'Eliminacionexcretas',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Eliminacionexcretas,
                ).children
              }
            />
          )}
          name="Eliminacionexcretas"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Disposición final Aguas residuales domesticas"
              onBlur={onBlur}
              error={errors.DisposicionfinalAguasdomesticas}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.DisposicionfinalAguasdomesticas,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.DisposicionfinalAguasdomesticas,
                  'DisposicionfinalAguasdomesticas',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.DisposicionfinalAguasdomesticas,
                ).children
              }
            />
          )}
          name="DisposicionfinalAguasdomesticas"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Convivencia con animales adentro de la casa"
              onBlur={onBlur}
              error={errors.ConvivenciaAnimalesCasa}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ConvivenciaAnimalesCasa,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.ConvivenciaAnimalesCasa,
                  'ConvivenciaAnimalesCasa',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.ConvivenciaAnimalesCasa,
                ).children
              }
            />
          )}
          name="ConvivenciaAnimalesCasa"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BNumberInput
              label="Número de animales vacunados"
              error={errors.NumeroAnimales}
              onChange={(vlue: any) => {
                onChange(vlue);
                setNumeroAnimales('' + vlue);
                if (vlue) {
                  props.saveFNBNUCVIVPropiety('ANIMAL_VACUNADO', vlue);
                }
              }}
              value={numeroAnimales}
            />
          )}
          name="NumeroAnimales"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BNumberInput
              label="Número de animales no vacunados"
              error={errors.NumeroAnimalesnoVacunados}
              onChange={(vlue: number) => {
                onChange(vlue);
                props.saveFNBNUCVIVPropiety('ANIMAL_NOVACUNADO', vlue);
              }}
              value={value}
            />
          )}
          name="NumeroAnimalesnoVacunados"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.TipodeRiesgodelavivienda,
              )}
              onBlur={onBlur}
              error={errors.TipodeRiesgodelavivienda}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.TipodeRiesgodelavivienda,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.TipodeRiesgodelavivienda,
                  'TipodeRiesgodelavivienda',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.TipodeRiesgodelavivienda,
              )}
            />
          )}
          name="TipodeRiesgodelavivienda"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BRadioButton
              label="Riesgo de la vivienda"
              value={value}
              items={logicOption}
              error={errors.RiesgoVivienda}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  props.saveFNBNUCVIVPropiety('RIESGO', JSON.parse(value));
                }
              }}
            />
          )}
          name="RiesgoVivienda"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.PresenciadevectoresCasa,
              )}
              onBlur={onBlur}
              error={errors.PresenciadevectoresCasa}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.PresenciadevectoresCasa,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.PresenciadevectoresCasa,
                  'PresenciadevectoresCasa',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.PresenciadevectoresCasa,
              )}
            />
          )}
          name="PresenciadevectoresCasa"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Tipo de espacio productivo"
              onBlur={onBlur}
              error={errors.Tipodeespacioproductivo}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Tipodeespacioproductivo,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Tipodeespacioproductivo,
                  'Tipodeespacioproductivo',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Tipodeespacioproductivo,
                ).children
              }
            />
          )}
          name="Tipodeespacioproductivo"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.Destinodelosproductos,
              )}
              onBlur={onBlur}
              error={errors.Destinodelosproductos}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.Destinodelosproductos,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.Destinodelosproductos,
                  'Destinodelosproductos',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.Destinodelosproductos,
              )}
            />
          )}
          name="Destinodelosproductos"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.PracticasCulturalesProductivo,
              )}
              onBlur={onBlur}
              error={errors.PracticasCulturalesProductivo}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.PracticasCulturalesProductivo,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.PracticasCulturalesProductivo,
                  'PracticasCulturalesProductivo',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.PracticasCulturalesProductivo,
              )}
            />
          )}
          name="PracticasCulturalesProductivo"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.ActividadesProductivasVivienda,
              )}
              onBlur={onBlur}
              error={errors.ActividadesProductivasVivienda}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.ActividadesProductivasVivienda,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.ActividadesProductivasVivienda,
                  'ActividadesProductivasVivienda',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.ActividadesProductivasVivienda,
              )}
            />
          )}
          name="ActividadesProductivasVivienda"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionFamilyCodes.FamiliaPracticasCulturales,
              )}
              onBlur={onBlur}
              error={errors.FamiliaPracticasCulturales}
              onChange={(values: any) => {
                console.log('respuesta ', values);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.FamiliaPracticasCulturales,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionFamilyCodes.FamiliaPracticasCulturales,
                  'FamiliaPracticasCulturales',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionFamilyCodes.FamiliaPracticasCulturales,
              )}
            />
          )}
          name="FamiliaPracticasCulturales"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Observaciones"
              multiline={true}
              numberOfLines={3}
              onBlur={onBlur}
              error={errors.Observaciones}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  props.saveFNBNUCVIVPropiety('OBSERVACION', value);
                }
              }}
              value={value}
            />
          )}
          name="Observaciones"
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
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
  saveFNBNUCVIVPropiety,
};
const mapStateToProps = (housing: any) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HouseConditionForm);
