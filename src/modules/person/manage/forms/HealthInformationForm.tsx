/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BDatePickerModal,
  BMultiSelect,
  BPicker,
  BRadioButton,
  BTextInput,
  ButtonAction,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import {
  logicOption,
  timeOption,
  QuestionSexAndRepHealthPersonCodes,
  QuestionTypes,
  QuestionPersonCodes,
} from '../../../../core/utils/PersonTypes';
import {setFNCSALREP} from '../../../../state/SexAndRepHealthPerson/actions';
import {setFNBINFSAL} from '../../../../state/person/actions';
import {theme} from '../../../../core/style/theme';
import BNumberInput from '../../../../core/components/BNumberInput';
import {useFNCCONSAL} from '../../../../hooks/useFNCCONSAL';
import {FNBINFSAL, FNCCONSAL} from '../../../../types';
import {
  useFNBINFSAL,
  useFNBINFSAL_FNCCONSAL,
  useSGCSISPAR,
} from '../../../../hooks';
import {FNCPERSON} from '../../../../state/person/types';
import moment from 'moment';
import {PersonParametersConst, SystemParameterEnum} from '../../../../core/utils/SystemParameters';

const questionscodes = [
  QuestionPersonCodes.FactoresRiesgo,
  QuestionPersonCodes.EstadoNutricional,
  QuestionPersonCodes.SaludVisual,
  QuestionPersonCodes.SaludAuditivaYComunicativa,
  QuestionPersonCodes.SaludBucal,
  QuestionPersonCodes.RiesgoPadecerDiabetes,
  QuestionPersonCodes.SintomaticoRespiratorio,
  QuestionPersonCodes.SintomaticoDeMalaria,
  QuestionPersonCodes.DesparasitacionExterna,
  QuestionPersonCodes.DesparasitacionInterna,
];

const schemaForm = yup.object().shape({
  //FechaUltimaVisita: yup.date().max(new Date()).required(),
  PESO: yup.number().required(),
  TALLA: yup.number().required(),
  IMC: yup.number().required(),
  FactoresDeRiesgo: yup.string().optional(),
  TensionArterialSistolica: yup.number(),
  TensionArterialDiastólica: yup.number(),
  InterpretacionTensionArterial: yup.number().required(),
  SaludVisual: yup.number().required(),
  SaludAuditivaComunicativa: yup.number().required(),
  SaludBucal: yup.array().required(),
  UtilizaProtesis: yup.boolean().required(),
  TiempoProtesis: yup.boolean().optional(),
  RiesgoPadecerDiabetes: yup.number().required(),
  SintomaticoRespiratorio: yup.number().required(),
  SintomaticoMalaria: yup.number().required(),
  DesparasitacionInternaUltimoSemestre: yup.array().required(),
  DesparasitacionExternaUltimoSemestre: yup.number().required(),
  FechaUltimaVisita: yup.date().required(),
});

