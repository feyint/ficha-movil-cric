/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BButton, BPicker} from '../../../../core/components';
import {updateFNCPERSON} from '../../../../state/person/actions';
import {
  FUCDEPARTSCHEMA,
  FUCMUNICISCHEMA,
} from '../../../../providers/DataBaseProvider';
import {
  saveAnswerLocal,
  getQuestionAnswer,
} from '../../../../state/ConditionPerson/actions';
import {getEntitySelect} from '../../../location/state/actions';
import {
  QuestionConditionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import moment from 'moment';
import {PersonParametersConst} from '../../../../core/utils/SystemParameters';
import {Text} from 'react-native-paper';
import {theme} from '../../../../core/style/theme';
import {
  useFNCCONPER,
  useFNCLUNIND,
  useFNCPERSON_FNCCONPER,
  useFUCDEPART,
  useFUCMUNICI,
  useFUCPAIS,
} from '../../../../hooks';
import {FNCCONPER} from '../../../../types';
import { getSelectSchema } from '../../../../core/utils/utils';

const schemaForm = yup.object().shape({
  fucmunici: yup.number().required(),
  fucdepat: yup.number().required(),
  fucpais: yup.number().required(),
  fnclunind: yup.number().required(),
  fnclunocci: yup.number().optional(),
  lacmaterna: yup.number().optional(),
});
const questions = [
  QuestionConditionPersonCodes.LunaOccidental,
  QuestionConditionPersonCodes.LactanciaMaterna,
];
const _BirthInformationForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const {listFNCCONPER, getQuestionsOptions, getPicker} = useFNCCONPER();
  const {saveAnswer, getAnswerquestion} = useFNCPERSON_FNCCONPER();
  const {listFUCPAIS, getAllFUCPAIS} = useFUCPAIS();
  const {listFUCDEPART, getDeptfromPais} = useFUCDEPART();
  const {listFUCMUNICI, getFUCMUNICIFromDept, getDetails} = useFUCMUNICI();
  const {listFNCLUNIND, getAllFNCLUNIND} = useFNCLUNIND();
  const [fucmunici, setfucmunici] = useState<string>();
  const [fucdepat, setfucdepat] = useState<string>();
  const [fucpais, setfucpais] = useState<string>();
  const [fnclunind, setfnclunind] = useState<string>();
  const [enablelacmaterna, setenablelacmaterna] = useState<boolean>(false);
  const [ageActual, setageActual] = useState<string>('');
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    getQuestionsOptions(questions);
    getAllFUCPAIS();
    getAllFNCLUNIND();
    if (props.FNCPERSON.ID) {
      if (props.FNCPERSON.FNCLUNIND_ID) {
        setValue('fnclunind', props.FNCPERSON.FNCLUNIND_ID);
        setfnclunind('' + props.FNCPERSON.FNCLUNIND_ID);
      }
      if (props.FNCPERSON.FUCMUNICI_ID) {
        let details = await getDetails(props.FNCPERSON.FUCMUNICI_ID);
        getDeptfromPais(details.FUCPAIS_ID);
        getFUCMUNICIFromDept(details.FUCDEPART_ID);
        setValue('fucpais', details.FUCPAIS_ID);
        setfucpais('' + details.FUCPAIS_ID);
        setValue('fucdepat', details.FUCDEPART_ID);
        setfucdepat('' + details.FUCDEPART_ID);
        setValue('fucmunici', props.FNCPERSON.FUCMUNICI_ID);
        setfucmunici('' + props.FNCPERSON.FUCMUNICI_ID);
      }
    }
    if (props.FNCPERSON.ID) {
      let birthDate = props.FNCPERSON.FECHA_NACIMIENTO;
      console.error('llega a', birthDate);
      var years = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'years');
      var days = moment().diff(moment(birthDate, 'DD-MM-YYYY'), 'days');
      var a = moment(new Date());
      var b = moment(birthDate);
      var diffDuration = moment.duration(a.diff(b));
      var months = moment().diff(
        moment(birthDate, 'DD-MM-YYYY'),
        'months',
        true,
      );
      if (days <= PersonParametersConst.PRM021) {
        setenablelacmaterna(true);
      }
      if (days >= 0 && days <= 30) {
        setageActual(`${days} días`);
      }
      if (months >= 1 && months <= 12) {
        setageActual(
          `${diffDuration.months()} meses y ${diffDuration.days()} días`,
        );
      }
      if (years >= 1) {
        setageActual(
          `${diffDuration.years()} años ${diffDuration.months()} meses y ${diffDuration.days()} días`,
        );
      }
    }
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
  const onSubmit = async (data: any) => {
    navigation.goBack();
    /**
     * props.saveAnswerLocal(
      QuestionTypes.selectOne,
      QuestionConditionPersonCodes.LunaOccidental,
      value,
    );
    props.updateFNCPERSON({
      FNCLUNIND_ID: parseInt(value, 10),
    });
    props.saveAnswerLocal(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.LactanciaMaterna,
        value,
      );
     */
  };
  async function onChangePais(fucpais_id: any) {
    getDeptfromPais(fucpais_id);
    setValue('fucdepat', '');
    setfucdepat('');
  }
  async function onChangeDept(idDept: any) {
    getFUCMUNICIFromDept(idDept);
    setValue('fucmunici', '');
    setfucmunici('');
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
    }
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONPER.find((item: FNCCONPER) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNCPERSON;
      saveAnswer(type, answer, ID, question.FNCELEPER_ID);
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text>Edad actual</Text>
        <Text style={styles.containerage}>{ageActual}</Text>
        <Controller
          control={control}
          render={({onChange}) => (
            <BPicker
              label="País"
              error={errors.fucpais}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
                setfucpais(value);
                if (value) {
                  onChangePais(value);
                }
              }}
              onLoad={() => {}}
              selectedValue={fucpais}
              items={getSelectSchema(listFUCPAIS)}
            />
          )}
          name="fucpais"
        />
        <Controller
          control={control}
          render={({onChange}) => (
            <BPicker
              label="Departamento"
              error={errors.fucdepat}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
                setfucdepat(value);
                if (value) {
                  onChangeDept(value);
                }
              }}
              onLoad={() => {}}
              selectedValue={fucdepat}
              items={getSelectSchema(listFUCDEPART)}
            />
          )}
          name="fucdepat"
        />
        <Controller
          control={control}
          render={({onChange}) => (
            <BPicker
              label="Municipio"
              error={errors.fucmunici}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
                setfucmunici(value);
              }}
              onLoad={() => {}}
              selectedValue={fucmunici}
              items={getSelectSchema(listFUCMUNICI)}
            />
          )}
          name="fucmunici"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label="Luna occidental en la que nació"
              error={errors.fnclunocci}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
              }}
              onLoad={() => {
                getAnswers(
                  QuestionConditionPersonCodes.LunaOccidental,
                  'fnclunocci',
                );
              }}
              selectedValue={value}
              items={getPicker(QuestionConditionPersonCodes.LunaOccidental)}
            />
          )}
          name="fnclunocci"
        />
        <Controller
          control={control}
          render={({onChange}) => (
            <BPicker
              label="Luna indígena en la que nació"
              error={errors.fnclunind}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
                setfnclunind(value);
              }}
              onLoad={() => {}}
              selectedValue={fnclunind}
              items={getSelectSchema(listFNCLUNIND)}
            />
          )}
          name="fnclunind"
        />
        {enablelacmaterna && (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BPicker
                label="Lactancia materna"
                error={errors.lacmaterna}
                onChange={(value: any) => {
                  setEditable(true);
                  onChange(value);
                }}
                selectedValue={value}
                items={getPicker(QuestionConditionPersonCodes.LactanciaMaterna)}
                onLoad={() => {
                  getAnswers(
                    QuestionConditionPersonCodes.LactanciaMaterna,
                    'lacmaterna',
                  );
                }}
              />
            )}
            name="lacmaterna"
          />
        )}
        <View style={styles.bottoms}>
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
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buton: {
    width: '25%',
    //backgroundColor: colors.primary,
  },
  aceptButon: {
    backgroundColor: 'white',
    color: 'white',
    width: '25%',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  bottoms: {display: 'flex', flexDirection: 'row', marginLeft: '20%'},
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
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  containerage: {
    fontSize: 16,
    padding: 10,
    marginBottom: 5,
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

const mapStateToProps = (person: any) => {
  return {
    FNCPERSON: person.person.FNCPERSON,
  };
};
const mapDispatchToProps = {
  updateFNCPERSON,
  getEntitySelect,
  saveAnswerLocal,
  getQuestionAnswer,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_BirthInformationForm);
