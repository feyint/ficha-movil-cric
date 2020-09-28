import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BDatePickerModal, BMultiSelect, BPicker, BTextInput} from '../../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {ConditionPersonService} from '../../../../services';
import {SelectSchema} from '../../../core/utils/types';
import {
  getEntitySelect,
  getLasHouseCode,
} from '../../../../modules/location/state/actions';
import {
  QuestionConditionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/ConditionPerson/actions';
import {ConditionPersonQuestion} from '../state/types';
import BNumberInput from '../../../../core/components/BNumberInput';

const questions = [
  QuestionConditionPersonCodes.LunaOccidental,
  QuestionConditionPersonCodes.LactanciaMaterna,
];

const schemaForm = yup.object().shape({
  BirthDate: yup.date().required(),
  LunaOccidental: yup.number().required(),
  LactanciaMaterna: yup.number().required(),
  department: yup.string().required(),
  municipality: yup.string().required(),
});

const _BirthDataForm = (props: any) => {
  const syncCatalogService = new ConditionPersonService();

  const [state, setState] = useState({
    questions: [] as ConditionPersonQuestion[],
  });

  //const [pikerEnable, setPikerEnable] = useState(false);
  const [department, setDepartment] = useState('');
  const [departamentoSelect, setDepartamentoSelect] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });
  const [municipality, setMunicipality] = useState('');
  const [municipioSelect, setMunicipioSelect] = useState<SelectSchema>({
    id: 0,
    name: '',
    children: [],
  });

  const navigation = useNavigation();

  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

  const {handleSubmit, control, errors, getValues, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    // useMunicipio();
  }, [municipality]);

  async function fetchQuestions() {
    let result = await props.getQuestionWithOptions(questions);
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
    let FUCDEPART = await props.getEntitySelect('FUCDEPART');
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      'FUCDEPART_ID',
      getValues().department,
    );
    setDepartamentoSelect(FUCDEPART);
    setMunicipioSelect(FUCMUNICI);
    //getDefaultValues();
  }

  async function onChangeDept(idDept: any) {
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      'FUCDEPART_ID',
      idDept,
    );
    setMunicipioSelect(FUCMUNICI);
    setValue('municipality', '-1');
    setMunicipality('-1');
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

  const [birthDay, setBirthDay] = useState();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BDatePickerModal
              label="Fecha de Nacimiento"
              onBlur={onBlur}
              error={errors.BirthDate}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item in date piker: ', value);
                //setBirthDay(value);
                /* if (value) {
                  props.saveFNCSALREPPropiety(
                    'PARTO_ULTIMO',
                    value,
                    //JSON.parse(value),
                  );
                } */
              }}
              /* onLoad={() => {
                console.log('OnLoad BDatePickerModal');
              }} */
              value={value}
            />
          )}
          name="BirthDate"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label={birthDay}
              onBlur={onBlur}
              disabled={true}
              error={errors.Edad}
              onChange={(value: any) => {
                onChange(value);
                console.log(`valor de value en edad es ${value}`);
                console.log(`el valor de la 1ra fecha es ${birthDay}`)
              }}
              value={value}
            />
          )}
          name="Edad"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Departamento"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.department}
              onChange={(value: any) => {
                console.log(value);
                onChange(value);
                if (value) {
                  setDepartment(value);
                  onChangeDept(value);
                }
              }}
              onLoad={() => {
                // todo
              }}
              selectedValue={department}
              items={departamentoSelect.children}
            />
          )}
          name="department"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Municipio"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.municipality}
              onChange={(value: any) => {
                console.log(value);
                onChange(value);
                setMunicipality(value);
                //onChangeDept(value);
              }}
              onLoad={() => {
                // todo
              }}
              selectedValue={municipality}
              items={municipioSelect.children}
            />
          )}
          name="municipality"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.LunaOccidental,
              )}
              onBlur={onBlur}
              error={errors.LunaOccidental}
              onChange={(value: any) => {
                onChange(value);
                console.log('save luna en la q nacio value es: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LunaOccidental,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LunaOccidental,
                  'LunaOccidental',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.LunaOccidental,
                ).children
              }
            />
          )}
          name="LunaOccidental"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={getQuestionlabel(
                QuestionConditionPersonCodes.LactanciaMaterna,
              )}
              onBlur={onBlur}
              error={errors.LactanciaMaterna}
              onChange={(value: any) => {
                onChange(value);
                console.log('save: ', value);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LactanciaMaterna,
                  value,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LactanciaMaterna,
                  'LactanciaMaterna',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.LactanciaMaterna,
                ).children
              }
            />
          )}
          name="LactanciaMaterna"
        />
        {/* <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getQuestionlabel(
                QuestionConditionPersonCodes.ProgramaDeSalud,
              )}
              onBlur={onBlur}
              error={errors.ProgramaDeSalud}
              onChange={(values: any) => {
                onChange(values);
                console.log('save', values);
                props.saveAnswerLocal(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.ProgramaDeSalud,
                  values,
                );
              }}
              onLoad={() => {
                console.log('onLoad');
                getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionConditionPersonCodes.ProgramaDeSalud,
                  'ProgramaDeSalud',
                );
              }}
              selectedItems={value}
              items={getItemsForQuestionMultiSelect(
                QuestionConditionPersonCodes.ProgramaDeSalud,
              )}
            />
          )}
          name="ProgramaDeSalud"
        /> */}
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
  getEntitySelect,
};
const mapStateToProps = (session: any) => {
  return {
    user: session.session.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_BirthDataForm);
