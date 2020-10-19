import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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
    console.log('state.questions: ', state.questions);
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
            <BPicker
              enabled={true}
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.TerminacionGestacion,
              )}
              onBlur={onBlur}
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
              value={value}
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
          render={({onChange, onBlur, value}) => (
            <BDatePickerModal
              label="Fecha Terminacion De La Gestacion"
              //isVisible={false}
              onBlur={onBlur}
              error={errors.FechaTerminacionDeLaGestacion}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item in date piker: ', value);
                if (value) {
                  props.saveFNCSALREPPropiety(
                    'PARTO_ULTIMO',
                    value,
                    //JSON.parse(value),
                  );
                }
              }}
              /* onLoad={() => {
                console.log('OnLoad BDatePickerModal');
              }} */
              value={value}
            />
          )}
          name="FechaTerminacionDeLaGestacion"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              enabled={true}
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.PersonaQueAtendioUltimoParto,
              )}
              onBlur={onBlur}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
                console.log('Persona que atendió el último parto es: ', value);
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
              value={value}
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
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.LugarAtencionUltimoParto,
              )}
              onBlur={onBlur}
              error={errors.TerminacionGestacion}
              onChange={(value: any) => {
                onChange(value);
                console.log('lugar atencion ultimo parto value es: ', value);
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
              value={value}
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
                console.log('save', values);
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
  saveFNCSALREPPropiety,
};
const mapStateToProps = (sarhealthperson: any) => {
  return {
    FNCSALREP: sarhealthperson.sarhealthperson.FNCSALREP,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_LastPregnancyForm);
