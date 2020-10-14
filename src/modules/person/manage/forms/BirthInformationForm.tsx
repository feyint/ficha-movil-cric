import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BButton, BDatePickerModal, BPicker} from '../../../../core/components';
import {ConditionPersonService, UtilsService} from '../../../../services';
import {FNCPERSON} from '../../../../state/person/types';
import {
  getQuestionWithOptions,
  saveFNCPERSON,
  updateFNCPERSON,
} from '../../../../state/person/actions';
import {
  FNCLUNINDSCHEMA,
  FUCDEPARTSCHEMA,
  FUCMUNICISCHEMA,
  FUCPAISSCHEMA,
} from '../../../../providers/DataBaseProvider';
import {getEntitySelect} from '../../../location/state/actions';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';
import {ConditionPersonQuestion} from '../state/types';
const schemaForm = yup.object().shape({
  birthdate: yup.date().required('La fecha de nacimiento es requerida'),
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
  const [questionsS, setquestionsS] = useState<ConditionPersonQuestion[]>([]);
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
  const [fucmunici, setfucmunici] = useState();
  const [fucdepat, setfucdepat] = useState();
  const [fucpais, setfucpais] = useState();
  const [fnclunocci, setfnclunocci] = useState();
  const [fnclunind, setfnclunind] = useState();
  const [lacmaterna, setlacmaterna] = useState();
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    let result = await props.getEntitySelect('FUCPAIS', FUCPAISSCHEMA);
    let fncluninds = await props.getEntitySelect('FNCLUNIND', FNCLUNINDSCHEMA);
    let questionitems = await props.getQuestionWithOptions(questions);
    setquestionsS(questionitems);
    setfucpaisSelect(result.children);
    setfnclunindselect(fncluninds.children);
    if (props.FNCPERSON.ID) {
    }
  };

  const getItemsForQuestionSelect = (code: string) => {
    let syncCatalogService = new ConditionPersonService();
    return syncCatalogService.getItemsForQuestionSelect(code, questionsS);
  };
  const onSubmit = async (data: any) => {
    let person: FNCPERSON = props.FNCPERSON;
    if (person.ID != null) {
      try {
      } catch (error) {
        console.error(error);
      }
    } else {
      let item: any = {};
      item.PRIMER_NOMBRE = data.firstname;
      item.SEGUNDO_NOMBRE = data.middlename ? data.middlename : '';
      item.PRIMER_APELLIDO = data.lastname;
      item.SEGUNDO_APELLIDO = data.secondlastname ? data.secondlastname : '';
      item.IDENTIFICACION = data.identification;
      item.FNCTIPIDE_ID = JSON.parse(data.identificationType);
      item.FNCGENERO_ID = JSON.parse(data.gender);
    }
    navigation.goBack();
  };
  async function onChangePais(fucpais_id: any) {
    let FUCDEPART = await props.getEntitySelect(
      'FUCDEPART',
      FUCDEPARTSCHEMA,
      'FUCPAIS_ID',
      fucpais_id,
    );
    setfucdepatSelect(FUCDEPART.children);
    setValue('fucdepat', '');
    setfucdepat(null);
  }
  async function onChangeDept(idDept: any) {
    let FUCMUNICI = await props.getEntitySelect(
      'FUCMUNICI',
      FUCMUNICISCHEMA,
      'FUCDEPART_ID',
      idDept,
    );
    setfucmuniciSelect(FUCMUNICI.children);
    setValue('fucmunici', '');
    setfucmunici(null);
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BDatePickerModal
              maximumDate={new Date()}
              label="Fecha de nacimiento"
              error={errors.birthdate}
              onChange={(value: Date) => {
                onChange(value);
              }}
              onLoad={() => {}}
              value={value}
            />
          )}
          name="birthdate"
        />
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
              error={errors.fucdepat}
              onChange={(value: any) => {
                onChange(value);
                setfucmunici(value);
              }}
              onLoad={() => {}}
              selectedValue={fucmunici}
              items={fucmuniciSelect}
            />
          )}
          name="fucdepat"
        />
        <Controller
          control={control}
          render={({onChange}) => (
            <BPicker
              label="Luna occidental en la que nació"
              error={errors.fnclunocci}
              onChange={(value: any) => {
                onChange(value);
                setfnclunocci(value);
              }}
              onLoad={() => {}}
              selectedValue={fnclunocci}
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
              }}
              onLoad={() => {}}
              selectedValue={fnclunind}
              items={fnclunindselect}
            />
          )}
          name="fnclunind"
        />
        <Controller
          control={control}
          render={({onChange}) => (
            <BPicker
              label="Lactancia materna"
              error={errors.lacmaterna}
              onChange={(value: any) => {
                onChange(value);
                setlacmaterna(value);
              }}
              onLoad={() => {}}
              selectedValue={lacmaterna}
              items={
                getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.LactanciaMaterna,
                ).children
              }
            />
          )}
          name="lacmaterna"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
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
  saveFNCPERSON,
  getEntitySelect,
  getQuestionWithOptions,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_BirthInformationForm);
