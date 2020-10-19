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
  BRadioButton,
  BTextInput,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {SexAndRepHealthPersonService} from '../../../../services';

import {
  logicOption,
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
  QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
  QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
  QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
];

const schemaForm = yup.object().shape({
  FechaUltimaMenstruacion: yup.date().max(new Date()).required(),
  //EdadGestacional: yup.string().required(),
  //FechaProbableParto: yup.date().required(),
  PracticasCulturalesDuranteLaGestacion: yup.array().required(),
  acompanamientoDeGestacion: yup.array().required(),
  AcompanamientoFamilia: yup.boolean().required(),
  FactoresDeRiesgoGestante: yup.array().required(),
  RealizacionPruebaSerologia: yup.boolean().required(),
  RealizacionPruebaVIH: yup.boolean().required(),
});

const _CurrentPregnancyForm = (props: any) => {
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

  function onSubmit(data: any) {
    navigation.goBack();
  }
  const [EdadGestacional, setEdadGestacional] = useState('');
  const [FechaProbableParto, setFechaProbableParto] = useState(new Date());
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BDatePickerModal
              label="Fecha de la última Menstruación"
              maximumDate={new Date()}
              onBlur={onBlur}
              error={errors.FechaUltimaMenstruacion}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  var diff = (new Date().getTime() - value.getTime()) / 1000;
                  diff /= 60 * 60 * 24 * 7;
                  setEdadGestacional(`${Math.abs(Math.round(diff))} Semanas`);
                  var newDate = new Date(value.setMonth(value.getMonth() + 8));
                  setFechaProbableParto(newDate);
                } else {
                  setEdadGestacional('');
                }
              }}
              value={value}
            />
          )}
          name="FechaUltimaMenstruacion"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={'Edad gestacional'}
              onBlur={onBlur}
              disabled={true}
              error={errors.EdadGestacional}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={EdadGestacional}
            />
          )}
          name="EdadGestacional"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BDatePickerModal
              label="Fecha Probable de parto"
              onBlur={onBlur}
              error={errors.FechaProbableParto}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={FechaProbableParto}
            />
          )}
          name="FechaProbableParto"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
              )}
              onBlur={onBlur}
              error={errors.PracticasCulturalesDuranteLaGestacion}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
                  'PracticasCulturalesDuranteLaGestacion',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionSexAndRepHealthPersonCodes.PracticasCulturalesDuranteLaGestacion,
              )}
            />
          )}
          name="PracticasCulturalesDuranteLaGestacion"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
              )}
              onBlur={onBlur}
              error={errors.acompanamientoDeGestacion}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
                  'acompanamientoDeGestacion',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionSexAndRepHealthPersonCodes.acompanamientoDeGestacion,
              )}
            />
          )}
          name="acompanamientoDeGestacion"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Acompañamiento de la familia"
              value={value}
              error={errors.AcompanamientoFamilia}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="AcompanamientoFamilia"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
              )}
              onBlur={onBlur}
              error={errors.FactoresDeRiesgoGestante}
              onChange={(values: any) => {
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
                  'FactoresDeRiesgoGestante',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionSexAndRepHealthPersonCodes.FactoresDeRiesgoGestante,
              )}
            />
          )}
          name="FactoresDeRiesgoGestante"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Realización de prueba serología en el último trimestre gestacional"
              value={value}
              error={errors.RealizacionPruebaSerologia}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="RealizacionPruebaSerologia"
        />

        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Realización de prueba VIH en el último trimestre gestacional"
              value={value}
              error={errors.RealizacionPruebaVIH}
              items={logicOption}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="RealizacionPruebaVIH"
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CurrentPregnancyForm);
