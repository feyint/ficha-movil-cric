/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BPicker, ButtonAction} from '../../../../core/components';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';
import moment from 'moment';
import {SystemParameterEnum,} from '../../../../core/utils/SystemParameters';
import {Text} from 'react-native-paper';
import {setFNCPERSON} from '../../../../state/person/actions';

import {
  useFNCCONPER,
  useFNCLUNIND,
  useFNCPERSON,
  useFNCPERSON_FNCCONPER,
  useFUCDEPART,
  useFUCMUNICI,
  useFUCPAIS,
  useSGCSISPAR,
} from '../../../../hooks';
import {FNCCONPER, FNCPERSON} from '../../../../types';
import {getSelectSchema} from '../../../../core/utils/utils';

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
  const {getByCode} = useSGCSISPAR();
  const {saveAnswer, getAnswerquestion} = useFNCPERSON_FNCCONPER();
  const {listFUCPAIS, getAllFUCPAIS} = useFUCPAIS();
  const {listFUCDEPART, getDeptfromPais} = useFUCDEPART();
  const {itemFNCPERSON, updateFNCPERSON} = useFNCPERSON();
  const {listFUCMUNICI, getFUCMUNICIFromDept, getDetails} = useFUCMUNICI();
  const {listFNCLUNIND, getAllFNCLUNIND} = useFNCLUNIND();
  const [fucmunici, setfucmunici] = useState<string>();
  const [fucdepat, setfucdepat] = useState<string>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [fucpais, setfucpais] = useState<string>();
  const [fnclunind, setfnclunind] = useState<string>();
  const [enablelacmaterna, setenablelacmaterna] = useState<boolean>(false);
  const [ageActual, setageActual] = useState<string>('');
  useEffect(() => {
    getQuestionsOptions(questions);
  }, []);
  useEffect(() => {
    if (listFUCDEPART && fucdepat) {
      setValue('fucdepat', fucdepat);
      setfucdepat('' + fucdepat);
    }
  }, [listFUCDEPART]);
  useEffect(() => {
    fetchQuestions();
  }, [listFNCCONPER]);
  useEffect(() => {
    if (itemFNCPERSON) {
      props.setFNCPERSON(itemFNCPERSON);
    }
  }, [itemFNCPERSON]);
  const fetchQuestions = async () => {
    getAllFUCPAIS();
    getAllFNCLUNIND();
    if (props.FNCPERSON.ID) {
      if (props.FNCPERSON.FNCLUNIND_ID) {
        setValue('fnclunind', props.FNCPERSON.FNCLUNIND_ID);
        setfnclunind('' + props.FNCPERSON.FNCLUNIND_ID);
      }
      console.error('mm ', props.FNCPERSON);
      if (props.FNCPERSON.FUCMUNICI_ID) {
        let details = await getDetails(props.FNCPERSON.FUCMUNICI_ID);
        setValue('fucdepat', details.FUCDEPART_ID);
        setfucdepat('' + details.FUCDEPART_ID);
        getDeptfromPais(details.FUCPAIS_ID);
        getFUCMUNICIFromDept(details.FUCDEPART_ID);
        setValue('fucpais', details.FUCPAIS_ID);
        setfucpais('' + details.FUCPAIS_ID);
        console.error(details.FUCDEPART_ID);
        setValue('fucmunici', props.FNCPERSON.FUCMUNICI_ID);
        setfucmunici('' + props.FNCPERSON.FUCMUNICI_ID);
        getAnswers(QuestionConditionPersonCodes.LactanciaMaterna, 'lacmaterna');
        getAnswers(QuestionConditionPersonCodes.LunaOccidental, 'fnclunocci');
        setTimeout(() => {
          setLoaded(true);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoaded(true);
        }, 2000);
      }
    }
    console.error(props.FNCPERSON.FECHA_NACIMIENTO);
    if (props.FNCPERSON.ID && props.FNCPERSON.FECHA_NACIMIENTO) {
      let birthDate = moment(props.FNCPERSON.FECHA_NACIMIENTO).toDate();
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
      let edadLactancia = await getByCode(SystemParameterEnum.PRM021);
      console.error(
        'dias de edad ',
        days,
        'edadLactancia',
        edadLactancia.VALOR,
      );
      if (days <= Number(edadLactancia.VALOR)) {
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
    } else {
      navigation.goBack();
    }
  };
  const onSubmit = async (data: any) => {
    SaveAnswers(QuestionConditionPersonCodes.LunaOccidental, data.fnclunocci);
    SaveAnswers(QuestionConditionPersonCodes.LactanciaMaterna, data.lacmaterna);
    let person: FNCPERSON = props.FNCPERSON;
    person.FNCLUNIND_ID = data.fnclunind;
    person.FUCMUNICI_ID = data.fucmunici;
    await updateFNCPERSON(person);
    navigation.goBack();
  };
  async function onChangePais(fucpais_id: any) {
    getDeptfromPais(fucpais_id);
    setValue('fucdepat', '');
    setfucdepat('');
  }
  async function onChangeDept(idDept: any) {
    if (loaded) {
      getFUCMUNICIFromDept(idDept);
      setValue('fucmunici', '');
      setfucmunici('');
    }
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
        <Text>Edad en la visita</Text>
        <Text style={styles.containerage}>{ageActual}</Text>
        <Controller
          control={control}
          render={({onChange}) => (
            <BPicker
              label="País"
              error={errors.fucpais}
              onChange={(value: any) => {
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
                onChange(value);
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
                  onChange(value);
                }}
                selectedValue={value}
                items={getPicker(QuestionConditionPersonCodes.LactanciaMaterna)}
              />
            )}
            name="lacmaterna"
          />
        )}
        <ButtonAction
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
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

const mapStateToProps = (store: any) => {
  return {
    FNCPERSON: store.person.FNCPERSON,
  };
};
const mapDispatchToProps = {
  setFNCPERSON,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_BirthInformationForm);
