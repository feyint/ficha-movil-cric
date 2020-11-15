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
  BRadioButton,
  BTextInput,
} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {SexAndRepHealthPersonService} from '../../../../services';

import {
  logicOption,
  examOption,
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
  const syncCatalogService = new SexAndRepHealthPersonService();

  const [state, setState] = useState({
    questions: [] as SexAndRepHealthPersonQuestion[],
  });

  //const [pikerEnable, setPikerEnable] = useState(false);

  const navigation = useNavigation();

  const [editable, setEditable] = useState(false);

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

  function alert(data: any) {
    editable
      ? Alert.alert(
          '',
          '¿Desea cancelar el proceso?.',
          [
            {
              text: 'NO',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'SI', onPress: () => navigation.goBack()},
          ],
          {cancelable: false},
        )
      : navigation.goBack();
  }

  function onSubmit(data: any) {
    navigation.goBack();
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
              )}
              onBlur={onBlur}
              error={errors.MetodoDelPlaneacionFamiliar}
              onChange={(values: any) => {
                setEditable(true);
                onChange(values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
                  values,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
                  'MetodoDelPlaneacionFamiliar',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionSexAndRepHealthPersonCodes.MetodoDelPlaneacionFamiliar,
              )}
            />
          )}
          name="MetodoDelPlaneacionFamiliar"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.SaludSexual,
              )}
              onBlur={onBlur}
              error={errors.SaludSexual}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.SaludSexual,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.SaludSexual,
                  'SaludSexual',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.SaludSexual,
                ).children
              }
            />
          )}
          name="Fuma"
        />
        {/* <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
            enabled={false}
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
              )}
              onBlur={onBlur}
              error={errors.AutoexamenDeMama}
              onChange={(value: any) => {
                onChange(value);
                console.log('save: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
                  'AutoexamenDeMama',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.AutoexamenDeMama,
                ).children
              }
            />
          )}
          name="Fuma"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
              )}
              onBlur={onBlur}
              error={errors.CitologiaCervicoUterina}
              onChange={(value: any) => {
                onChange(value);
                console.log('save: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
                  'CitologiaCervicoUterina',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.CitologiaCervicoUterina,
                ).children
              }
            />
          )}
          name="Fuma"
            />*/}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
              )}
              onBlur={onBlur}
              error={errors.ExamenDeProstata}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                  'ExamenDeProstata',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionSexAndRepHealthPersonCodes.ExamenDeProstata,
                ).children
              }
            />
          )}
          name="Fuma"
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
                setEditable(true);
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
                setEditable(true);
                if (value) {
                  onChange(value);
                  //props.saveFNBNUCVIVPropiety('HUMO_CASA', JSON.parse(value));
                }
              }}
            />
          )}
          name="TomoAccionesAnteResultado"
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_AnotherReproductiveSexualHealtForm);
