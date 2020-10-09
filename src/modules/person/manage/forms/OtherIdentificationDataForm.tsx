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
import {saveFNCPERSON, updateFNCPERSON} from '../../../../state/person/actions';

const questions = [
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
  parentezcoGrupoFamiliar: yup.string().required(),
  EstadoCivil: yup.number().required(),
  GrupoEtnico: yup.number().required(),
  Casta: yup.array().notRequired(),
  LenguaMaterna: yup.number().required(),
  DominioLenguaMaterna: yup.number().notRequired(),
  SegundaLengua: yup.number().notRequired(),
  DominioSegundaLengua: yup.number().notRequired(),
  CapacidadDiversa: yup.array().notRequired(),
  NivelEstudio: yup.number().required(),
  TipoTrabajo: yup.number().required(),
  PoblacionPensionada: yup.number().required(),
  OtrosSaberesAnsestrales: yup.number().required(),
  Religion: yup.number().required(),
  TipoDeCuidadosCulturalesQueRealiza: yup.number().required(),
  ocupacionPrincipal: yup.number().required(),
  organizacion: yup.number().required(),
});

const _OtherIdentificationDataForm = (props: any) => {
  const syncCatalogService = new ConditionPersonService();

  const [state, setState] = useState({
    questions: [] as ConditionPersonQuestion[],
  });
  const [lengua, setLengua] = useState('');
  //const [castaPikerEnable, setCastaPikerEnable] = useState(false);
  const [enableLenguaMaterna, setEnableLenguaMaterna] = useState(false);
  const [enableSegundaLengua, setEnableSegundaLengua] = useState(false);
  const navigation = useNavigation();

  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

  const getItemsForQuestionSelectLanguaje = async () => {
    console.log(
      '***************************** segunda lengua *****************************',
    );
    let resulsegundaLengua = await getItemsForQuestionSelect(
      QuestionConditionPersonCodes.DominioLenguaMaterna,
    ).children;
    console.log('vamo a calmarno', resulsegundaLengua);
    setsegundaLenguaMaterna(resulsegundaLengua);
    //let resulsegundaLengua = await syncCatalogService.getOrganiList();    
  };

  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });

  const [parentezcoGrupoFamiliar, setParentezcoGrupoFamiliar] = useState('');
  const [parentezcoGrupoFamiliares, setParentezcoGrupoFamiliares] = useState<
    {label: any; value: any}[]
  >([]);

  //TODO: JAL
  const [segundaLenguaMaterna, setsegundaLenguaMaterna] = useState<
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

  /* const [
    parentezcoGrupoFamiliarSelect,
    setParentezcoGrupoFamiliarSelect,
  ] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  }); */

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    let result = await props.getQuestionWithOptions(questions);
    let resultparen = await syncCatalogService.getParentList();
    let resultocupac = await syncCatalogService.getOcupacList();
    let resultorgani = await syncCatalogService.getOrganiList();

    setParentezcoGrupoFamiliares(resultparen);
    setOcupacionPrincipales(resultocupac);
    setOrganizaciones(resultorgani);

    if (props.FNCPERSON.ID) {
      setValue('parentezcoGrupoFamiliar', props.FNCPERSON.FNCPAREN_ID);
      setParentezcoGrupoFamiliar(props.FNCPERSON.FNCPAREN_ID);
      setValue('ocupacionPrincipal', props.FNCPERSON.FNCOCUPAC_ID);
      setOcupacionPrincipal(props.FNCPERSON.FNCOCUPAC_ID);
      setValue('organizacion', props.FNCPERSON.FNCORGANI_ID);
      setOrganizacion(props.FNCPERSON.FNCORGANI_ID);
    }
    if (result) {
      setState({
        ...state,
        questions: result,
      });
      console.log(result);
      console.log(resulsegundaLengua);
    }
    //getAnswersFNCPERSON();
  }
  /* async function fillSecondLanguaje(key) {
    getAnswers(
      QuestionTypes.selectOne,
      QuestionConditionPersonCodes.SegundaLenguaMaterna,
      'SegundaLenguaMaterna',
      key,
    );
  } */
  async function getAnswersFNCPERSON() {
    if (props.FNCPERSON.FNCPAREN_ID && props.FNCPERSON.FNCPAREN_ID !== 'null') {
      setValue('parentezcoGrupoFamiliar', '' + props.FNCPERSON.FNCPAREN_ID);
      setParentezcoGrupoFamiliar('' + props.FNCPERSON.FNCPAREN_ID);
    }
    /* setValue('ResiduosGeneranenVivienda', props.FNBNUCVIV.RESIDUO_BOR);
    setValue('setNumeroAnimalesnoVacunados', props.FNBNUCVIV.RIESGO);
    setValue('Observaciones', props.FNBNUCVIV.OBSERVACION); */
    //setValue('parentezcoGrupoFamiliar', props.FNCPERSON.FNCPAREN_ID);
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
      setEnableLenguaMaterna(question !== '160' || question !== null);
    }
    if (prop == 'SegundaLengua') {
      setEnableLenguaMaterna(question !== '160' || question !== null);
    }
  }
  const validateLenguaMaterna = (value: string) => {
    //setEnableLenguaMaterna(value != '160' || value != null);
    if (value == '160' || value == null) {
      setEnableLenguaMaterna(false);
      props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.DominioLenguaMaterna,
        '160',
      );
    } else {
      setEnableLenguaMaterna(true);
    }
  };
  const validateSegundaLengua = (value: string) => {
    if (value == '160' || value == null) {
      setEnableSegundaLengua(false);
      props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
        '160',
      );
    } else {
      setEnableSegundaLengua(true);
    }
  };

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, state.questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    console.log('state.questions: ', state.questions);
    return syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questions,
    );
  };

  const onSubmit = async (data: any) => {
    let person: FNCPERSON = props.FNCPERSON;
    if (person.ID != null) {
      try {
        let inserted = await props.updateFNCPERSON({
          FNCPAREN_ID: JSON.parse(data.parentezcoGrupoFamiliar),
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      let item: any = {};
      item.FNCPAREN_ID = JSON.parse(data.parentezcoGrupoFamiliar);
      let inserted = await props.saveFNCPERSON(item);
    }
    navigation.goBack();
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
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
                  console.log(
                    `props.FNCPERSON.FNCPAREN_ID tiene ${props.FNCPERSON.FNCPAREN_ID}`,
                  );
                  console.log(
                    `props.FNCPERSON.FNCOCUPAC_ID tiene ${props.FNCPERSON.FNCOCUPAC_ID}`,
                  );
                  console.log(
                    `props.FNCPERSON.FNCORGANI_ID tiene ${props.FNCPERSON.FNCORGANI_ID}`,
                  );
                }
              }}
              selectedValue={organizacion}
              items={organizaciones}
              //value={value}
            />
          )}
          name="organizacion"
        />
        <Controller
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
                  console.log(
                    `props.FNCPERSON.FNCPAREN_ID tiene ${props.FNCPERSON.FNCPAREN_ID}`,
                  );
                  console.log(
                    `props.FNCPERSON.FNCOCUPAC_ID tiene ${props.FNCPERSON.FNCOCUPAC_ID}`,
                  );
                }
              }}
              selectedValue={ocupacionPrincipal}
              items={ocupacionPrincipales}
              //value={value}
            />
          )}
          name="ocupacionPrincipal"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Parentezco en el grupo familiar"
              prompt="Selecione una opcion"
              onBlur={onBlur}
              error={errors.parentezcoGrupoFamiliar}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  props.saveFNCPERSONPropiety('FNCPAREN_ID', value);
                  setParentezcoGrupoFamiliar(value);
                  console.log(
                    `props.FNCPERSON.FNCPAREN_ID tiene ${props.FNCPERSON.FNCPAREN_ID}`,
                  );
                  console.log(
                    `props.FNCPERSON.FNCOCUPAC_ID tiene ${props.FNCPERSON.FNCOCUPAC_ID}`,
                  );
                }
                /* onChange(value);
                props.saveFNCPERSONPropiety('FNCPAREN_ID', value);
                setParentezcoGrupoFamiliar(value);
                console.log(
                  `parentezcogrupofamiliar tiene ${parentezcoGrupoFamiliar}`,
                );
                console.log(`value tiene ${value}`); */
              }}
              selectedValue={parentezcoGrupoFamiliar}
              items={parentezcoGrupoFamiliares}
              //value={value}
            />
          )}
          name="parentezcoGrupoFamiliar"
        />
        <Controller
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
              //value={value}
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
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.GrupoEtnico)}
              onBlur={onBlur}
              error={errors.GrupoEtnico}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.GrupoEtnico,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.GrupoEtnico,
                  'GrupoEtnico',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.GrupoEtnico,
                ).children
              }
            />
          )}
          name="GrupoEtnico"
        />
        <Controller
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
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionConditionPersonCodes.Casta)
                  .children
              }
            />
          )}
          name="Casta"
        />
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
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LenguaMaterna,
                  value,
                );
                //fillSecondLanguaje(value);
                setLengua(value);
                console.log(`el valor de lengua materna es ${value} `);
                validateLenguaMaterna(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LenguaMaterna,
                  'LenguaMaterna',
                );
              }}
              //value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.LenguaMaterna,
                ).children
              }
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
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.DominioLenguaMaterna,
                    value,
                  );
                }}
                onLoad={() => {
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.DominioLenguaMaterna,
                    'DominioLenguaMaterna',
                    '',
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
                onBlur={onBlur}
                error={errors.SegundaLengua}
                onChange={(value: any) => {
                  onChange(value);
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.SegundaLenguaMaterna,
                    value,
                  );
                  //--------------------------
                  //------------------------------
                  console.log(`el valor de segunda lengua es ${value}`);
                  validateSegundaLengua(value);
                }}
                onLoad={ async () => {
                  await getItemsForQuestionSelectLanguaje();
                }}
                //value={value}
                selectedValue={value}
                items={segundaLenguaMaterna}
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
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
                    value,
                  );
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
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
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
                getAnswers(
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
        <Controller
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
              value={value}
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
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(QuestionConditionPersonCodes.TipoTrabajo)}
              onBlur={onBlur}
              error={errors.TipoTrabajo}
              onChange={(value: any) => {
                onChange(value);
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
              value={value}
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
        <Controller
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
              value={value}
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
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
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
                getAnswers(
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
        <Controller
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
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionConditionPersonCodes.Religion)
                  .children
              }
            />
          )}
          name="Religion"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
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
                getAnswers(
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
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  updateFNCPERSON,
  saveFNCPERSON,
  saveFNCPERSONPropiety,
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
