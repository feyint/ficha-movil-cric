/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BButton, BDatePickerModal, BPicker} from '../../../../core/components';
import {ConditionPersonService, UtilsService} from '../../../../services';
import {updateFNCPERSON} from '../../../../state/person/actions';
import {
  DataBaseSchemas,
  FNCLUNINDSCHEMA,
  FUCDEPARTSCHEMA,
  FUCMUNICISCHEMA,
  FUCPAISSCHEMA,
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
import {colors} from 'react-native-elements';
import {theme} from '../../../../core/style/theme';

const schemaForm = yup.object().shape({
  fucmunici: yup.number().required(),
  fucdepat: yup.number().required(),
  fucpais: yup.number().required(),
  fnclunind: yup.number().required(),
  fnclunocci: yup.number().optional(),
  lacmaterna: yup.number().optional(),
});
const _BirthInformationForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [fucpaisSelect, setfucpaisSelect] = useState<
    {label: any; value: any}[]
  >([]);
  const [fnclunindselect, setfnclunindselect] = useState<
    {label: any; value: any}[]
  >([]);
  const [fucdepatSelect, setfucdepatSelect] = useState<
    {label: any; value: any}[]
  >([]);
  const [fucmuniciSelect, setfucmuniciSelect] = useState<
    {label: any; value: any}[]
  >([]);
  const [fucmunici, setfucmunici] = useState<string>();
  const [fucdepat, setfucdepat] = useState<string>();
  const [fucpais, setfucpais] = useState<string>();
  const [fnclunind, setfnclunind] = useState<string>();
  const [enablelacmaterna, setenablelacmaterna] = useState<boolean>(false);
  const [ageActual, setageActual] = useState<string>('');
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (props.FNCPERSON.ID) {
      let birthDate = props.FNCPERSON.FECHA_NACIMIENTO;
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
  }, [fucmuniciSelect]);
  const fetchQuestions = async () => {
    let paises = await props.getEntitySelect('FUCPAIS', FUCPAISSCHEMA);
    let fncluninds = await props.getEntitySelect('FNCLUNIND', FNCLUNINDSCHEMA);
    setfucpaisSelect(paises);
    setfnclunindselect(fncluninds);
    if (props.FNCPERSON.ID) {
      if (props.FNCPERSON.FNCLUNIND_ID) {
        setValue('fnclunind', props.FNCPERSON.FNCLUNIND_ID);
        setfnclunind('' + props.FNCPERSON.FNCLUNIND_ID);
      }
      if (props.FNCPERSON.FUCMUNICI_ID) {
        let service: UtilsService = new UtilsService();
        let munici = await service.getFilterEntity(
          DataBaseSchemas.FUCMUNICISCHEMA,
          FUCMUNICISCHEMA,
          'ID',
          props.FNCPERSON.FUCMUNICI_ID,
          null,
          null,
          true,
        );
        let dept = await service.getFilterEntity(
          DataBaseSchemas.FUCDEPARTSCHEMA,
          FUCDEPARTSCHEMA,
          'ID',
          munici.FUCDEPART_ID,
          null,
          null,
          true,
        );
        setValue('fucpais', dept.FUCPAIS_ID);
        setfucpais('' + dept.FUCPAIS_ID);
        let departsm = await props.getEntitySelect(
          'FUCDEPART',
          FUCDEPARTSCHEMA,
          'FUCPAIS_ID',
          dept.FUCPAIS_ID,
        );
        setfucdepatSelect(departsm);
        setValue('fucdepat', dept.ID);
        setfucdepat('' + dept.ID);
        let municipios = await props.getEntitySelect(
          'FUCMUNICI',
          FUCMUNICISCHEMA,
          'FUCDEPART_ID',
          dept.ID,
        );
        setfucmuniciSelect(municipios);
        setValue('fucmunici', props.FNCPERSON.FUCMUNICI_ID);
        setfucmunici('' + props.FNCPERSON.FUCMUNICI_ID);
      }
    }
  };

  const getItemsForQuestionSelect = (code: string) => {
    let service = new ConditionPersonService();
    return service.getItemsForQuestionSelect(code, props.questions);
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
  const onSubmit = async (data: any) => {
    navigation.goBack();
  };
  async function onChangePais(fucpais_id: any) {
    let FUCDEPART = await props.getEntitySelect(
      'FUCDEPART',
      FUCDEPARTSCHEMA,
      'FUCPAIS_ID',
      fucpais_id,
    );
    setfucdepatSelect(FUCDEPART);
    setValue('fucdepat', '');
    setfucdepat('');
  }
  async function onChangeDept(idDept: any) {
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      FUCMUNICISCHEMA,
      'FUCDEPART_ID',
      idDept,
    );
    setfucmuniciSelect(FUCMUNICI);
    setValue('fucmunici', '');
    setfucmunici(null);
  }
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
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
                onChange(value);
                setfucpais(value);
                if (value) {
                  onChangePais(value);
                }
              }}
              onLoad={() => {}}
              selectedValue={fucpais}
              items={fucpaisSelect}
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
              items={fucdepatSelect}
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
                if (value) {
                  props.updateFNCPERSON({
                    FUCMUNICI_ID: parseInt(value, 10),
                  });
                }
              }}
              onLoad={() => {}}
              selectedValue={fucmunici}
              items={fucmuniciSelect}
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
                if (value) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.LunaOccidental,
                    value,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.LunaOccidental,
                  'fnclunocci',
                );
              }}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.LunaOccidental,
                ).children
              }
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
                if (value) {
                  props.updateFNCPERSON({
                    FNCLUNIND_ID: parseInt(value, 10),
                  });
                }
              }}
              onLoad={() => {}}
              selectedValue={fnclunind}
              items={fnclunindselect}
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
                  if (value) {
                    props.saveAnswerLocal(
                      QuestionTypes.selectOne,
                      QuestionConditionPersonCodes.LactanciaMaterna,
                      value,
                    );
                  }
                }}
                selectedValue={value}
                items={
                  getItemsForQuestionSelect(
                    QuestionConditionPersonCodes.LactanciaMaterna,
                  ).children
                }
                onLoad={() => {
                  getAnswers(
                    QuestionTypes.selectOne,
                    QuestionConditionPersonCodes.LactanciaMaterna,
                    'lacmaterna',
                  );
                }}
              />
            )}
            name="lacmaterna"
          />
        )}
        <View
          style={{display: 'flex', flexDirection: 'row', marginLeft: '20%'}}>
          <BButton
            style={styles.aceptButon}
            color="secondary"
            value="Volver"
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
    fontSize: 20,
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
