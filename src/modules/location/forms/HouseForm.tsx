/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  QuestionFamilyCodes,
  logicOption,
} from '../../../core/utils/HousingTypes';
import {setFNBNUCVIV} from '../../../state/house/actions';
import {connect} from 'react-redux';
import {FieldValidator} from '../../../providers';
import {
  useFNBNUCVIV,
  useFNBNUCVIV_FVCCONVIV,
  useFVCCONVIV,
} from '../../../hooks';
import {FNBNUCVIV, FVCCONVIV} from '../../../types';
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
  const {
    listFVCCONVIV,
    getQuestionsOptions,
    getFVCCONVIVpicker,
  } = useFVCCONVIV();
  const {saveAnswer, getAnswerquestion} = useFNBNUCVIV_FVCCONVIV();
  const {updateFNBNUCVIV} = useFNBNUCVIV();
  const [internetaccess, setInternetaccess] = useState<boolean>();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    getAnswersFNBNUCVIV();
  }, [listFVCCONVIV]);
  const fetchQuestions = async () => {
    getQuestionsOptions(questions);
  };
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFVCCONVIV.find((item: FVCCONVIV) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNBNUCVIV;
      let ans = await getAnswerquestion(ID, question.FVCELEVIV_ID, type);
      setValue(prop, '' + ans);
    }
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
  ) {
    let question = listFVCCONVIV.find((item: FVCCONVIV) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNBNUCVIV;
      saveAnswer(type, answer, ID, question.FVCELEVIV_ID);
    }
  }
  async function getAnswersFNBNUCVIV() {
    setValue('housecode', props.FNBNUCVIV.CODIGO);
    setValue('smokeinsidehouse', props.FNBNUCVIV.HUMO_DENTRO);
    setValue('kitchenislocated', '' + props.FNBNUCVIV.LUGAR_COCINA);
    setValue('internetaccess', props.FNBNUCVIV.ACCESO_INTERNET);
    setInternetaccess(props.FNBNUCVIV.ACCESO_INTERNET);
    getAnswers(QuestionFamilyCodes.MaterialTecho, 'MaterialTecho');
    getAnswers(QuestionFamilyCodes.MaterialPiso, 'MaterialPiso');
    getAnswers(QuestionFamilyCodes.MaterialPared, 'MaterialPared');
    getAnswers(QuestionFamilyCodes.Tenenciavivienda, 'Tenenciavivienda');
    getAnswers(QuestionFamilyCodes.Cocinacon, 'Cocinacon');
    getAnswers(
      QuestionFamilyCodes.Numerodepersonaspordormitorio,
      'Numerodepersonaspordormitorio',
    );
    getAnswers(
      QuestionFamilyCodes.Habitacionesenlavivienda,
      'Habitacionesenlavivienda',
    );
    getAnswers(QuestionFamilyCodes.TipodeAlumbrado, 'TipodeAlumbrado');
  }
  const onSubmit = async (data: any) => {
    SaveAnswers(QuestionFamilyCodes.MaterialTecho, data.MaterialTecho);
    SaveAnswers(QuestionFamilyCodes.MaterialPiso, data.MaterialPiso);
    SaveAnswers(QuestionFamilyCodes.MaterialPared, data.MaterialPared);
    SaveAnswers(QuestionFamilyCodes.Tenenciavivienda, data.Tenenciavivienda);
    SaveAnswers(QuestionFamilyCodes.Cocinacon, data.Cocinacon);
    SaveAnswers(QuestionFamilyCodes.TipodeAlumbrado, data.TipodeAlumbrado);
    SaveAnswers(
      QuestionFamilyCodes.Numerodepersonaspordormitorio,
      data.Numerodepersonaspordormitorio,
    );
    SaveAnswers(
      QuestionFamilyCodes.Habitacionesenlavivienda,
      data.Habitacionesenlavivienda,
    );
    let _FNBNUCVIV: FNBNUCVIV = props.FNBNUCVIV;
    _FNBNUCVIV.LUGAR_COCINA = data.kitchenislocated;
    _FNBNUCVIV.HUMO_DENTRO = data.smokeinsidehouse;
    _FNBNUCVIV.ACCESO_INTERNET = data.internetaccess;
    await updateFNBNUCVIV(_FNBNUCVIV);
    props.setFNBNUCVIV(_FNBNUCVIV);
    props.goBack();
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              label="Código nucleo familiar"
              disabled={true}
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
          render={({onChange, value}) => (
            <BPicker
              label={'Material Techo'}
              error={errors.MaterialTecho}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.MaterialTecho)}
            />
          )}
          name="MaterialTecho"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={'Material del piso'}
              error={errors.MaterialPiso}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.MaterialPiso)}
            />
          )}
          name="MaterialPiso"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={'Material Pared'}
              error={errors.MaterialPared}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.MaterialPared)}
            />
          )}
          name="MaterialPared"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={'Tenencia vivienda'}
              error={errors.Tenenciavivienda}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.Tenenciavivienda)}
            />
          )}
          name="Tenenciavivienda"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label="La cocina se encuentra"
              enabled={true}
              error={errors.kitchenislocated}
              onChange={(value: any) => {
                onChange(value);
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
                onChange(value);
              }}
            />
          )}
          name="smokeinsidehouse"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={'Cocina con'}
              error={errors.Cocinacon}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.Cocinacon)}
            />
          )}
          name="Cocinacon"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={'Numero de personas por dormitorio'}
              error={errors.Numerodepersonaspordormitorio}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(
                QuestionFamilyCodes.Numerodepersonaspordormitorio,
              )}
            />
          )}
          name="Numerodepersonaspordormitorio"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={'Habitaciones en la vivienda'}
              error={errors.Habitacionesenlavivienda}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(
                QuestionFamilyCodes.Habitacionesenlavivienda,
              )}
            />
          )}
          name="Habitacionesenlavivienda"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label={'Tipo de alumbrado'}
              error={errors.TipodeAlumbrado}
              onChange={(vlue: any) => {
                onChange(vlue);
              }}
              selectedValue={value}
              items={getFVCCONVIVpicker(QuestionFamilyCodes.TipodeAlumbrado)}
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
const mapDispatchToProps = {setFNBNUCVIV};
const mapStateToProps = (housing: any) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(_HouseForm);
