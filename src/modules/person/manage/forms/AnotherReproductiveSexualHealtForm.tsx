import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BMultiSelect,
  BPicker,
  BRadioButton,
  ButtonAction,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import {
  logicOption,
  examOption,
  QuestionSexAndRepHealthPersonCodes,
} from '../../../../core/utils/PersonTypes';
import {theme} from '../../../../core/style/theme';
import {useFNCSALREP, useFNCSALREP_FNCCONREP} from '../../../../hooks';
import {useFNCCONREP} from '../../../../hooks/useFNCCONREP';
import {FNCCONREP} from '../../../../types';

const questionscodes = [
  QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
  QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
  QuestionSexAndRepHealthPersonCodes.SaludSexual,
  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
];

const schemaForm = yup.object().shape({
  MetodoDelPlaneacionFamiliar: yup.array().required(),
  //CitologiaCervicoUterina: yup.number().required(),
  //AutoexamenDeMama: yup.number().required(),
  SaludSexual: yup.number().required(),
  ExamenDeProstata: yup.number().required(),
  ResultadoDelExamen: yup.boolean().required(),
  TomoAccionesAnteResultado: yup.boolean().required(),
});

const _AnotherReproductiveSexualHealtForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const {itemFNCSALREP, updateFNCSALREP, loadingFNCSALREP} = useFNCSALREP();
  const {
    getQuestionsOptions,
    getMultiselect,
    getPicker,
    getLabel,
    listFNCCONREP,
  } = useFNCCONREP();
  const {saveAnswer, getAnswerquestion} = useFNCSALREP_FNCCONREP();
  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (listFNCCONREP) {
      fetchQuestions();
    }
  }, [listFNCCONREP]);
  async function fetchQuestions() {
    // getAnswersFNCSALREP();
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
    SaveAnswers(
      QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
      data.MetodoDelPlaneacionFamiliar,
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
          render={({onChange, onBlur, value}) => (
            <BPicker
              enabled={false}
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
              )}
              onBlur={onBlur}
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
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
              )}
              onBlur={onBlur}
              error={errors.CitologiaCervicoUterina}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(
                QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
              )}
            />
          )}
          name="CitologiaCervicoUterina"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getLabel(
                QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
              )}
              onBlur={onBlur}
              error={errors.ExamenDeProstata}
              onChange={(value: any) => {
                onChange(value);
              }}
              selectedValue={value}
              items={getPicker(
                QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
              )}
            />
          )}
          name="ExamenDeProstata"
        />

        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Resultado del examen"
              value={value}
              error={errors.ResultadoDelExamen}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="ResultadoDelExamen"
        />

        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="¿Tomó acciones ante el resultado?"
              value={value}
              error={errors.TomoAccionesAnteResultado}
              items={examOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="TomoAccionesAnteResultado"
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
  };
};
export default connect(
  mapStateToProps,
  null,
)(_AnotherReproductiveSexualHealtForm);
