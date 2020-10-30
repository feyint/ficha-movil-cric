import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BMultiSelect, BPicker} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {ConditionPersonService} from '../../../../services';
import {getEntitySelect} from '../../../location/state/actions';
import {
  QuestionConditionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/ConditionPerson/actions';
import {saveFNCPERSONPropiety} from '../../../../state/person/actions';
import {ConditionPersonQuestion} from '../state/types';
import {SelectSchema} from '../../../../core/utils/types';
//import {saveFNCPERSON, updateFNCPERSON} from '../../../../state/person/actions';
import {
  FNCLUNINDSCHEMA,
  FNCPUEINDSCHEMA,
} from '../../../../providers/DataBaseProvider';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const questionscodes = [
  QuestionConditionPersonCodes.EstadoCivil,
  QuestionConditionPersonCodes.GrupoEtnico,
  QuestionConditionPersonCodes.Casta,
  QuestionConditionPersonCodes.LenguaMaterna,
  QuestionConditionPersonCodes.DominioLenguaMaterna,
  QuestionConditionPersonCodes.CapacidadDiversa,
  QuestionConditionPersonCodes.NivelEstudio,
  QuestionConditionPersonCodes.TipoTrabajo,
  QuestionConditionPersonCodes.PoblacionPensionada,
  QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
  QuestionConditionPersonCodes.Religion,
  QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
  QuestionConditionPersonCodes.SegundaLenguaMaterna,
  QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
];

const schemaForm = yup.object().shape({
  EstadoCivil: yup.number().required(),
  Casta: yup.number().notRequired(),
  LenguaMaterna: yup.number().required(),
  DominioLenguaMaterna: yup.number().notRequired(),
  SegundaLengua: yup.number().notRequired(),
  DominioSegundaLengua: yup.number().notRequired(),
  CapacidadDiversa: yup.array().notRequired(),
  NivelEstudio: yup.number().required(),
  TipoTrabajo: yup.number().optional(),
  PoblacionPensionada: yup.number().required(),
  OtrosSaberesAnsestrales: yup.array().required(),
  Religion: yup.number().required(),
  TipoDeCuidadosCulturalesQueRealiza: yup.array().required(),
  ocupacionPrincipal: yup.number().required(),
  organizacion: yup.number().required(),
  puebloIndigena: yup.number().optional(),
});

const _OtherIdentificationDataForm = (props: any) => {
  const syncCatalogService = new ConditionPersonService();

  const [questions, setQuestions] = useState<ConditionPersonQuestion[]>([]);
  const [state, setState] = useState({
    questionscodesMultiselect: [] as ConditionPersonQuestion[],
  });
  const [lenguaMaternaSelect, setlenguaMaternaSelect] = useState<
    {label: any; value: any}[]
  >([]);
  const [segundaLenguaSelect, setsegundaLenguaSelect] = useState<
    {label: any; value: any}[]
  >([]);
  const [segundaLenguaFiltered, setsegundaLenguaFiltered] = useState<
    {label: any; value: any}[]
  >([]);
  const [lenguaMaterna, setLenguaMaterna] = useState('');
  //const [castaPikerEnable, setCastaPikerEnable] = useState(false);
  const navigation = useNavigation();
  const [leng, setLeng] = useState('');

  //const [castaPikerEnable, setCastaPikerEnable] = useState(false);
  const [enableLenguaMaterna, setEnableLenguaMaterna] = useState(false);
  const [enableSegundaLengua, setEnableSegundaLengua] = useState(false);
  const [enableTipoTrabajo, setEnableTipoTrabajo] = useState(false);
  const [enableCasta, setEnableCasta] = useState(false);
  const [enablePueblo, setEnablePueblo] = useState(false);

  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });

  //TODO: JAL
  /* const [segundaLenguaMaterna, setsegundaLenguaMaterna] = useState<
    {label: any; value: any}[]
  >([]); */

  const [puebloIndigena, setPuebloIndigena] = useState('');
  const [puebloIndigenaSelect, setPuebloIndigenaSelect] = useState<
    {label: any; value: any}[]
  >([]);

  const [ocupacionPrincipal, setOcupacionPrincipal] = useState('');
  const [ocupacionPrincipales, setOcupacionPrincipales] = useState<
    {label: any; value: any}[]
  >([]);

  const [organizacion, setOrganizacion] = useState('');
  const [organizaciones, setOrganizaciones] = useState<
    {label: any; value: any}[]
  >([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    let resultMultiselect = await props.getQuestionWithOptions(questionscodes);
    if (resultMultiselect) {
      setState({
        ...state,
        questionscodesMultiselect: resultMultiselect,
      });
    }
    let result = await props.getQuestionWithOptions(questionscodes);
    let resultocupac = await syncCatalogService.getOcupacList();
    let resultorgani = await syncCatalogService.getOrganiList();
    let lenguas = syncCatalogService.getItemsForQuestionSelect(
      QuestionConditionPersonCodes.LenguaMaterna,
      result,
    );
    let segundalengua = syncCatalogService.getItemsForQuestionSelect(
      QuestionConditionPersonCodes.SegundaLenguaMaterna,
      result,
    );
    setQuestions(result);
    setlenguaMaternaSelect(lenguas.children);
    setsegundaLenguaSelect(segundalengua.children);
    setOcupacionPrincipales(resultocupac);
    setOrganizaciones(resultorgani);
    // /* if (prop == 'GrupoEtnico') {
    //   setEnablePueblo(question !== '99' || question !== null);
    // } */
    //------------------------------------------------------------------------
    /* let FNCPUEIND = await props.getEntitySelect(
      'FNCLUNIND',
      FNCLUNINDSCHEMA,
      'FNCPUEIND_ID',
      props.FNCPERSON.FNCLUNIND_ID,
    ); */
    let FNCPUEIND = await props.getEntitySelect(
      'FNCPUEIND',
      FNCPUEINDSCHEMA,
      'ID',
      props.FNCPERSON.FNCLUNIND_ID,
    );
    setPuebloIndigenaSelect(FNCPUEIND.children);
    setValue('puebloIndigena', '');
    setPuebloIndigena(null);
    //------------------------------------------------------------------------
    if (props.FNCPERSON.ID) {
      setValue('ocupacionPrincipal', props.FNCPERSON.FNCOCUPAC_ID);
      setOcupacionPrincipal(props.FNCPERSON.FNCOCUPAC_ID);
      setValue('organizacion', props.FNCPERSON.FNCORGANI_ID);
      setOrganizacion(props.FNCPERSON.FNCORGANI_ID);
    }
  }

  async function getAnswers(
    type: number,
    code: string,
    prop: string,
    //key: string,
  ) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
    if (prop == 'LenguaMaterna') {
      setEnableLenguaMaterna(question !== '167' || question !== null);
    }
    if (prop == 'SegundaLengua') {
      setEnableLenguaMaterna(question !== '302' || question !== null);
    }
    if (prop == 'puebloIndigena') {
      setEnableCasta(question === '23');
    }
  }
  async function getAnswersMultiselect(
    type: number,
    code: string,
    prop: string,
  ) {
    let questionscodesMultiselect = await props.getQuestionAnswer(type, code);
    setValue(prop, questionscodesMultiselect);
  }
  const onChangeLengua = (value: string) => {
    console.log(`se ejecuta el onchangelengua y value tiene${value}`);
    setLenguaMaterna(value);
    let item = lenguaMaternaSelect.find((i) => i.value === value);
    let segundalengua: any = [];
    segundaLenguaSelect.forEach((lengua) => {
      if (lengua.label != item.label) {
        segundalengua.push(lengua);
      }
    });
    setsegundaLenguaFiltered(segundalengua);
  };
  const validateLenguaMaterna = (value: string) => {
    //setEnableLenguaMaterna(value != '160' || value != null);
    if (value == '160' || value == null) {
      setEnableLenguaMaterna(false);
      setEnableSegundaLengua(false);
      props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.DominioLenguaMaterna,
        '167',
      );
      props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.SegundaLenguaMaterna,
        '295',
      );
      props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
        '302',
      );
    } else {
      setEnableLenguaMaterna(true);
    }
  };
  const validateSegundaLengua = (value: string) => {
    if (value == '295' || value == null) {
      setEnableSegundaLengua(false);
      props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
        '302',
      );
    } else {
      setEnableSegundaLengua(true);
    }
  };

  const validateGrupoEtnico = (value: string) => {
    if (value === '99' || value == null) {
      setEnablePueblo(false);
    } else {
      setEnablePueblo(true);
    }
  };

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, questions);
  };
  const getQuestionlabelMultiselect = (code: string) => {
    return syncCatalogService.getQuestionlabel(
      code,
      state.questionscodesMultiselect,
    );
  };
  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, questions);
  };
  const getItemsForQuestionMultiSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questionscodesMultiselect,
    );
  };

  function onSubmit(data: any) {
    navigation.goBack();
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller //Organizacion
          control={control}
          render={({onChange, onBlur}) => (
            <BPicker
              label="Organizacion"
              prompt="Selecione una opcion"
              onBlur={onBlur}
              error={errors.organizacion}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  onChange(value);
                  props.saveFNCPERSONPropiety('FNCORGANI_ID', value);
                  setOrganizacion(value);
                }
              }}
              selectedValue={organizacion}
              items={organizaciones}
              //value={value}
            />
          )}
          name="organizacion"
        />
        <Controller //Ocupacion principal
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Ocupacion Principal"
              prompt="Selecione una opcion"
              onBlur={onBlur}
              error={errors.ocupacionPrincipal}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  onChange(value);
                  props.saveFNCPERSONPropiety('FNCOCUPAC_ID', value);
                  setOcupacionPrincipal(value);
                  if (value == 485 || value == null) {
                    setEnableTipoTrabajo(true);
                  } else {
                    setEnableTipoTrabajo(false);
                    props.saveAnswerLocal(
                      QuestionTypes.selectOne,
                      QuestionConditionPersonCodes.TipoTrabajo,
                      '190',
                    );
                  }
                }
              }}
              selectedValue={ocupacionPrincipal}
              items={ocupacionPrincipales}
              //value={value}
            />
          )}
          name="ocupacionPrincipal"
        />
        {enablePueblo ? (
          <Controller //Pueblo indigena
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                label="Pueblo Indigena"
                prompt="Selecione una opcion"
                onBlur={onBlur}
                error={errors.puebloIndigena}
                onChange={(value: any) => {
                  if (value) {
                    console.log(`luna id ${props.FNCPERSON.FNCLUNIND_ID}`);
                    onChange(value);
                    setPuebloIndigena(value);
                  }
                }}
                selectedValue={puebloIndigena}
                items={puebloIndigenaSelect}
              />
            )}
            name="puebloIndigena"
          />
        ) : null}
        <Controller //Estado civil
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.EstadoCivil)}
              onBlur={onBlur}
              error={errors.EstadoCivil}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.EstadoCivil,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.EstadoCivil,
                  'EstadoCivil',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.EstadoCivil,
                ).children
              }
            />
          )}
          name="EstadoCivil"
        />
        {enableCasta ? (
          <Controller //Casta
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                label={getQuestionlabel(QuestionConditionPersonCodes.Casta)}
                onBlur={onBlur}
                error={errors.Casta}
                onChange={(value: any) => {
                  onChange(value);
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.Casta,
                    value,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.Casta,
                    'Casta',
                  );
                }}
                //value={value}
                selectedValue={value}
                items={
                  getItemsForQuestionSelect(QuestionConditionPersonCodes.Casta)
                    .children
                }
              />
            )}
            name="Casta"
          />
        ) : null}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.LenguaMaterna,
              )}
              onBlur={onBlur}
              error={errors.LenguaMaterna}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  onChangeLengua(value);
                  setLeng(value);
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.LenguaMaterna,
                    value,
                  );
                  validateLenguaMaterna(value);
                }
              }}
              onLoad={() => {
                onChangeLengua(value);
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LenguaMaterna,
                  'LenguaMaterna',
                );
              }}
              //value={value}
              selectedValue={value}
              items={lenguaMaternaSelect}
            />
          )}
          name="LenguaMaterna"
        />
        {enableLenguaMaterna ? (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                enabled={enableLenguaMaterna}
                label={getQuestionlabel(
                  QuestionConditionPersonCodes.DominioLenguaMaterna,
                )}
                onBlur={onBlur}
                error={errors.DominioLenguaMaterna}
                onChange={(value: any) => {
                  onChange(value);
                  if (value) {
                    props.saveAnswerLocal(
                      QuestionTypes.selectOne,
                      QuestionConditionPersonCodes.DominioLenguaMaterna,
                      value,
                    );
                  }
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.DominioLenguaMaterna,
                    'DominioLenguaMaterna',
                  );
                }}
                //value={value}
                selectedValue={value}
                items={
                  getItemsForQuestionSelect(
                    QuestionConditionPersonCodes.DominioLenguaMaterna,
                  ).children
                }
              />
            )}
            name="DominioLenguaMaterna"
          />
        ) : null}
        {enableLenguaMaterna ? (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                label="Segunda lengua"
                prompt="seleccione"
                onBlur={onBlur}
                error={errors.SegundaLengua}
                onChange={(value: any) => {
                  onChange(value);
                  if (value) {
                    props.saveAnswerLocal(
                      QuestionTypes.selectOne,
                      QuestionConditionPersonCodes.SegundaLenguaMaterna,
                      value,
                    );
                    validateSegundaLengua(value);
                  }

                  console.log(`valor en sleng es ${value}`);
                }}
                onLoad={async () => {
                  onChangeLengua(leng);
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.SegundaLenguaMaterna,
                    'SegundaLenguaMaterna',
                  );
                }}
                selectedValue={value}
                items={segundaLenguaFiltered}
              />
            )}
            name="SegundaLenguaMaterna"
          />
        ) : null}
        {enableSegundaLengua ? (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                label="Dominio segunda lengua"
                onBlur={onBlur}
                error={errors.DominioSegundaLengua}
                onChange={(value: any) => {
                  onChange(value);
                  if (value) {
                    props.saveAnswerLocal(
                      QuestionTypes.selectOne,
                      QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
                      value,
                    );
                  }
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
                    'DominioSegundaLenguaMaterna',
                  );
                }}
                //value={value}
                selectedValue={value}
                items={
                  getItemsForQuestionSelect(
                    QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
                  ).children
                }
              />
            )}
            name="DominioSegundaLenguaMaterna"
          />
        ) : null}
        <Controller //CapacidadDiversa
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabelMultiselect(
                QuestionConditionPersonCodes.CapacidadDiversa,
              )}
              onBlur={onBlur}
              error={errors.CapacidadDiversa}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.CapacidadDiversa,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswersMultiselect(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.CapacidadDiversa,
                  'CapacidadDiversa',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.CapacidadDiversa,
              )}
            />
          )}
          name="CapacidadDiversa"
        />
        <Controller //NivelEstudio
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.NivelEstudio,
              )}
              onBlur={onBlur}
              error={errors.NivelEstudio}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.NivelEstudio,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.NivelEstudio,
                  'NivelEstudio',
                );
              }}
              //value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.NivelEstudio,
                ).children
              }
            />
          )}
          name="NivelEstudio"
        />
        {enableTipoTrabajo ? (
          <Controller //TipoTrabajo
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                //enabled={enableTipoTrabajo}
                label={getQuestionlabel(
                  QuestionConditionPersonCodes.TipoTrabajo,
                )}
                onBlur={onBlur}
                error={errors.TipoTrabajo}
                onChange={(value: any) => {
                  onChange(value);
                  console.log('no aplica en tipo trabajo vale', value);
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.TipoTrabajo,
                    value,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.TipoTrabajo,
                    'TipoTrabajo',
                  );
                }}
                //value={value}
                selectedValue={value}
                items={
                  getItemsForQuestionSelect(
                    QuestionConditionPersonCodes.TipoTrabajo,
                  ).children
                }
              />
            )}
            name="TipoTrabajo"
          />
        ) : null}
        <Controller //PoblacionPensionada
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.PoblacionPensionada,
              )}
              onBlur={onBlur}
              error={errors.PoblacionPensionada}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.PoblacionPensionada,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.PoblacionPensionada,
                  'PoblacionPensionada',
                );
              }}
              //value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.PoblacionPensionada,
                ).children
              }
            />
          )}
          name="PoblacionPensionada"
        />
        <Controller //OtrosSaberesAnsestrales
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabelMultiselect(
                QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
              )}
              onBlur={onBlur}
              error={errors.OtrosSaberesAnsestrales}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswersMultiselect(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
                  'OtrosSaberesAnsestrales',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
              )}
            />
          )}
          name="OtrosSaberesAnsestrales"
        />
        <Controller //Religion
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.Religion)}
              onBlur={onBlur}
              error={errors.Religion}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.Religion,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.Religion,
                  'Religion',
                );
              }}
              //value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionConditionPersonCodes.Religion)
                  .children
              }
            />
          )}
          name="Religion"
        />
        <Controller //TipoDeCuidadosCulturalesQueRealiza
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabelMultiselect(
                QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
              )}
              onBlur={onBlur}
              error={errors.TipoDeCuidadosCulturalesQueRealiza}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswersMultiselect(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
                  'TipoDeCuidadosCulturalesQueRealiza',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
              )}
            />
          )}
          name="TipoDeCuidadosCulturalesQueRealiza"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit, (err) => {
              console.warn(err);
            })}
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
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  //updateFNCPERSON,
  //saveFNCPERSON,
  saveFNCPERSONPropiety,
  getEntitySelect,
};
const mapStateToProps = (person: any) => {
  return {
    FNCPERSON: person.person.FNCPERSON,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_OtherIdentificationDataForm);
