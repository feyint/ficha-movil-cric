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
import {QuestionConditionPersonCodes, QuestionTypes} from '../../../../core/utils/PersonTypes';
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
  const [fucmunici, setfucmunici] = useState<string>();
  const [fucdepat, setfucdepat] = useState<string>();
  const [fucpais, setfucpais] = useState<string>();
  const [fnclunind, setfnclunind] = useState<string>();
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    let paises = await props.getEntitySelect('FUCPAIS', FUCPAISSCHEMA);
    let fncluninds = await props.getEntitySelect('FNCLUNIND', FNCLUNINDSCHEMA);
    let questionitems = await props.getQuestionWithOptions(questions);
    setquestionsS(questionitems);
    setfucpaisSelect(paises.children);
    setfnclunindselect(fncluninds.children);
    if (props.FNCPERSON.ID) {
      setValue('fnclunind', props.FNCPERSON.FNCLUNIND_ID);
      setfnclunind('' + props.FNCPERSON.FNCLUNIND_ID);
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
      console.error(dept);
      setValue('fucpais', dept.FUCPAIS_ID);
      setfucpais('' + dept.FUCPAIS_ID);
      let departsm = await props.getEntitySelect(
        'FUCDEPART',
        FUCDEPARTSCHEMA,
        'FUCPAIS_ID',
        dept.FUCPAIS_ID,
      );
      setfucdepatSelect(departsm.children);
      setValue('fucdepat', dept.ID);
      setfucdepat('' + dept.ID);
      let municipios = await props.getEntitySelect(
        'FUCMUNICI',
        FUCMUNICISCHEMA,
        'FUCDEPART_ID',
        dept.ID,
      );
      setfucmuniciSelect(municipios.children);
      setValue('fucmunici', props.FNCPERSON.FUCMUNICI_ID);
      setfucmunici('' + props.FNCPERSON.FUCMUNICI_ID);
      setValue('birthdate', props.FNCPERSON.FECHA_NACIMIENTO);
    }
  };

  const getItemsForQuestionSelect = (code: string) => {
    let syncCatalogService = new ConditionPersonService();
    return syncCatalogService.getItemsForQuestionSelect(code, questionsS);
  };
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
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
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
                if (value) {
                  props.updateFNCPERSON({
                    FECHA_NACIMIENTO: value,
                  });
                }
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
          name="fucdepat"
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
  saveAnswerLocal,
  getQuestionAnswer,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_BirthInformationForm);
