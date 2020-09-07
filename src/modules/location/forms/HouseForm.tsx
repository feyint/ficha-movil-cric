import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BButton,
  BTextInput,
  BPicker,
  BMultiSelect,
  BRadioButton,
} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {HousingService} from '../../../services';
import {HousingQuestion} from '../../housing/state/types';
import {
  QuestionFamilyCodes,
  logicOption,
  QuestionTypes,
} from '../../../core/utils/HousingTypes';
import {
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
} from '../../../state/house/actions';
import {connect} from 'react-redux';
const schemaForm = yup.object().shape({
  housecode: yup.string().required(),
  MaterialTecho: yup.number().required(),
  MaterialPiso: yup.string().required(),
  MaterialPared: yup.string().required(),
  Tenenciavivienda: yup.string().required(),
  kitchenislocated: yup.string().required(),
  smokeinsidehouse: yup.string().required().oneOf(['SI', 'NO']),
  Cocinacon: yup.string().required(),
  Numerodepersonaspordormitorio: yup.string().required(),
  Habitacionesenlavivienda: yup.string().required(),
  TipodeAlumbrado: yup.string().required(),
  internetaccess: yup.string().required(),
});
const questions = [
  QuestionFamilyCodes.MaterialTecho,
  QuestionFamilyCodes.MaterialPiso,
  QuestionFamilyCodes.MaterialPared,
  QuestionFamilyCodes.Tenenciavivienda,
  QuestionFamilyCodes.Cocinacon,
  QuestionFamilyCodes.Numerodepersonaspordormitorio,
  QuestionFamilyCodes.Habitacionesenlavivienda,
  QuestionFamilyCodes.TipodeAlumbrado,
];
const listCocinaseEncuentra = [
  {value: '-1', label: 'Seleccione...'},
  {value: '1', label: 'ADENTRO'},
  {value: '2', label: 'AFUERA'},
];
const listAccesoInternet = [
  {value: '-1', label: 'Seleccione...'},
  {value: 'SI', label: 'Si'},
  {value: 'NO', label: 'No'},
];
const _HouseForm = (props: any) => {
  const navigation = useNavigation();
  const syncCatalogService = new HousingService();
  const [state, setState] = useState({
    questions: [] as HousingQuestion[],
  });
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  useEffect(() => {
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    let result = await syncCatalogService.getQuestionWithOptions(questions);
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
    setValue('housecode', props.FNBNUCVIV.CODIGO);
  };
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
  }
  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

  const getQuestionlabel = (code: string) => {
    return syncCatalogService.getQuestionlabel(code, state.questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questions,
    );
  };
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Código vivienda"
              disabled={true}
              onBlur={onBlur}
              error={errors.housecode}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
              value={value}
            />
          )}
          name="housecode"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionFamilyCodes.MaterialTecho)
                  .name
              }
              onBlur={onBlur}
              error={errors.MaterialTecho}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialTecho,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialTecho,
                  'MaterialTecho',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.MaterialTecho)
                  .children
              }
            />
          )}
          name="MaterialTecho"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionFamilyCodes.MaterialPiso).name
              }
              onBlur={onBlur}
              error={errors.MaterialPiso}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialPiso,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialPiso,
                  'MaterialPiso',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.MaterialPiso)
                  .children
              }
            />
          )}
          name="MaterialPiso"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionFamilyCodes.MaterialPared)
                  .name
              }
              onBlur={onBlur}
              error={errors.MaterialPared}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialPared,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialPared,
                  'MaterialPared',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.MaterialPared)
                  .children
              }
            />
          )}
          name="MaterialPared"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionFamilyCodes.Tenenciavivienda)
                  .name
              }
              onBlur={onBlur}
              error={errors.Tenenciavivienda}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Tenenciavivienda,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Tenenciavivienda,
                  'Tenenciavivienda',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.Tenenciavivienda)
                  .children
              }
            />
          )}
          name="Tenenciavivienda"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="La cocina se encuentra"
              enabled={true}
              onBlur={onBlur}
              error={errors.kitchenislocated}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={listCocinaseEncuentra}
            />
          )}
          name="kitchenislocated"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              label="Humo dentro de la casa"
              value={value}
              error={errors.smokeinsidehouse}
              items={logicOption}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
            />
          )}
          name="smokeinsidehouse"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionFamilyCodes.Cocinacon).name
              }
              onBlur={onBlur}
              error={errors.Cocinacon}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Cocinacon,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Cocinacon,
                  'Cocinacon',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.Cocinacon)
                  .children
              }
            />
          )}
          name="Cocinacon"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Numerodepersonaspordormitorio,
                ).name
              }
              onBlur={onBlur}
              error={errors.Numerodepersonaspordormitorio}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Numerodepersonaspordormitorio,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Numerodepersonaspordormitorio,
                  'Numerodepersonaspordormitorio',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Numerodepersonaspordormitorio,
                ).children
              }
            />
          )}
          name="Numerodepersonaspordormitorio"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Habitacionesenlavivienda,
                ).name
              }
              onBlur={onBlur}
              error={errors.Habitacionesenlavivienda}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Habitacionesenlavivienda,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Habitacionesenlavivienda,
                  'Habitacionesenlavivienda',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionFamilyCodes.Habitacionesenlavivienda,
                ).children
              }
            />
          )}
          name="Habitacionesenlavivienda"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={
                getItemsForQuestionSelect(QuestionFamilyCodes.TipodeAlumbrado)
                  .name
              }
              onBlur={onBlur}
              error={errors.TipodeAlumbrado}
              onChange={(vlue: any) => {
                onChange(vlue);
                props.saveAnswerLocal(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.TipodeAlumbrado,
                  vlue,
                );
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.TipodeAlumbrado,
                  'TipodeAlumbrado',
                );
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionFamilyCodes.TipodeAlumbrado)
                  .children
              }
            />
          )}
          name="TipodeAlumbrado"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Acceso a Internet"
              enabled={true}
              onBlur={onBlur}
              error={errors.internetaccess}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={listAccesoInternet}
            />
          )}
          name="internetaccess"
        />
        <View>
          <BButton
            color="primary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View style={styles.spacer} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 3,
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
  saveAnswerLocal,
  getQuestionAnswer,
  getQuestionWithOptions,
};
const mapStateToProps = (housing) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_HouseForm);
