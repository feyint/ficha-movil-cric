/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BMultiSelect,
  BPicker,
  BRow,
  ButtonAction,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';
import {
  useFNCCONPER,
  useFNCOCUPAC,
  useFNCPERSON,
  useFNCPERSON_FNCCONPER,
  useFNCPUEIND,
} from '../../../../hooks';
import {useFNCORGANI} from '../../../../hooks/useFNCORGANI';
import {getSelectSchema} from '../../../../core/utils/utils';
import {FNCCONPER, FNCPERSON} from '../../../../types';
import {PersonParametersConst} from '../../../../core/utils/SystemParameters';

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
  const {
    listFNCCONPER,
    getLabel,
    getQuestionsOptions,
    getPicker,
    getMultiselect,
    getByID,
    getBycodes,
  } = useFNCCONPER();
  const {saveAnswer, getAnswerquestion} = useFNCPERSON_FNCCONPER();
  const {listFNCORGANI, getAllFNCORGANI} = useFNCORGANI();
  const {listFNCOCUPAC, getAllFNCOCUPAC, getOcupacionByID} = useFNCOCUPAC();
  const {listFNCPUEIND, getAllFNCPUEIND, getPuebloByID} = useFNCPUEIND();
  const {updateFNCPERSON} = useFNCPERSON();
  const navigation = useNavigation();
  const [leng, setLeng] = useState('');
  const [enableLenguaMaterna, setEnableLenguaMaterna] = useState(false);
  const [enableSegundaLengua, setEnableSegundaLengua] = useState(false);
  const [enableTipoTrabajo, setEnableTipoTrabajo] = useState(false);
  const [enableCasta, setEnableCasta] = useState(false);
  const [enablePueblo, setEnablePueblo] = useState(false);

  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [puebloIndigena, setPuebloIndigena] = useState('');
  const [ocupacionPrincipal, setOcupacionPrincipal] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (puebloIndigena) {
      let pueblo = getPuebloByID(parseInt(puebloIndigena, 10));
      if (pueblo && pueblo.CODIGO == PersonParametersConst.puebloWayuuCode) {
        setEnableCasta(true);
      } else {
        setEnableCasta(false);
      }
    } else {
      setEnableCasta(true);
    }
  }, [puebloIndigena]);
  useEffect(() => {
    if (listFNCCONPER) {
      fetchQuestions();
    }
  }, [listFNCCONPER]);
  useEffect(() => {
    if (ocupacionPrincipal) {
      let ocupacion = getOcupacionByID(parseInt(ocupacionPrincipal, 10));
      if (
        ocupacion &&
        ocupacion.CODIGO_FF !== PersonParametersConst.doesNotApplyCode
      ) {
        setEnableTipoTrabajo(true);
      } else if (
        ocupacion &&
        ocupacion.CODIGO_FF == PersonParametersConst.doesNotApplyCode
      ) {
        setEnableTipoTrabajo(false);
        setValue('TipoTrabajo', '');
      }
    }
  }, [ocupacionPrincipal, listFNCOCUPAC]);
  async function fetchQuestions() {
    getAllFNCORGANI();
    getAllFNCOCUPAC();
    await getAllFNCPUEIND();
    const {ID, FNCOCUPAC_ID, FNCORGANI_ID, FNCPUEIND_ID} = props.FNCPERSON;
    if (ID) {
      setValue('puebloIndigena', FNCPUEIND_ID);
      setPuebloIndigena('' + FNCPUEIND_ID);
      setValue('ocupacionPrincipal', FNCOCUPAC_ID);
      setOcupacionPrincipal('' + FNCOCUPAC_ID);
      setValue('organizacion', FNCORGANI_ID);
      setOrganizacion('' + FNCORGANI_ID);
    }
    let grupoanwer = await getAnswers(
      QuestionConditionPersonCodes.GrupoEtnico,
      'GrupoEtnico',
    );
    let grupoEtnico: FNCCONPER = getByID(grupoanwer);
    if (
      grupoEtnico &&
      grupoEtnico.CODIGO !== PersonParametersConst.doesNotApplyCode
    ) {
      setEnablePueblo(true);
    }
    getAnswers(QuestionConditionPersonCodes.EstadoCivil, 'EstadoCivil');
    getAnswers(QuestionConditionPersonCodes.Casta, 'Casta');
    getAnswers(
      QuestionConditionPersonCodes.CapacidadDiversa,
      'CapacidadDiversa',
      2,
    );
    getAnswers(QuestionConditionPersonCodes.NivelEstudio, 'NivelEstudio');
    getAnswers(QuestionConditionPersonCodes.TipoTrabajo, 'TipoTrabajo');
    getAnswers(
      QuestionConditionPersonCodes.PoblacionPensionada,
      'PoblacionPensionada',
    );
    getAnswers(
      QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
      'OtrosSaberesAnsestrales',
      2,
    );
    getAnswers(QuestionConditionPersonCodes.Religion, 'Religion');
    getAnswers(
      QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
      'TipoDeCuidadosCulturalesQueRealiza',
      2,
    );
    let lengua = await getAnswers(
      QuestionConditionPersonCodes.LenguaMaterna,
      'LenguaMaterna',
    );
    validateLenguaMaterna(lengua);
    getAnswers(
      QuestionConditionPersonCodes.DominioLenguaMaterna,
      'DominioLenguaMaterna',
    );
    getAnswers(
      QuestionConditionPersonCodes.SegundaLenguaMaterna,
      'SegundaLenguaMaterna',
    );
    getAnswers(
      QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
      'DominioSegundaLenguaMaterna',
    );
  }
  const validateLenguaMaterna = (value: string) => {
    let lengua: FNCCONPER = getByID(parseInt(value, 10));
    if (lengua && lengua.CODIGO !== PersonParametersConst.doesNotApplyCode) {
      setEnableLenguaMaterna(true);
    } else {
      setEnableLenguaMaterna(false);
      setEnableSegundaLengua(false);
      let NAdominio = getBycodes(
        QuestionConditionPersonCodes.DominioLenguaMaterna,
        PersonParametersConst.doesNotApplyCode,
      );
      let NASegundalengua = getBycodes(
        QuestionConditionPersonCodes.SegundaLenguaMaterna,
        PersonParametersConst.doesNotApplyCode,
      );
      let NADomSegundalengua = getBycodes(
        QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
        PersonParametersConst.doesNotApplyCode,
      );
      if (NAdominio) {
        SaveAnswers(
          QuestionConditionPersonCodes.DominioLenguaMaterna,
          NAdominio.ID,
        );
      }
      if (NASegundalengua) {
        SaveAnswers(
          QuestionConditionPersonCodes.SegundaLenguaMaterna,
          NASegundalengua.ID,
        );
      }
      if (NADomSegundalengua) {
        SaveAnswers(
          QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
          NADomSegundalengua.ID,
        );
      }
    }
  };
  const validateSegundaLengua = (value: any) => {
    let NASegundalengua = getBycodes(
      QuestionConditionPersonCodes.SegundaLenguaMaterna,
      PersonParametersConst.doesNotApplyCode,
    );
    if (NASegundalengua.ID == value) {
      setEnableSegundaLengua(false);
    } else {
      setEnableSegundaLengua(true);
    }
  };
  function onSubmit(data: any) {
    navigation.goBack();
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONPER.find((item: FNCCONPER) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNCPERSON;
      let ans = await getAnswerquestion(ID, question.FNCELEPER_ID, type);
      if (ans) {
        if (type == 1) {
          setValue(prop, '' + ans);
        } else {
          setValue(prop, ans);
        }
      }
      return ans;
    }
  }
  async function SaveAnswersFNCPERSON(prop: string, value: any) {
    let person: FNCPERSON = props.FNCPERSON;
    person[prop] = value;
    await updateFNCPERSON(person);
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
    personid = 0,
  ) {
    let question = listFNCCONPER.find((item: FNCCONPER) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNCPERSON.ID;
      if (personid > 0) {
        ID = personid;
      }
      saveAnswer(type, answer, ID, question.FNCELEPER_ID);
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller //Organizacion
          control={control}
          render={({onChange, onBlur}) => (
            <BPicker
              label="Organización"
              prompt="Selecione una opcion"
              onBlur={onBlur}
              error={errors.organizacion}
              onChange={(value: any) => {
                onChange(value);
                SaveAnswersFNCPERSON('FNCORGANI_ID', value);
                setOrganizacion(value);
              }}
              selectedValue={organizacion}
              items={getSelectSchema(listFNCORGANI)}
              //value={value}
            />
          )}
          name="organizacion"
        />
        <BRow>
          <Controller //Ocupacion principal
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                style={enableTipoTrabajo ? styles.input : {width: '100%'}}
                label="Ocupación Principal"
                prompt="Selecione una opcion"
                onBlur={onBlur}
                error={errors.ocupacionPrincipal}
                onChange={(value: any) => {
                  onChange(value);
                  if (value) {
                    onChange(value);
                    SaveAnswersFNCPERSON('FNCOCUPAC_ID', value);
                    setOcupacionPrincipal(value);
                  } else {
                    setOcupacionPrincipal('');
                    setEnableTipoTrabajo(false);
                    setValue('TipoTrabajo', '');
                  }
                }}
                selectedValue={ocupacionPrincipal}
                items={getSelectSchema(listFNCOCUPAC)}
                //value={value}
              />
            )}
            name="ocupacionPrincipal"
          />
          {enableTipoTrabajo ? (
            <Controller //TipoTrabajo
              control={control}
              render={({onChange, onBlur, value}) => (
                <BPicker
                  style={styles.input}
                  //enabled={enableTipoTrabajo}
                  label={getLabel(QuestionConditionPersonCodes.TipoTrabajo)}
                  onBlur={onBlur}
                  error={errors.TipoTrabajo}
                  onChange={(value: any) => {
                    onChange(value);
                    SaveAnswers(
                      QuestionConditionPersonCodes.TipoTrabajo,
                      value,
                    );
                  }}
                  //value={value}
                  selectedValue={value}
                  items={getPicker(QuestionConditionPersonCodes.TipoTrabajo)}
                />
              )}
              name="TipoTrabajo"
            />
          ) : null}
        </BRow>
        {enablePueblo ? (
          <Controller //Pueblo indigena
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                label="Pueblo"
                prompt="Selecione una opcion"
                onBlur={onBlur}
                error={errors.puebloIndigena}
                onChange={(value: any) => {
                  onChange(value);
                  setPuebloIndigena(value);
                  SaveAnswersFNCPERSON('FNCPUEIND_ID', value);
                }}
                selectedValue={puebloIndigena}
                items={getSelectSchema(listFNCPUEIND)}
              />
            )}
            name="puebloIndigena"
          />
        ) : null}
        <Controller //Estado civil
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getLabel(QuestionConditionPersonCodes.EstadoCivil)}
              onBlur={onBlur}
              error={errors.EstadoCivil}
              onChange={(value: any) => {
                onChange(value);
                SaveAnswers(QuestionConditionPersonCodes.EstadoCivil, value);
              }}
              selectedValue={value}
              items={getPicker(QuestionConditionPersonCodes.EstadoCivil)}
            />
          )}
          name="EstadoCivil"
        />
        {enableCasta ? (
          <Controller //Casta
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                label={getLabel(QuestionConditionPersonCodes.Casta)}
                onBlur={onBlur}
                error={errors.Casta}
                onChange={(value: any) => {
                  onChange(value);
                  SaveAnswers(QuestionConditionPersonCodes.Casta, value);
                }}
                //value={value}
                selectedValue={value}
                items={getPicker(QuestionConditionPersonCodes.Casta)}
              />
            )}
            name="Casta"
          />
        ) : null}
        <BRow>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BPicker
                style={styles.input}
                label={getLabel(QuestionConditionPersonCodes.LenguaMaterna)}
                onBlur={onBlur}
                error={errors.LenguaMaterna}
                onChange={(value: any) => {
                  onChange(value);
                  if (value) {
                    //onChangeLengua(value);
                    setLeng(value);
                    SaveAnswers(
                      QuestionConditionPersonCodes.LenguaMaterna,
                      value,
                    );
                    validateLenguaMaterna(value);
                  } else {
                    setEnableLenguaMaterna(false);
                    setValue('DominioLenguaMaterna', '');
                    setEnableSegundaLengua(false);
                    setValue('DominioSegundaLenguaMaterna', '');
                  }
                }}
                selectedValue={value}
                items={getPicker(QuestionConditionPersonCodes.LenguaMaterna)}
              />
            )}
            name="LenguaMaterna"
          />
          {enableLenguaMaterna ? (
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <BPicker
                  style={styles.input}
                  enabled={enableLenguaMaterna}
                  label={getLabel(
                    QuestionConditionPersonCodes.DominioLenguaMaterna,
                  )}
                  onBlur={onBlur}
                  error={errors.DominioLenguaMaterna}
                  onChange={(value: any) => {
                    onChange(value);
                    if (value) {
                      SaveAnswers(
                        QuestionConditionPersonCodes.DominioLenguaMaterna,
                        value,
                      );
                    }
                  }}
                  selectedValue={value}
                  items={getPicker(
                    QuestionConditionPersonCodes.DominioLenguaMaterna,
                  )}
                />
              )}
              name="DominioLenguaMaterna"
            />
          ) : null}
        </BRow>
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
                    SaveAnswers(
                      QuestionConditionPersonCodes.SegundaLenguaMaterna,
                      value,
                    );
                    validateSegundaLengua(value);
                  } else {
                    setEnableSegundaLengua(false);
                    setValue('DominioSegundaLenguaMaterna', '');
                  }
                }}
                selectedValue={value}
                items={getPicker(
                  QuestionConditionPersonCodes.SegundaLenguaMaterna,
                )}
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
                    SaveAnswers(
                      QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
                      value,
                    );
                  }
                }}
                //value={value}
                selectedValue={value}
                items={getPicker(
                  QuestionConditionPersonCodes.DominioSegundaLenguaMaterna,
                )}
              />
            )}
            name="DominioSegundaLenguaMaterna"
          />
        ) : null}
        <Controller //CapacidadDiversa
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(QuestionConditionPersonCodes.CapacidadDiversa)}
              onBlur={onBlur}
              error={errors.CapacidadDiversa}
              onChange={(values: any) => {
                onChange(values);
                SaveAnswers(
                  QuestionConditionPersonCodes.CapacidadDiversa,
                  values,
                  2,
                );
              }}
              selectedItems={value}
              items={getMultiselect(
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
              label={getLabel(QuestionConditionPersonCodes.NivelEstudio)}
              onBlur={onBlur}
              error={errors.NivelEstudio}
              onChange={(value: any) => {
                onChange(value);
                SaveAnswers(QuestionConditionPersonCodes.NivelEstudio, value);
              }}
              selectedValue={value}
              items={getPicker(QuestionConditionPersonCodes.NivelEstudio)}
            />
          )}
          name="NivelEstudio"
        />
        <Controller //PoblacionPensionada
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getLabel(QuestionConditionPersonCodes.PoblacionPensionada)}
              onBlur={onBlur}
              error={errors.PoblacionPensionada}
              onChange={(value: any) => {
                onChange(value);
                SaveAnswers(
                  QuestionConditionPersonCodes.PoblacionPensionada,
                  value,
                );
              }}
              //value={value}
              selectedValue={value}
              items={getPicker(
                QuestionConditionPersonCodes.PoblacionPensionada,
              )}
            />
          )}
          name="PoblacionPensionada"
        />
        <Controller //OtrosSaberesAnsestrales
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(
                QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
              )}
              onBlur={onBlur}
              error={errors.OtrosSaberesAnsestrales}
              onChange={(values: any) => {
                onChange(values);
                SaveAnswers(
                  QuestionConditionPersonCodes.OtrosSaberesAnsestrales,
                  values,
                  2,
                );
              }}
              selectedItems={value}
              items={getMultiselect(
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
              label={getLabel(QuestionConditionPersonCodes.Religion)}
              onBlur={onBlur}
              error={errors.Religion}
              onChange={(value: any) => {
                onChange(value);
                SaveAnswers(QuestionConditionPersonCodes.Religion, value);
              }}
              selectedValue={value}
              items={getPicker(QuestionConditionPersonCodes.Religion)}
            />
          )}
          name="Religion"
        />
        <Controller //TipoDeCuidadosCulturalesQueRealiza
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(
                QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
              )}
              onBlur={onBlur}
              error={errors.TipoDeCuidadosCulturalesQueRealiza}
              onChange={(values: any) => {
                onChange(values);
                SaveAnswers(
                  QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
                  values,
                  2,
                );
              }}
              selectedItems={value}
              items={getMultiselect(
                QuestionConditionPersonCodes.TipoDeCuidadosCulturalesQueRealiza,
              )}
            />
          )}
          name="TipoDeCuidadosCulturalesQueRealiza"
        />
        <ButtonAction
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 50,
  },
  input: {
    width: '50%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});
const mapDispatchToProps = {};
const mapStateToProps = (person: any) => {
  return {
    FNCPERSON: person.person.FNCPERSON,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_OtherIdentificationDataForm);
