/* eslint-disable react-hooks/exhaustive-deps */
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
import {HousingQuestion} from '../state/types';
import {
  QuestionFamilyCodes,
  logicOption,
} from '../../../core/utils/HousingTypes';
import {setFNBNUCVIV} from '../../../state/house/actions';
import BNumberInput from '../../../core/components/BNumberInput';
import {
  useFNBNUCVIV,
  useFNBNUCVIV_FVCCONVIV,
  useFVCCONVIV,
} from '../../../hooks';
import {FNBNUCVIV, FVCCONVIV} from '../../../types';
import {Text} from 'react-native-paper';
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
  ResiduosGeneranenVivienda: yup.number().moreThan(0).required(),
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
  RiesgoVivienda: yup.boolean().required(),
  NumeroAnimales: yup.number().moreThan(-1).required(),
  NumeroAnimalesnoVacunados: yup.number().moreThan(-1).required(),
  Observaciones: yup.string().optional(),
});
const ResiduosViviendaOption = [
  {value: 1, label: 'Biodegradable, Ordinario, Reciclable'},
  {value: 2, label: 'Peligroso'},
];
const _HouseConditionForm = (props: any) => {
  const [questionsItems, setquestionsItems] = useState<HousingQuestion[]>([]);
  const [residuoBor, setresiduoBor] = useState<any>(0);
  const [observacion, setObservacion] = useState<any>('');
  const [riesgo, setRiesgo] = useState<boolean>(false);
  const [numeroAnimales, setNumeroAnimales] = useState('');
  const [numeroAnimalesnoVacunados, setNumeroAnimalesnoVacunados] = useState(
    '',
  );
  const {
    loadingFVCCONVIV,
    listFVCCONVIV,
    getQuestionsOptions,
    getFVCCONVIVpicker,
    getFVCCONVIVMultiselect,
    getLabel,
  } = useFVCCONVIV();
  const {updateFNBNUCVIV, itemFNBNUCVIV} = useFNBNUCVIV();
  const {saveAnswer, getAnswerquestion} = useFNBNUCVIV_FVCCONVIV();
  const navigation = useNavigation();
  const {register, handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      FuentedeAgua: [],
      AlmacenamientoAguaconsumo: [],
      Tratamientoagua: [],
      Estadodelrecipiente: undefined,
      ResiduosGeneranenVivienda: parseInt(props.FNBNUCVIV.RESIDUO_BOR, 10),
      ManejoderesiduosBiodegradables: undefined,
      ManejoresiduosOrdinariosnoreciclables: undefined,
      ManejoresiduosReciclables: undefined,
      Manejoresiduospeligrosos: undefined,
      Eliminacionexcretas: undefined,
      ConvivenciaAnimalesCasa: undefined,
      DisposicionfinalAguasdomesticas: undefined,
      PresenciadevectoresCasa: [],
      TipodeRiesgodelavivienda: [],
      Tipodeespacioproductivo: undefined,
      Destinodelosproductos: [],
      PracticasCulturalesProductivo: [],
      ActividadesProductivasVivienda: [],
      FamiliaPracticasCulturales: [],
      RiesgoVivienda: false,
      NumeroAnimales: 0,
      NumeroAnimalesnoVacunados: 0,
      Observaciones: '',
    },
  });
  useEffect(() => {
    fetchQuestions();
  }, [register]);
  useEffect(() => {
    if (itemFNBNUCVIV) {
      props.setFNBNUCVIV(itemFNBNUCVIV);
    }
  }, [itemFNBNUCVIV]);
  useEffect(() => {
    getAnswersFNBNUCVIV();
  }, [listFVCCONVIV]);
  useEffect(() => {
    getAnswersFNBNUCVIV();
  }, [questionsItems]);
  async function fetchQuestions() {
    getQuestionsOptions(questions);
  }
  async function getAnswersFNBNUCVIV() {
    const {
      RESIDUO_BOR,
      RIESGO,
      OBSERVACION,
      ANIMAL_NOVACUNADO,
      ANIMAL_VACUNADO,
    } = props.FNBNUCVIV;
    if (ANIMAL_VACUNADO !== null && ANIMAL_VACUNADO !== 'null') {
      setValue('NumeroAnimales', parseInt(ANIMAL_VACUNADO, 10));
      setNumeroAnimales('' + ANIMAL_VACUNADO);
    }
    if (ANIMAL_NOVACUNADO !== null && ANIMAL_NOVACUNADO !== 'null') {
      setValue('NumeroAnimalesnoVacunados', parseInt(ANIMAL_VACUNADO, 10));
      setNumeroAnimalesnoVacunados('' + ANIMAL_NOVACUNADO);
    }
    if (RESIDUO_BOR !== null && RESIDUO_BOR !== 'null') {
      setresiduoBor(parseInt(RESIDUO_BOR, 10));
      setValue('ResiduosGeneranenVivienda', parseInt(RESIDUO_BOR, 10));
    }
    setValue('Observaciones', OBSERVACION);
    setObservacion(OBSERVACION);
    setValue('RiesgoVivienda', Boolean(RIESGO));
    setRiesgo(Boolean(RIESGO));
  }
  function onSubmit(data: any) {
    let _FNBNUCVIV: FNBNUCVIV = props.FNBNUCVIV;
    _FNBNUCVIV.OBSERVACION = data.Observaciones;
    _FNBNUCVIV.ANIMAL_NOVACUNADO = data.NumeroAnimalesnoVacunados;
    _FNBNUCVIV.ANIMAL_VACUNADO = data.NumeroAnimales;
    _FNBNUCVIV.RESIDUO_BOR = data.ResiduosGeneranenVivienda;
    _FNBNUCVIV.RIESGO = data.RiesgoVivienda;
    updateFNBNUCVIV(_FNBNUCVIV);
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
      if (ans) {
        if (type == 1) {
          setValue(prop, '' + ans);
        } else {
          setValue(prop, ans);
        }
      }
    }
  }
  return (
    <KeyboardAwareScrollView>
      {!loadingFVCCONVIV ? (
        <View style={styles.container}>
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(QuestionFamilyCodes.FuentedeAgua)}
                error={errors.FuentedeAgua}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(QuestionFamilyCodes.FuentedeAgua, values, 2);
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.FuentedeAgua,
                    'FuentedeAgua',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.FuentedeAgua,
                )}
              />
            )}
            name="FuentedeAgua"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(QuestionFamilyCodes.Tratamientoagua)}
                error={errors.Tratamientoagua}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(QuestionFamilyCodes.Tratamientoagua, values, 2);
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.Tratamientoagua,
                    'Tratamientoagua',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.Tratamientoagua,
                )}
              />
            )}
            name="Tratamientoagua"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(QuestionFamilyCodes.AlmacenamientoAguaconsumo)}
                error={errors.AlmacenamientoAguaconsumo}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(
                    QuestionFamilyCodes.AlmacenamientoAguaconsumo,
                    values,
                    2,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.AlmacenamientoAguaconsumo,
                    'AlmacenamientoAguaconsumo',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.AlmacenamientoAguaconsumo,
                )}
              />
            )}
            name="AlmacenamientoAguaconsumo"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Estado del recipiente"
                error={errors.Estadodelrecipiente}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(QuestionFamilyCodes.Estadodelrecipiente, vlue);
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.Estadodelrecipiente,
                    'Estadodelrecipiente',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.Estadodelrecipiente,
                )}
              />
            )}
            name="Estadodelrecipiente"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BRadioButton
                label="Residuos que se generan en la vivienda"
                value={residuoBor}
                items={ResiduosViviendaOption}
                error={errors.ResiduosGeneranenVivienda}
                onChange={(value: any) => {
                  onChange(value);
                  setresiduoBor(value);
                }}
              />
            )}
            name="ResiduosGeneranenVivienda"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Manejo de residuos Biodegradables"
                error={errors.ManejoderesiduosBiodegradables}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(
                    QuestionFamilyCodes.ManejoderesiduosBiodegradables,
                    vlue,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.ManejoderesiduosBiodegradables,
                    'ManejoderesiduosBiodegradables',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.ManejoderesiduosBiodegradables,
                )}
              />
            )}
            name="ManejoderesiduosBiodegradables"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Manejo residuos Ordinarios no reciclables"
                error={errors.ManejoresiduosOrdinariosnoreciclables}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(
                    QuestionFamilyCodes.ManejoresiduosOrdinariosnoreciclables,
                    vlue,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.ManejoresiduosOrdinariosnoreciclables,
                    'ManejoresiduosOrdinariosnoreciclables',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.ManejoresiduosOrdinariosnoreciclables,
                )}
              />
            )}
            name="ManejoresiduosOrdinariosnoreciclables"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Manejo residuos Reciclables"
                error={errors.ManejoresiduosReciclables}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(
                    QuestionFamilyCodes.ManejoresiduosReciclables,
                    vlue,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.ManejoresiduosReciclables,
                    'ManejoresiduosReciclables',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.ManejoresiduosReciclables,
                )}
              />
            )}
            name="ManejoresiduosReciclables"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Manejo residuos peligrosos"
                error={errors.Manejoresiduospeligrosos}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(
                    QuestionFamilyCodes.Manejoresiduospeligrosos,
                    vlue,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.Manejoresiduospeligrosos,
                    'Manejoresiduospeligrosos',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.Manejoresiduospeligrosos,
                )}
              />
            )}
            name="Manejoresiduospeligrosos"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Eliminación excretas"
                error={errors.Eliminacionexcretas}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(QuestionFamilyCodes.Eliminacionexcretas, vlue);
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.Eliminacionexcretas,
                    'Eliminacionexcretas',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.Eliminacionexcretas,
                )}
              />
            )}
            name="Eliminacionexcretas"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Disposición final Aguas residuales domesticas"
                error={errors.DisposicionfinalAguasdomesticas}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(
                    QuestionFamilyCodes.DisposicionfinalAguasdomesticas,
                    vlue,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.DisposicionfinalAguasdomesticas,
                    'DisposicionfinalAguasdomesticas',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.DisposicionfinalAguasdomesticas,
                )}
              />
            )}
            name="DisposicionfinalAguasdomesticas"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Convivencia con animales adentro de la casa"
                error={errors.ConvivenciaAnimalesCasa}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(
                    QuestionFamilyCodes.ConvivenciaAnimalesCasa,
                    vlue,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.ConvivenciaAnimalesCasa,
                    'ConvivenciaAnimalesCasa',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.ConvivenciaAnimalesCasa,
                )}
              />
            )}
            name="ConvivenciaAnimalesCasa"
          />
          <Controller
            control={control}
            render={({onChange}) => (
              <BNumberInput
                label="Número de animales vacunados"
                error={errors.NumeroAnimales}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  setNumeroAnimales('' + vlue);
                  if (vlue) {
                  }
                }}
                value={numeroAnimales}
              />
            )}
            name="NumeroAnimales"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BNumberInput
                label="Número de animales no vacunados"
                error={errors.NumeroAnimalesnoVacunados}
                onChange={(vlue: any) => {
                  setNumeroAnimalesnoVacunados(vlue);
                  onChange(vlue);
                }}
                value={numeroAnimalesnoVacunados}
              />
            )}
            name="NumeroAnimalesnoVacunados"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(QuestionFamilyCodes.TipodeRiesgodelavivienda)}
                error={errors.TipodeRiesgodelavivienda}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(
                    QuestionFamilyCodes.TipodeRiesgodelavivienda,
                    values,
                    2,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.TipodeRiesgodelavivienda,
                    'TipodeRiesgodelavivienda',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.TipodeRiesgodelavivienda,
                )}
              />
            )}
            name="TipodeRiesgodelavivienda"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BRadioButton
                label="Riesgo de la vivienda"
                value={riesgo}
                items={logicOption}
                error={errors.RiesgoVivienda}
                onChange={(value: any) => {
                  onChange(Boolean(value));
                  setRiesgo(value);
                }}
              />
            )}
            name="RiesgoVivienda"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(QuestionFamilyCodes.PresenciadevectoresCasa)}
                error={errors.PresenciadevectoresCasa}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(
                    QuestionFamilyCodes.PresenciadevectoresCasa,
                    values,
                    2,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.PresenciadevectoresCasa,
                    'PresenciadevectoresCasa',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.PresenciadevectoresCasa,
                )}
              />
            )}
            name="PresenciadevectoresCasa"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Tipo de espacio productivo"
                error={errors.Tipodeespacioproductivo}
                onChange={(vlue: any) => {
                  onChange(vlue);
                  SaveAnswers(
                    QuestionFamilyCodes.Tipodeespacioproductivo,
                    vlue,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.Tipodeespacioproductivo,
                    'Tipodeespacioproductivo',
                  );
                }}
                selectedValue={value}
                items={getFVCCONVIVpicker(
                  QuestionFamilyCodes.Tipodeespacioproductivo,
                )}
              />
            )}
            name="Tipodeespacioproductivo"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(QuestionFamilyCodes.Destinodelosproductos)}
                error={errors.Destinodelosproductos}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(
                    QuestionFamilyCodes.Destinodelosproductos,
                    values,
                    2,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.Destinodelosproductos,
                    'Destinodelosproductos',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.Destinodelosproductos,
                )}
              />
            )}
            name="Destinodelosproductos"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(
                  QuestionFamilyCodes.PracticasCulturalesProductivo,
                )}
                error={errors.PracticasCulturalesProductivo}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(
                    QuestionFamilyCodes.PracticasCulturalesProductivo,
                    values,
                    2,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.PracticasCulturalesProductivo,
                    'PracticasCulturalesProductivo',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.PracticasCulturalesProductivo,
                )}
              />
            )}
            name="PracticasCulturalesProductivo"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(
                  QuestionFamilyCodes.ActividadesProductivasVivienda,
                )}
                error={errors.ActividadesProductivasVivienda}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(
                    QuestionFamilyCodes.ActividadesProductivasVivienda,
                    values,
                    2,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.ActividadesProductivasVivienda,
                    'ActividadesProductivasVivienda',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.ActividadesProductivasVivienda,
                )}
              />
            )}
            name="ActividadesProductivasVivienda"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BMultiSelect
                label={getLabel(QuestionFamilyCodes.FamiliaPracticasCulturales)}
                error={errors.FamiliaPracticasCulturales}
                onChange={(values: any) => {
                  onChange(values);
                  SaveAnswers(
                    QuestionFamilyCodes.FamiliaPracticasCulturales,
                    values,
                    2,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionFamilyCodes.FamiliaPracticasCulturales,
                    'FamiliaPracticasCulturales',
                    2,
                  );
                }}
                selectedItems={value}
                items={getFVCCONVIVMultiselect(
                  QuestionFamilyCodes.FamiliaPracticasCulturales,
                )}
              />
            )}
            name="FamiliaPracticasCulturales"
          />
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BTextInput
                label="Observaciones"
                multiline={true}
                numberOfLines={3}
                error={errors.Observaciones}
                onChange={(value: any) => {
                  setObservacion(value);
                  onChange(value);
                }}
                value={observacion}
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
      ) : (
        <Text>Cragando...</Text>
      )}
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
  setFNBNUCVIV,
};
const mapStateToProps = (store: any) => {
  return {
    FNBNUCVIV: store.housing.FNBNUCVIV,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HouseConditionForm);
