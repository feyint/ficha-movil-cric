import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BButton,
  BDatePickerModal,
  BMultiSelect,
  BPicker,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {SexAndRepHealthPersonService} from '../../../../services';

import {
  QuestionSexAndRepHealthPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  saveFNCSALREPPropiety,
} from '../../../../state/SexAndRepHealthPerson/actions';
import {SexAndRepHealthPersonQuestion} from '../state/types';
import {theme} from '../../../../core/style/theme';

const questions = [
  QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
  QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
  QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
  QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
];

const schemaForm = yup.object().shape({
  TerminacionGestacion: yup.number().positive().required(),
  FechaTerminacionDeLaGestacion: yup.date().notRequired(),
  PersonaQueAtendioUltimoParto: yup.number().required(),
  LugarAtencionUltimoParto: yup.number().required(),
  ComplicacionAtencionUltimoParto: yup.array().required(),
});

const _LastPregnancyForm = (props: any) => {
  const syncCatalogService = new SexAndRepHealthPersonService();

  const [state, setState] = useState({
    questions: [] as SexAndRepHealthPersonQuestion[],
  });

  //const [pikerEnable, setPikerEnable] = useState(false);

  const navigation = useNavigation();

  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

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
    getAnswersFNCSALREP();
  }
  async function getAnswersFNCSALREP() {
    /* if (
      props.FNBNUCVIV.ANIMAL_VACUNADO &&
      props.FNBNUCVIV.ANIMAL_VACUNADO !== 'null'
    ) {
      setValue('NumeroAnimales', '' + props.FNBNUCVIV.ANIMAL_VACUNADO);
      setNumeroAnimales('' + props.FNBNUCVIV.ANIMAL_VACUNADO);
    } */
    /* if (
      props.FNBNUCVIV.ANIMAL_NOVACUNADO &&
      props.FNBNUCVIV.ANIMAL_NOVACUNADO !== 'null'
    ) {
      setValue(
        'NumeroAnimalesnoVacunados',
        '' + props.FNBNUCVIV.ANIMAL_NOVACUNADO,
      );
    } */
    /* setValue('ResiduosGeneranenVivienda', props.FNBNUCVIV.RESIDUO_BOR);
    setValue('setNumeroAnimalesnoVacunados', props.FNBNUCVIV.RIESGO);
    setValue('Observaciones', props.FNBNUCVIV.OBSERVACION); */
    setValue('FechaTerminacionDeLaGestacion', props.FNCSALREP.PARTO_ULTIMO);
  }

  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
  }

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, state.questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questions,
    );
  };

  function alert(data: any) {
    Alert.alert(
      'Volver!!!',
      'Esta seguro?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => navigation.goBack()},
      ],
      {cancelable: false},
    );
  }

  function onSubmit(data: any) {
    navigation.goBack();
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              enabled={true}
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
              )}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
                console.log(
                  'save finalizacion de la ultima gestacion value es: ',
                  value,
                );
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
                  'TerminacionGestacion',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
                ).children
              }
            />
          )}
          name="TerminacionGestacion"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BDatePickerModal
              label="Fecha Terminacion De La Gestacion"
              error={errors.FechaTerminacionDeLaGestacion}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  props.saveFNCSALREPPropiety(
                    'PARTO_ULTIMO',
                    value,
                  );
                }
              }}
              value={value}
            />
          )}
          name="FechaTerminacionDeLaGestacion"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              enabled={true}
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
              )}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
                  'PersonaQueAtendioUltimoParto',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
                ).children
              }
            />
          )}
          name="PersonaQueAtendioUltimoParto"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
              )}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
                  'LugarAtencionUltimoParto',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
                ).children
              }
            />
          )}
          name="LugarAtencionUltimoParto"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
              )}
              onBlur={onBlur}
              error={errors.ComplicacionAtencionUltimoParto}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
                  'ComplicacionAtencionUltimoParto',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionSexAndRepHealthPersonCodes.ComplicacionAtencionUltimoParto,
              )}
            />
          )}
          name="ComplicacionAtencionUltimoParto"
        />
        <View
          style={{display: 'flex', flexDirection: 'row', marginLeft: '20%'}}>
          <BButton
            style={styles.aceptButon}
            color="secondary"
            value="Cancelar"
            labelStyle={styles.text}
            onPress={alert}
          />
          <BButton
            style={styles.cancelButon}
            color="secondary"
            //labelStyle={styles.text}
            value="Validar"
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
const mapDispatchToProps = {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  saveFNCSALREPPropiety,
};
const mapStateToProps = (sarhealthperson: any) => {
  return {
    FNCSALREP: sarhealthperson.sarhealthperson.FNCSALREP,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_LastPregnancyForm);
