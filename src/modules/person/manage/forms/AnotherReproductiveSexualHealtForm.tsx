/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BMultiSelect, BPicker, ButtonAction} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  examOption,
  QuestionSexAndRepHealthPersonCodes,
  logicOption2,
} from '../../../../core/utils/PersonTypes';
import {theme} from '../../../../core/style/theme';
import {
  useFNCGENERO,
  useFNCSALREP,
  useFNCSALREP_FNCCONREP,
  useSGCSISPAR,
} from '../../../../hooks';
import {useFNCCONREP} from '../../../../hooks/useFNCCONREP';
import {FNCCONREP, FNCSALREP} from '../../../../types';
import {FNCPERSON} from '../../../../state/person/types';
import {
  PersonParametersConst,
  SystemParameterEnum,
} from '../../../../core/utils/SystemParameters';
import moment from 'moment';
const questionscodes = [
  QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
  QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
  QuestionSexAndRepHealthPersonCodes.SaludSexual,
  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
];
const schemaForm = yup.object().shape({
  MetodoDelPlaneacionFamiliar: yup.array().required(),
  CitologiaCervicoUterina: yup.number().optional(),
  AutoexamenDeMama: yup.number().optional(),
  SaludSexual: yup.number().required(),
  ExamenDeProstata: yup.number().optional(),
  RESUL_CITOLOGIA: yup.string().optional(),
  ACCION_CITOLOGIA: yup.number().optional(),
  RESUL_PROSTATA: yup.string().optional(),
  ACCION_PROSTATA: yup.number().optional(),
});
const _AnotherReproductiveSexualHealtForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue, getValues} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const {itemFNCGENERO, getbyID} = useFNCGENERO();
  const {itemFNCSALREP, updateFNCSALREP, loadingFNCSALREP} = useFNCSALREP();
  const {
    getQuestionsOptions,
    getMultiselect,
    getPicker,
    getLabel,
    listFNCCONREP,
  } = useFNCCONREP();
  const {getByCode} = useSGCSISPAR();
  const {saveAnswer, getAnswerquestion} = useFNCSALREP_FNCCONREP();
  const [resultPro, setresultPro] = useState<any>('');
  const [resultCito, setresultCito] = useState<any>('');
  const [resultCitoAcc, setresultCitoAcc] = useState<any>('');
  const [resultProacc, setresultProAcc] = useState<any>('');
  const [enableFGenre, setenableFGenre] = useState<boolean>(false);
  const [enableMGenre, setenableMGenre] = useState<boolean>(false);
  const [enableCito, setenableCito] = useState<boolean>(false);
  const [enableCitoResu, setenableCitoResu] = useState<boolean>(false);
  const [enablePros, setenablePros] = useState<boolean>(false);
  const [enableProsResu, setenableProsResu] = useState<boolean>(false);
  const [enableAutoEx, setenableAutoEx] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (listFNCCONREP) {
      fetchQuestions();
    }
  }, [listFNCCONREP]);
  async function fetchQuestions() {
    const {
      RESUL_CITOLOGIA,
      ACCION_CITOLOGIA,
      RESUL_PROSTATA,
      ACCION_PROSTATA,
    } = props.FNCSALREP as FNCSALREP;
    console.error(RESUL_PROSTATA);
    const {FNCGENERO_ID, FECHA_NACIMIENTO} = props.FNCPERSON as FNCPERSON;
    if (FNCGENERO_ID) {
      let genre = await getbyID(FNCGENERO_ID);
      if (genre.CODIGO == PersonParametersConst.onlyGenrecode) {
        setenableFGenre(true);
        if (FECHA_NACIMIENTO) {
          let edadMinima = await getByCode(SystemParameterEnum.PRM018);
          let birthDate = moment(FECHA_NACIMIENTO).toDate();
          var years = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years');
          var days = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'days');
          if (days < Number(edadMinima.VALOR)) {
            for (let i = 0; i < listFNCCONREP.length; i++) {
              const element = listFNCCONREP[i];
              if (
                element.QUESTIONCODE ==
                  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama &&
                element.NOMBRE.includes('No aplica')
              ) {
                setValue('AutoexamenDeMama', '' + element.ID);
                setenableAutoEx(false);
              }
              if (
                element.QUESTIONCODE ==
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata &&
                element.NOMBRE.includes('No aplica')
              ) {
                setValue('ExamenDeProstata', '' + element.ID);
                setenablePros(false);
              }
            }
          } else {
            setenableAutoEx(true);
            getAnswers(
              QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
              'AutoexamenDeMama',
            );
            setenableCito(true);
            setValue('RESUL_CITOLOGIA', RESUL_CITOLOGIA);
            setresultCito(RESUL_CITOLOGIA);
            setValue('ACCION_CITOLOGIA', '' + ACCION_CITOLOGIA);
            setresultCitoAcc('' + ACCION_CITOLOGIA);
          }
        }
        for (let i = 0; i < listFNCCONREP.length; i++) {
          const element = listFNCCONREP[i];
          if (
            element.QUESTIONCODE ==
              QuestionSexAndRepHealthPersonCodes.ExamenDeProstata &&
            element.NOMBRE.includes('No aplica')
          ) {
            setValue('ExamenDeProstata', '' + element.ID);
            setenablePros(false);
          }
        }
      } else if (genre.CODIGO == PersonParametersConst.maleCode) {
        setenableMGenre(true);
        if (FECHA_NACIMIENTO) {
          let edadMinima = await getByCode(SystemParameterEnum.PRM019);
          let birthDate = moment(FECHA_NACIMIENTO).toDate();
          var years = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years');
          var days = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'days');
          if (days < Number(edadMinima.VALOR)) {
            for (let i = 0; i < listFNCCONREP.length; i++) {
              const element = listFNCCONREP[i];
              if (
                element.QUESTIONCODE ==
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata &&
                element.NOMBRE.includes('No aplica')
              ) {
                setenableMGenre(false);
                setValue('ExamenDeProstata', '' + element.ID);
                setenablePros(false);
              }
            }
          } else {
            setenableMGenre(true);
            getAnswers(
              QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
              'ExamenDeProstata',
            );
            setenablePros(true);
            setValue('RESUL_PROSTATA', RESUL_PROSTATA);
            setresultPro(RESUL_PROSTATA);
            if (RESUL_PROSTATA == 'ANORMAL') {
              setenableProsResu(true);
              console.error(ACCION_PROSTATA);
              setValue('ACCION_PROSTATA', '' + ACCION_PROSTATA);
              setresultProAcc('' + ACCION_PROSTATA);
            }
          }
        }
      }
    }
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
      'MetodoDelPlaneacionFamiliar',
      2,
    );
    getAnswers(QuestionSexAndRepHealthPersonCodes.SaludSexual, 'SaludSexual');
    getAnswers(
      QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
      'CitologiaCervicoUterina',
    );
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONREP.find((item: FNCCONREP) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNCSALREP;
      let ans = await getAnswerquestion(ID, question.FNCELEREP_ID, type);
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
    let question = listFNCCONREP.find((item: FNCCONREP) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNCSALREP.ID;
      if (personid > 0) {
        ID = personid;
      }
      saveAnswer(type, answer, ID, question.FNCELEREP_ID);
    }
  }
  async function onSubmit(data: any) {
    let item: FNCSALREP = props.FNCSALREP;
    if (item.ID) {
      item.RESUL_CITOLOGIA = data.RESUL_CITOLOGIA;
      item.ACCION_CITOLOGIA = data.ACCION_CITOLOGIA;
      item.RESUL_PROSTATA = data.RESUL_PROSTATA;
      item.ACCION_PROSTATA = data.ACCION_PROSTATA;
      await updateFNCSALREP(item);
    }
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
      data.MetodoDelPlaneacionFamiliar,
      2,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.SaludSexual,
      data.SaludSexual,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
      data.ExamenDeProstata,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
      data.AutoexamenDeMama,
    );
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
      data.CitologiaCervicoUterina,
    );
    navigation.goBack();
  }
  async function validateCitolo() {
    if (loaded) {
      let Examen = getValues('CitologiaCervicoUterina');
      if (Examen) {
        setenableCito(true);
        for (let i = 0; i < listFNCCONREP.length; i++) {
          const element = listFNCCONREP[i];
          if (
            element.QUESTIONCODE ==
              QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina &&
            (element.NOMBRE.includes('No aplica') ||
              element.NOMBRE.includes('Nunca'))
          ) {
            if (element.ID == Examen) {
              setenableCito(false);
            }
          }
        }
        if (!enableCito) {
          setenableCitoResu(false);
          setValue('RESUL_CITOLOGIA', '');
          setValue('ACCION_CITOLOGIA', '');
        }
      }
    }
  }
  async function validateProsta() {
    if (loaded) {
      let Examen = getValues('ExamenDeProstata');
      if (Examen) {
        setenablePros(true);
        for (let i = 0; i < listFNCCONREP.length; i++) {
          const element = listFNCCONREP[i];
          if (
            element.QUESTIONCODE ==
              QuestionSexAndRepHealthPersonCodes.ExamenDeProstata &&
            (element.NOMBRE.includes('No aplica') ||
              element.NOMBRE.includes('Nunca'))
          ) {
            if (element.ID == Examen) {
              setenablePros(false);
              setenableProsResu(false);
            }
          }
        }
        if (!enablePros) {
          setenableProsResu(false);
          setValue('RESUL_PROSTATA', '');
          setresultPro('');
          setValue('ACCION_PROSTATA', '');
        }
      }
    }
  }
  async function validateProstataResu() {
    if (loaded) {
      let result = getValues('RESUL_PROSTATA');
      if (result) {
        setenableProsResu(true);
        if (result == 'ANORMAL') {
          setenablePros(true);
          setenableProsResu(true);
        } else {
          setresultProAcc('');
          setenableProsResu(false);
          setValue('ACCION_PROSTATA', '');
        }
      }
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BMultiSelect
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
              )}
              error={errors.MetodoDelPlaneacionFamiliar}
              onChange={(values: any) => {
                onChange(values);
              }}
              selectedItems={value}
              items={getMultiselect(
                QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
              )}
            />
          )}
          name="MetodoDelPlaneacionFamiliar"
        />
        {enableFGenre ? (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label={getLabel(
                  QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
                )}
                error={errors.CitologiaCervicoUterina}
                onChange={(value: any) => {
                  onChange(value);
                  validateCitolo();
                }}
                selectedValue={value}
                items={getPicker(
                  QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
                )}
              />
            )}
            name="CitologiaCervicoUterina"
          />
        ) : null}
        {enableCito ? (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label={'Resultado del examen'}
                error={errors.RESUL_CITOLOGIA}
                onChange={(value: any) => {
                  onChange(value);
                  setresultCito(value);
                  if (value) {
                    setenableCitoResu(true);
                  } else {
                    setenableCitoResu(false);
                    setValue('ACCION_CITOLOGIA', '');
                  }
                }}
                selectedValue={resultCito}
                items={examOption}
              />
            )}
            name="RESUL_CITOLOGIA"
          />
        ) : null}
        {enableCitoResu ? (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label={'¿Tomó acciones ante el resultado?'}
                error={errors.ACCION_CITOLOGIA}
                onChange={(value: any) => {
                  setresultCitoAcc(value);
                  onChange(value);
                }}
                selectedValue={resultCitoAcc}
                items={logicOption2}
              />
            )}
            name="ACCION_CITOLOGIA"
          />
        ) : null}
        {enableFGenre ? (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                enabled={enableAutoEx}
                label={getLabel(
                  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
                )}
                error={errors.AutoexamenDeMama}
                onChange={(value: any) => {
                  onChange(value);
                }}
                selectedValue={value}
                items={getPicker(
                  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
                )}
              />
            )}
            name="AutoexamenDeMama"
          />
        ) : null}
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={getLabel(QuestionSexAndRepHealthPersonCodes.SaludSexual)}
              error={errors.SaludSexual}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(QuestionSexAndRepHealthPersonCodes.SaludSexual)}
            />
          )}
          name="SaludSexual"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              enabled={enableMGenre}
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
              )}
              error={errors.ExamenDeProstata}
              onChange={(value: any) => {
                onChange(value);
                validateProsta();
              }}
              selectedValue={value}
              items={getPicker(
                QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
              )}
            />
          )}
          name="ExamenDeProstata"
        />
        {enablePros ? (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                enabled={true}
                label={'Resultado del examen'}
                error={errors.RESUL_PROSTATA}
                onChange={(value: any) => {
                  onChange(value);
                  setresultPro(value);
                  validateProstataResu();
                }}
                selectedValue={resultPro}
                items={examOption}
              />
            )}
            name="RESUL_PROSTATA"
          />
        ) : null}
        {enableProsResu ? (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                enabled={true}
                label={'¿Tomó acciones ante el resultado?'}
                error={errors.ACCION_PROSTATA}
                onChange={(value: any) => {
                  onChange(value);
                  setresultProAcc(value);
                }}
                selectedValue={resultProacc}
                items={logicOption2}
              />
            )}
            name="ACCION_PROSTATA"
          />
        ) : null}
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
    //left: 500,
    //position: 'relative',
    //marginTop: -60,
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
const mapStateToProps = (store: any) => {
  return {
    FNCSALREP: store.sarhealthperson.FNCSALREP,
    FNCPERSON: store.person.FNCPERSON,
  };
};
export default connect(
  mapStateToProps,
  null,
)(_AnotherReproductiveSexualHealtForm);
