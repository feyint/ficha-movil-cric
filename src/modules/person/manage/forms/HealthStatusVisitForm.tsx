import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Picker, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BMultiSelect, BPicker} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {PersonService} from '../../../../services';

import {
  QuestionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/person/actions';
import {PersonQuestion} from '../state/types';
import {SelectSchema} from '../../../../core/utils/types';
import {
  getEntitySelect,
  getLasHouseCode,
} from '../../../../modules/location/state/actions';
import {theme} from '../../../../core/style/theme';

const questions = [
  QuestionPersonCodes.DesarmoniaOccidental,
  QuestionPersonCodes.AntecedentesFamiliares,
];

const schemaForm = yup.object().shape({
  DesarmoniaPropia: yup.array().optional(),
  DesarmoniaOccidental: yup.array().required(),
  AntecedentesFamiliares: yup.array().required(),
});

const _HealthStatusVisitForm = (props: any) => {
  const syncCatalogService = new PersonService();

  const [editable, setEditable] = useState(false);

  const [state, setState] = useState({
    questions: [] as PersonQuestion[],
  });

  const [desarmony, setDesarmony] = useState('');
  const [desarmonySelect, setDesarmonySelect] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });

  const navigation = useNavigation();

  const {handleSubmit, control, errors, getValues, setValue} = useForm({
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
    let FNCDESARM = await props.getEntitySelect('FNCDESARM');
    setDesarmonySelect(FNCDESARM);
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
        {/* <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={'Desarmonia propia'}
              onBlur={onBlur}
              error={errors.DesarmoniaOccidental}
              onChange={(values: any) => {
                onChange(values);
                console.log('save');
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.DesarmoniaOccidental,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.DesarmoniaOccidental,
                  'DesarmoniaOccidental',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionPersonCodes.DesarmoniaOccidental,
              )}
            />
          )}
          name="DesarmoniaOccidental"
        /> */}

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label="Desarmonia propia"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.DesarmoniaPropia}
              onChange={(value:any) => {
                setEditable(true);
                onChange(value);
                setDesarmony(value);
              }}
              selectedValue={desarmony}
              items={desarmonySelect.children}
            />
          )}
          name="DesarmoniaPropia"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(QuestionPersonCodes.DesarmoniaOccidental)}
              onBlur={onBlur}
              error={errors.DesarmoniaOccidental}
              onChange={(values: any) => {
                setEditable(true);
                onChange(values);
                console.log('save');
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.DesarmoniaOccidental,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.DesarmoniaOccidental,
                  'DesarmoniaOccidental',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionPersonCodes.DesarmoniaOccidental,
              )}
            />
          )}
          name="DesarmoniaOccidental"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionPersonCodes.AntecedentesFamiliares,
              )}
              onBlur={onBlur}
              error={errors.AntecedentesFamiliares}
              onChange={(values: any) => {
                setEditable(true);
                onChange(values);
                console.log('save');
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.AntecedentesFamiliares,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.AntecedentesFamiliares,
                  'AntecedentesFamiliares',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionPersonCodes.AntecedentesFamiliares,
              )}
            />
          )}
          name="AntecedentesFamiliares"
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
  getEntitySelect,
};
const mapStateToProps = (session: any) => {
  return {
    user: session.session.user,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_HealthStatusVisitForm);
