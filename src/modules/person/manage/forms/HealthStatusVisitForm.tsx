/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BButton,
  BMultiSelect,
  BPicker,
  ButtonAction,
} from '../../../../core/components';
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
import {useFNCCONSAL} from '../../../../hooks/useFNCCONSAL';
import {FNCCONSAL} from '../../../../types';
import {useFNCDESARM} from '../../../../hooks/useFNCDESARM';
import {getMSelectSchema, getSelectSchema} from '../../../../core/utils/utils';

const questionscodes = [
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
  const {
    getLabel,
    getQuestionsOptions,
    getPicker,
    getMultiselect,
    listFNCCONSAL,
  } = useFNCCONSAL();
  const {listFNCDESARM, getAllFNCDESARM} = useFNCDESARM();
  const [editable, setEditable] = useState(false);
  const [desarmony, setDesarmony] = useState('');
  const navigation = useNavigation();
  const {handleSubmit, control, errors, getValues, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });

  useEffect(() => {
    getQuestionsOptions(questionscodes);
  }, []);
  useEffect(() => {
    if (listFNCCONSAL) {
      fetchQuestions();
    }
  }, [listFNCCONSAL]);

  async function fetchQuestions() {
    getAllFNCDESARM();
    /**
     *  getAnswers(
                  QuestionTypes.multiSelect,
                  QuestionPersonCodes.DesarmoniaOccidental,
                  'DesarmoniaOccidental',
                );
     */
  }
  function onSubmit(data: any) {
    navigation.goBack();
  }
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    // if (question) {
    //   const {ID} = props.FNCPERSON;
    //   let ans = await getAnswerquestion(ID, question.FNCELEPER_ID, type);
    //   if (ans) {
    //     if (type == 1) {
    //       setValue(prop, '' + ans);
    //     } else {
    //       setValue(prop, ans);
    //     }
    //   }
    //   return ans;
    // }
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    _type: 1 | 2 = 1,
    personid = 0,
  ) {
    let question = listFNCCONSAL.find((item: FNCCONSAL) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNCPERSON.ID;
      if (personid > 0) {
        ID = personid;
      }
      // saveAnswer(_type, answer, ID, question.FNCELEPER_ID);
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label="Desarmonia propia"
              prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.DesarmoniaPropia}
              onChange={(value: any) => {
                setEditable(true);
                onChange(value);
                setDesarmony(value);
              }}
              value={desarmony}
              items={getMSelectSchema('FNCDESARM', listFNCDESARM)}
            />
          )}
          name="DesarmoniaPropia"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(QuestionPersonCodes.DesarmoniaOccidental)}
              onBlur={onBlur}
              error={errors.DesarmoniaOccidental}
              onChange={(values: any) => {
                setEditable(true);
                onChange(values);
                SaveAnswers(
                  QuestionPersonCodes.DesarmoniaOccidental,
                  values,
                  2,
                );
              }}
              selectedItems={value}
              items={getMultiselect(QuestionPersonCodes.DesarmoniaOccidental)}
            />
          )}
          name="DesarmoniaOccidental"
        />

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={getLabel(QuestionPersonCodes.AntecedentesFamiliares)}
              onBlur={onBlur}
              error={errors.AntecedentesFamiliares}
              onChange={(values: any) => {
                setEditable(true);
                onChange(values);
                SaveAnswers(
                  QuestionPersonCodes.AntecedentesFamiliares,
                  values,
                  2,
                );
              }}
              selectedItems={value}
              items={getMultiselect(QuestionPersonCodes.AntecedentesFamiliares)}
            />
          )}
          name="AntecedentesFamiliares"
        />
        <ButtonAction
          onAccept={handleSubmit(onSubmit)}
          onCancel={() => navigation.goBack()}
        />
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
    padding: 15,
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
