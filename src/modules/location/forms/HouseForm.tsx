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
import {QuestionCodes} from '../../../core/utils/HousingTypes';

const schemaForm = yup.object().shape({
  housecode: yup.string().required(),
  roofmaterial: yup.string().required(),
  floormaterial: yup.string().required(),
  wallmaterial: yup.string().required(),
  housetenure: yup.string().required(),
  kitchenislocated: yup.string().required(),
  smokeinsidehouse: yup.string().required(),
  cookwith: yup.string().required(),
  numberpeoplebedroom: yup.string().required(),
  roomsinhouse: yup.string().required(),
  typelighting: yup.string().required(),
  internetaccess: yup.string().required(),
});

const _HouseForm = (props: any) => {
  const navigation = useNavigation();
  const syncCatalogService = new HousingService();
  const [state, setState] = useState({
    questions: [] as HousingQuestion[],
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    let result = await syncCatalogService.getQuestionWithOptions([
      QuestionCodes.MaterialTecho,
      QuestionCodes.MaterialPiso,
      QuestionCodes.MaterialPared,
      QuestionCodes.Tenenciavivienda,
      QuestionCodes.Cocinacon,
      QuestionCodes.Numerodepersonaspordormitorio,
      QuestionCodes.Habitacionesenlavivienda,
      QuestionCodes.TipodeAlumbrado,
    ]);
    if (result) {
      setState({
        ...state,
        questions: result,
      });
    }
  };

  const getItemsForQuestionSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionSelect(code, state.questions);
  };

  const getItemsForQuestionMultiSelect = (code: string) => {
    return syncCatalogService.getItemsForQuestionMultiSelect(
      code,
      state.questions,
    );
  };

  const listCocinaseEncuentra = [
    {value: '-1', label: 'Seleccione...'},
    {value: '1', label: 'ADENTRO'},
    {value: '2', label: 'AFUERA'},
  ];
  const listHumoDentro = [
    { value: 'SI', label: "Si" },
    { value: 'NO', label: "No" },
  ];
  const listAccesoInternet = [
    {value: '-1', label: 'Seleccione...'},
    {value: 'SI', label: 'Si'},
    {value: 'NO', label: 'No'},
  ];

  const {handleSubmit, control, errors} = useForm({
    resolver: yupResolver(schemaForm),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text>Código vivienda</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BTextInput
              label="Código vivienda"
              disabled={false}
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
        <Text>
          {getItemsForQuestionSelect(QuestionCodes.MaterialTecho).name}
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              // label="Material Techo"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.roofmaterial}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionCodes.MaterialTecho).children
              }
            />
          )}
          name="roofmaterial"
        />
        <Text>
          {getItemsForQuestionSelect(QuestionCodes.MaterialPiso).name}
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              // label="Material Piso"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.floormaterial}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionCodes.MaterialPiso).children
              }
            />
          )}
          name="floormaterial"
        />
        <Text>
          {getItemsForQuestionSelect(QuestionCodes.MaterialPared).name}
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              // label="Material Pared"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.wallmaterial}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionCodes.MaterialPared).children
              }
            />
          )}
          name="wallmaterial"
        />
        <Text>
          {getItemsForQuestionSelect(QuestionCodes.Tenenciavivienda).name}
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              // label="Tenencia vivienda"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.housetenure}
              onChange={(value: any) => {
                onChange(value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionCodes.Tenenciavivienda)
                  .children
              }
            />
          )}
          name="housetenure"
        />
        <Text>La cocina se encuentra</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
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
        <Text>Humo dentro de la casa</Text>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BRadioButton
              value={value}
              items={listHumoDentro}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
            />
          )}
          name="smokeinsidehouse"
        />
        <Text>
          {getItemsForQuestionMultiSelect(QuestionCodes.Cocinacon).name}
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BMultiSelect
              label={
                getItemsForQuestionMultiSelect(QuestionCodes.Cocinacon).name
              }
              prompt="Seleccione una opción"
              onBlur={onBlur}
              error={errors.cookwith}
              onChange={(values: any) => {
                console.log('Selected Items: ', values);
                onChange(values);
              }}
              value={value}
              items={getItemsForQuestionMultiSelect(QuestionCodes.Cocinacon)}
            />
          )}
          name="cookwith"
        />
        <Text>
          {
            getItemsForQuestionSelect(
              QuestionCodes.Numerodepersonaspordormitorio,
            ).name
          }
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              // label="Numero de personas por dormitorio"
              // prompt="Seleccione una opción"
              enabled={true}
              onBlur={onBlur}
              error={errors.numberpeoplebedroom}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionCodes.Numerodepersonaspordormitorio,
                ).children
              }
            />
          )}
          name="numberpeoplebedroom"
        />
        <Text>
          {
            getItemsForQuestionSelect(QuestionCodes.Habitacionesenlavivienda)
              .name
          }
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              // label="Habitacionesenlavivienda"
              // prompt="Habitacionesenlavivienda"
              enabled={true}
              onBlur={onBlur}
              error={errors.roomsinhouse}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(
                  QuestionCodes.Habitacionesenlavivienda,
                ).children
              }
            />
          )}
          name="roomsinhouse"
        />
        <Text>
          {getItemsForQuestionSelect(QuestionCodes.TipodeAlumbrado).name}
        </Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              // label="TipodeAlumbrado"
              // prompt="TipodeAlumbrado"
              enabled={true}
              onBlur={onBlur}
              error={errors.typelighting}
              onChange={(value: any) => {
                onChange(value);
                console.log('Selected Item: ', value);
              }}
              value={value}
              selectedValue={value}
              items={
                getItemsForQuestionSelect(QuestionCodes.TipodeAlumbrado)
                  .children
              }
            />
          )}
          name="typelighting"
        />
        <Text>Acceso a Internet</Text>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
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
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default _HouseForm;