const _HealthInformationForm = (props: any) => {
  const [peso, setPeso] = useState<number>();
  const [altura, setAltura] = useState<number>();
  const [imc, setImc] = useState<number>();
  const [enableProtesis, setEnableProtesis] = useState<boolean>(false);
  const [enableTension, setenableTension] = useState<boolean>(false);
  const [enableDiabetes, setenableDiabetes] = useState<boolean>(false);
  const [enableSaludVisual, setenableSaludVisual] = useState<boolean>(false);
  const [enableDesparacitacion, setenableDesparacitacion] = useState<boolean>(false);
  const {
    getQuestionsOptions,
    getMultiselect,
    getPicker,
    listFNCCONSAL,
  } = useFNCCONSAL();
  const {saveAnswer, getAnswerquestion} = useFNBINFSAL_FNCCONSAL();
  const {itemFNBINFSAL, updateFNBINFSAL, loadingFNBINFSAL} = useFNBINFSAL();
  const {getByCode} = useSGCSISPAR();
  const navigation = useNavigation();

  const {handleSubmit, control, errors, setValue, setError, register} = useForm(
    {
      resolver: yupResolver(schemaForm),
    },
  );

  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (listFNCCONSAL) {
      fetchQuestions();
    }
  }, [listFNCCONSAL]);
  useEffect(() => {
    if (itemFNBINFSAL) {
    }
  }, [itemFNBINFSAL]);
  useEffect(() => {
    if (peso && altura) {
      calculateIMC(peso, altura);
    }
  }, [peso, altura]);
  async function fetchQuestions() {
    // getAnswersFNCSALREP();
    const {
      PESO,
      TALLA,
      TA_DIASTOLICA,
      TA_SISTOLICA,
      USO_PROTESIS,
      ULTIMA_VISITA,
      TIEMPO_PROTESIS,
    } = props.FNBINFSAL as FNBINFSAL;
    const {FECHA_NACIMIENTO} = props.FNCPERSON as FNCPERSON;
    if (PESO == null || PESO == 'null') {
    } else {
      setValue('PESO', '' + PESO);
      setPeso(PESO);
    }
    if (TALLA == null || TALLA == 'null') {
    } else {
      setValue('TALLA', '' + TALLA);
      setAltura(TALLA);
    }
    if (FECHA_NACIMIENTO) {
      let birthDate = moment(FECHA_NACIMIENTO).toDate();
      var years = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years');
      var days = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'days');
      let edadMinima = await getByCode(SystemParameterEnum.PRM016);
      let edadSaludVisual = await getByCode(SystemParameterEnum.PRM014);
      let mayorDeEdad = await getByCode(SystemParameterEnum.PRM009);
      let edad10 = await getByCode(SystemParameterEnum.PRM017);
      if (days <= Number(edadMinima.VALOR)) {
        setenableTension(false);
      } else {
        setenableTension(true);
      }
      if (days <= Number(edadSaludVisual.VALOR)) {
        setenableSaludVisual(false);
        for (let i = 0; i < listFNCCONSAL.length; i++) {
          const element = listFNCCONSAL[i];
          if (
            element.QUESTIONCODE == QuestionPersonCodes.SaludVisual &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('SaludVisual', '' + element.ID);
          }
        }
      } else {
        setenableSaludVisual(true);
      }
      if (years < Number(mayorDeEdad.VALOR)) {
        setenableDiabetes(false);
        for (let i = 0; i < listFNCCONSAL.length; i++) {
          const element = listFNCCONSAL[i];
          if (
            element.QUESTIONCODE == QuestionPersonCodes.RiesgoPadecerDiabetes &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('RiesgoPadecerDiabetes', '' + element.ID);
          }
        }
      } else {
        setenableDiabetes(true);
        getAnswers(
          QuestionPersonCodes.RiesgoPadecerDiabetes,
          'RiesgoPadecerDiabetes',
        );
      }
      console.error(days, edad10.VALOR);
      if (days < Number(edad10.VALOR)) {
        setenableDesparacitacion(false);
        for (let i = 0; i < listFNCCONSAL.length; i++) {
          const element = listFNCCONSAL[i];
          if (
            element.QUESTIONCODE ==
            QuestionPersonCodes.DesparasitacionInterna &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('DesparasitacionInternaUltimoSemestre', [element.ID]);
          }
        }
      } else {
        setenableDesparacitacion(true);
        getAnswers(
          QuestionPersonCodes.DesparasitacionInterna,
          'DesparasitacionInternaUltimoSemestre',
          2,
        );
      }
    }
    if (TA_SISTOLICA == null || TA_SISTOLICA == 'null') {
    } else {
      setValue('TensionArterialSistolica', '' + TA_SISTOLICA);
    }
    if (TA_DIASTOLICA == null || TA_DIASTOLICA == 'null') {
    } else {
      setValue('TensionArterialDiastólica', '' + TA_DIASTOLICA);
    }
    setValue('UtilizaProtesis', Boolean(USO_PROTESIS));
    if (USO_PROTESIS) {
      setEnableProtesis(true);
      setValue('TiempoProtesis', Boolean(TIEMPO_PROTESIS));
    }
    setValue('FechaUltimaVisita', ULTIMA_VISITA);
    getAnswers(QuestionPersonCodes.FactoresRiesgo, 'FactoresDeRiesgo');
    getAnswers(QuestionPersonCodes.SaludVisual, 'SaludVisual');
    getAnswers(
      QuestionPersonCodes.SaludAuditivaYComunicativa,
      'SaludAuditivaComunicativa',
    );
    getAnswers(QuestionPersonCodes.SaludBucal, 'SaludBucal', 2);
    getAnswers(
      QuestionPersonCodes.SintomaticoRespiratorio,
      'SintomaticoRespiratorio',
    );
    getAnswers(QuestionPersonCodes.SintomaticoDeMalaria, 'SintomaticoMalaria');
    getAnswers(
      QuestionPersonCodes.DesparasitacionExterna,
      'DesparasitacionExternaUltimoSemestre',
    );
  }
  async function calculateIMC(_peso: any, _altura: any) {
    if (_peso && _altura) {
      let alturaMT = _altura / 100;
      let imc = _peso / (alturaMT * alturaMT);
      setValue('IMC', '' + imc.toFixed(1));
      setImc(imc);
    } else {
      setValue('IMC', '');
      setImc(undefined);
    }
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNBINFSAL;
      let ans = await getAnswerquestion(ID, question.FNCELESAL_ID, type);
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
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
    personid = 0,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNBINFSAL.ID;
      if (personid > 0) {
        ID = personid;
      }
      saveAnswer(type, answer, ID, question.FNCELESAL_ID);
    }
  }
  async function onSubmit(data: any) {
    if (enableTension) {
      if (
        !data.TensionArterialSistolica ||
        data.TensionArterialSistolica == null ||
        data.TensionArterialSistolica == 'null'
      ) {
        setError('TensionArterialSistolica', {
          type: 'required',
        });
        return;
      }
      if (
        !data.TensionArterialDiastólica ||
        data.TensionArterialDiastólica == null ||
        data.TensionArterialDiastólica == 'null'
      ) {
        setError('TensionArterialDiastólica', {
          type: 'required',
        });
        return;
      }
    }
    let newItem: FNBINFSAL = props.FNBINFSAL;
    newItem.ESTADO = 0;
    newItem.PESO = data.PESO;
    newItem.TALLA = data.TALLA;
    newItem.USO_PROTESIS = data.UtilizaProtesis;
    newItem.TA_SISTOLICA = data.TensionArterialSistolica;
    newItem.TA_DIASTOLICA = data.TensionArterialDiastólica;
    newItem.ULTIMA_VISITA = data.FechaUltimaVisita;
    if (data.UtilizaProtesis) {
      newItem.TIEMPO_PROTESIS = data.TiempoProtesis;
    } else {
      newItem.TIEMPO_PROTESIS = null;
    }
    await updateFNBINFSAL(newItem);
    SaveAnswers(QuestionPersonCodes.FactoresRiesgo, data.FactoresDeRiesgo);
    SaveAnswers(QuestionPersonCodes.SaludVisual, data.SaludVisual);
    SaveAnswers(
      QuestionPersonCodes.SaludAuditivaYComunicativa,
      data.SaludAuditivaComunicativa,
    );
    SaveAnswers(QuestionPersonCodes.SaludBucal, data.SaludBucal, 2);
    SaveAnswers(
      QuestionPersonCodes.RiesgoPadecerDiabetes,
      data.RiesgoPadecerDiabetes,
    );
    SaveAnswers(
      QuestionPersonCodes.SintomaticoRespiratorio,
      data.SintomaticoRespiratorio,
    );
    SaveAnswers(
      QuestionPersonCodes.SintomaticoDeMalaria,
      data.SintomaticoMalaria,
    );
    SaveAnswers(
      QuestionPersonCodes.DesparasitacionInterna,
      data.DesparasitacionInternaUltimoSemestre,
      2,
    );
    SaveAnswers(
      QuestionPersonCodes.DesparasitacionExterna,
      data.DesparasitacionExternaUltimoSemestre,
    );
    navigation.goBack();
  }
  function ConTwoDecDigit(digit) {
    return digit.indexOf(".")>0?
            digit.split(".").length>=2?
             digit.split(".")[0]+"."+digit.split(".")[1].substring(-1,2)
            : digit
           : digit
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BNumberInput
              label={'Peso en Kilogramos'}
              onBlur={onBlur}
              onChange={(value: any) => {
                if (value) {
                  value = ConTwoDecDigit(value);
                }
                onChange(value);
                setPeso(value);
              }}
              error={errors.PESO}
              value={value}
            />
          )}
          name="PESO"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BNumberInput
              label={'Altura en centrimetros'}
              onBlur={onBlur}
              onChange={(value: any) => {
                if (value) {
                  value = ConTwoDecDigit(value);
                }
                onChange(value);
                setAltura(value);
              }}
              error={errors.TALLA}
              value={value}
            />
          )}
          name="TALLA"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BNumberInput
              label={'IMC'}
              onBlur={onBlur}
              disabled={true}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.IMC}
              value={value}
            />
          )}
          name="IMC"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Factores de riesgo'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.FactoresDeRiesgo}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.FactoresRiesgo)}
            />
          )}
          name="FactoresDeRiesgo"
        />
        {enableTension ? (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BNumberInput
                maxLength={3}
                label={'Tensión arterial sistólica'}
                onBlur={onBlur}
                onChange={(value: any) => {
                  onChange(value);
                }}
                error={errors.TensionArterialSistolica}
                value={value}
              />
            )}
            name="TensionArterialSistolica"
          />
        ) : null}
        {enableTension ? (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BNumberInput
                maxLength={3}
                label={'Tensión arterial diastólica'}
                onBlur={onBlur}
                onChange={(value: any) => {
                  onChange(value);
                }}
                error={errors.TensionArterialDiastólica}
                value={value}
              />
            )}
            name="TensionArterialDiastólica"
          />
        ) : null}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Interpretación tensión arterial'}
              enabled={false}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.InterpretacionTensionArterial}
              selectedValue={value}
              items={[{label: 'Normal', value: '0'}]}
            />
          )}
          name="InterpretacionTensionArterial"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              enabled={enableSaludVisual}
              label={'Salud visual'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.SaludVisual}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.SaludVisual)}
            />
          )}
          name="SaludVisual"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Salud auditiva y comunicativa'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.SaludAuditivaComunicativa}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.SaludAuditivaYComunicativa)}
            />
          )}
          name="SaludAuditivaComunicativa"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={'Salud bucal'}
              onBlur={onBlur}
              onChange={(values: any) => {
                onChange(values);
              }}
              error={errors.SaludBucal}
              selectedItems={value}
              items={getMultiselect(QuestionPersonCodes.SaludBucal)}
            />
          )}
          name="SaludBucal"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="¿Utiliza prótesis?"
              value={value}
              items={logicOption}
              error={errors.UtilizaProtesis}
              onChange={(value: any) => {
                onChange(value);
                value == 'true'
                  ? setEnableProtesis(true)
                  : setEnableProtesis(false);
              }}
            />
          )}
          name="UtilizaProtesis"
        />
        {enableProtesis ? (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BRadioButton
                label="Tiempo con la prótesis"
                value={value}
                items={timeOption}
                error={errors.TiempoProtesis}
                onChange={(value: any) => {
                  if (value) {
                    onChange(value);
                  }
                }}
              />
            )}
            name="TiempoProtesis"
          />
        ) : null}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              enabled={enableDiabetes}
              label={'Riesgo de padecer Diabetes'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.RiesgoPadecerDiabetes}
              items={getPicker(QuestionPersonCodes.RiesgoPadecerDiabetes)}
              selectedValue={value}
            />
          )}
          name="RiesgoPadecerDiabetes"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Sintomático respiratorio'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.SintomaticoRespiratorio}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.SintomaticoRespiratorio)}
            />
          )}
          name="SintomaticoRespiratorio"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Sintomático de malaria'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.SintomaticoMalaria}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.SintomaticoDeMalaria)}
            />
          )}
          name="SintomaticoMalaria"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              enabled={enableDesparacitacion}
              label={'Desparasitación interna último semestre'}
              onBlur={onBlur}
              onChange={(values: any) => {
                onChange(values);
              }}
              error={errors.DesparasitacionInternaUltimoSemestre}
              items={getMultiselect(QuestionPersonCodes.DesparasitacionInterna)}
              selectedItems={value}
            />
          )}
          name="DesparasitacionInternaUltimoSemestre"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Desparasitación externa último semestre'}
              onBlur={onBlur}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.DesparasitacionExternaUltimoSemestre}
              selectedValue={value}
              items={getPicker(QuestionPersonCodes.DesparasitacionExterna)}
            />
          )}
          name="DesparasitacionExternaUltimoSemestre"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BDatePickerModal
              label="Fecha última visita"
              maximumDate={new Date()}
              onChange={(value: any) => {
                onChange(value);
              }}
              error={errors.FechaUltimaVisita}
              value={value}
            />
          )}
          name="FechaUltimaVisita"
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
  aceptButon: {
    backgroundColor: 'white',
    color: 'white',
    width: '25%',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  cancelButon: {
    backgroundColor: theme.colors.primary,
    width: '25%',
    color: 'red',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: theme.colors.primary,
  },
});
const mapDispatchToProps = {
  setFNBINFSAL,
};
const mapStateToProps = (store: any) => {
  return {
    FNCSALREP: store.sarhealthperson.FNCSALREP,
    FNBINFSAL: store.person.FNBINFSAL,
    FNCPERSON: store.person.FNCPERSON,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HealthInformationForm);
