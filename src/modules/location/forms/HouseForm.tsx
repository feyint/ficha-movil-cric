import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {
  BButton,
  BTextInput,
  BPicker,
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
  saveFNBNUCVIV,
  saveFNBNUCVIVPropiety,
} from '../../../state/house/actions';
import {connect} from 'react-redux';
import {FieldValidator} from '../../../providers';
const schemaForm = yup.object().shape({
  housecode: FieldValidator.required(yup, 'Código vivienda'),
  MaterialTecho: FieldValidator.required(yup, 'Material Techo'),
  MaterialPiso: FieldValidator.required(yup, 'Material Piso'),
  MaterialPared: FieldValidator.required(yup, 'Material Pared'),
  Tenenciavivienda: FieldValidator.required(yup, 'Tenencia vivienda'),
  kitchenislocated: FieldValidator.required(yup, 'La cocina se encuentra'),
  smokeinsidehouse: FieldValidator.required(yup, 'Humo dentro de la casa'),
  Cocinacon: FieldValidator.required(yup, 'Cocina con'),
  Numerodepersonaspordormitorio: FieldValidator.required(
    yup,
    'Número de personas por dormitorio',
  ),
  Habitacionesenlavivienda: FieldValidator.required(
    yup,
    'Habitaciones en la vivienda',
  ),
  TipodeAlumbrado: FieldValidator.required(yup, 'Tipo de Alumbrado'),
  internetaccess: FieldValidator.required(yup, 'Acceso a Internet'),
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

const _HouseForm = (props: any) => {
  const navigation = useNavigation();
  const syncCatalogService = new HousingService();
  const [internetaccess, setInternetaccess] = useState<boolean>();
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
    getAnswersFNBNUCVIV();
  };
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
  }
  async function getAnswersFNBNUCVIV() {
    setValue('smokeinsidehouse', props.FNBNUCVIV.HUMO_CASA);
    setValue('kitchenislocated', props.FNBNUCVIV.LUGAR_COCINA);
    setValue('internetaccess', props.FNBNUCVIV.ACCESO_INTERNET);
    setInternetaccess(props.FNBNUCVIV.ACCESO_INTERNET);
    // if (answer) {
    //   setValue('smokeinsidehouse', answer);
    //   return answer;
    // }
    // return null;
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
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Código nucleo familiar"
              disabled={true}
              onBlur={onBlur}
              error={errors.housecode}
              onChange={(value: any) => {
                onChange(value);
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.MaterialTecho,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialTecho,
                  'MaterialTecho',
                );
              }}
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.MaterialPiso,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialPiso,
                  'MaterialPiso',
                );
              }}
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.MaterialPared,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.MaterialPared,
                  'MaterialPared',
                );
              }}
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.Tenenciavivienda,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Tenenciavivienda,
                  'Tenenciavivienda',
                );
              }}
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
                if (value) {
                  onChange(value);
                  props.saveFNBNUCVIVPropiety('LUGAR_COCINA', value);
                }
              }}
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
                if (value) {
                  onChange(value);
                }
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.Cocinacon,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Cocinacon,
                  'Cocinacon',
                );
              }}
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.Numerodepersonaspordormitorio,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Numerodepersonaspordormitorio,
                  'Numerodepersonaspordormitorio',
                );
              }}
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.Habitacionesenlavivienda,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.Habitacionesenlavivienda,
                  'Habitacionesenlavivienda',
                );
              }}
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
                if (vlue) {
                  props.saveAnswerLocal(
                    QuestionTypes.selectOne,
                    QuestionFamilyCodes.TipodeAlumbrado,
                    vlue,
                  );
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionFamilyCodes.TipodeAlumbrado,
                  'TipodeAlumbrado',
                );
              }}
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
          render={({onChange, value}) => (
            <BRadioButton
              label="Acceso a Internet"
              value={internetaccess}
              error={errors.internetaccess}
              items={logicOption}
              onChange={(value: any) => {
                onChange(value);
                props.saveFNBNUCVIVPropiety(
                  'ACCESO_INTERNET',
                  JSON.parse(value),
                );
                setInternetaccess(value);
              }}
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
  saveFNBNUCVIV,
  saveFNBNUCVIVPropiety,
};
const mapStateToProps = (housing: any) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_HouseForm);
