import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {BButton, BPicker, BTextInput} from '../../../../core/components';
import BNumberInput from '../../../../core/components/BNumberInput';
import {ConditionPersonService, PersonService} from '../../../../services';
import {FNCPERSON} from '../../../../state/person/types';
import {
  saveFNCPERSON,
  saveSaveFNBNUCVIV_FNCPERSON,
  updateFNCPERSON,
} from '../../../../state/person/actions';
import {
  QuestionConditionPersonCodes,
  QuestionTypes,
} from '../../../../core/utils/PersonTypes';
import {
  getQuestionAnswer,
  getQuestionWithOptions,
  saveAnswerLocal,
} from '../../../../state/ConditionPerson/actions';
import PersonRelationService from '../../../../services/PersonRelationService';

const schemaForm = yup.object().shape({
  parentezcoGrupoFamiliar: yup.string().required(),
  firstname: yup.string().required(),
  middlename: yup.string().optional(),
  lastname: yup.string().required(),
  secondlastname: yup.string().optional(),
  identification: yup.string().required(),
  withoutidentification: yup.string().notRequired(),
  identificationType: yup.string().required(),
  gender: yup.string().required(),
  GrupoEtnico: yup.number().required(),
});
const _PersonalInformationForm = (props: any) => {
  const navigation = useNavigation();
  const personService = new PersonService();
  const conditionpersonService = new ConditionPersonService();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const identificationTypes = [
    {label: 'Seleccione', value: '-1'},
    {label: 'Cédula de ciudadania (CC)', value: '1'},
    {label: 'Tarjeta de identidad (TI)', value: '2'},
    {label: 'Registro civil', value: '3'},
    {label: 'Adulto sin identificación', value: '4'},
    {label: 'Menor sin identificación', value: '5'},
  ];
  const [genders, setGenders] = useState<{label: any; value: any}[]>([]);
  const [gender, setGender] = useState<any>();
  const [identification, setIdentification] = useState('');
  const [identificationType, setIdentificationType] = useState<any>();
  const [grupoEtnico, setGrupoEtnico] = useState<any>();
  const [parentezcoGrupoFamiliar, setParentezcoGrupoFamiliar] = useState<any>();
  const [
    parentezcoGrupoFamiliarSelect,
    setParentezcoGrupoFamiliarSelect,
  ] = useState<{label: any; value: any}[]>([]);
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    let delayDebounceFn = onChangeIdentification();
    return () => clearTimeout(delayDebounceFn);
  }, [identification, identificationType]);

  const fetchQuestions = async (item = null) => {
    let result = await personService.getGenderList();
    let resultparen = await conditionpersonService.getParentList();
    setGenders(result);
    setParentezcoGrupoFamiliarSelect(resultparen);
    if (props.FNCPERSON.ID) {
      setValue('firstname', props.FNCPERSON.PRIMER_NOMBRE);
      setValue('middlename', props.FNCPERSON.SEGUNDO_NOMBRE);
      setValue('lastname', props.FNCPERSON.PRIMER_APELLIDO);
      setValue('secondlastname', props.FNCPERSON.SEGUNDO_APELLIDO);
      setValue('identification', props.FNCPERSON.IDENTIFICACION);
      setIdentification(props.FNCPERSON.IDENTIFICACION);
      setValue('identificationType', props.FNCPERSON.FNCTIPIDE_ID);
      setIdentificationType('' + props.FNCPERSON.FNCTIPIDE_ID);
      setValue('gender', props.FNCPERSON.FNCGENERO_ID);
      setGender(props.FNCPERSON.FNCGENERO_ID);
      setValue('parentezcoGrupoFamiliar', props.FNCPERSON.FNCPAREN_ID);
      setParentezcoGrupoFamiliar(props.FNCPERSON.FNCPAREN_ID);
    }
  };
  const refreshPerson = async (item: FNCPERSON) => {
    if (item) {
      setValue('firstname', item.PRIMER_NOMBRE);
      setValue('middlename', item.SEGUNDO_NOMBRE);
      setValue('lastname', item.PRIMER_APELLIDO);
      setValue('secondlastname', item.SEGUNDO_APELLIDO);
      setValue('identification', item.IDENTIFICACION);
      setIdentification(item.IDENTIFICACION);
      setValue('identificationType', item.FNCTIPIDE_ID);
      setIdentificationType('' + item.FNCTIPIDE_ID);
      setValue('gender', item.FNCGENERO_ID);
      setGender(item.FNCGENERO_ID);
      setValue('parentezcoGrupoFamiliar', item.FNCPAREN_ID);
      setParentezcoGrupoFamiliar(item.FNCPAREN_ID);
      getAnswers(
        QuestionTypes.selectOne,
        QuestionConditionPersonCodes.GrupoEtnico,
        'GrupoEtnico',
      );
    }
  };
  const onSubmit = async (data: any) => {
    let person: FNCPERSON = props.FNCPERSON;
    if (person.ID != null) {
      try {
        let inserted = await props.updateFNCPERSON({
          ID: person.ID,
          PRIMER_NOMBRE: data.firstname,
          SEGUNDO_NOMBRE: data.middlename ? data.middlename : '',
          PRIMER_APELLIDO: data.lastname,
          SEGUNDO_APELLIDO: data.secondlastname ? data.secondlastname : '',
          IDENTIFICACION: data.identification,
          FNCTIPIDE_ID: JSON.parse(data.identificationType),
          FNCGENERO_ID: JSON.parse(data.gender),
          FNCPAREN_ID: JSON.parse(data.parentezcoGrupoFamiliar),
        });
        props.saveAnswerLocal(
          QuestionTypes.selectOne,
          QuestionConditionPersonCodes.GrupoEtnico,
          data.GrupoEtnico,
        );
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
      item.FNCPAREN_ID = JSON.parse(data.parentezcoGrupoFamiliar);
      let inserted = await props.saveFNCPERSON(item);
      if (inserted.ID) {
        props.saveAnswerLocal(
          QuestionTypes.selectOne,
          QuestionConditionPersonCodes.GrupoEtnico,
          data.GrupoEtnico,
        );
      }
    }
    navigation.goBack();
  };
  async function getAnswers(type: number, code: string, prop: string) {
    let question = await props.getQuestionAnswer(type, code);
    setValue(prop, question);
    setGrupoEtnico(question);
  }
  async function asociateExistingPerson(item: FNCPERSON) {
    let asociated = await props.saveSaveFNBNUCVIV_FNCPERSON(item);
    if (asociated) {
      await refreshPerson(item);
    } else {
      Alert.alert(
        'Error al asociar persona',
        'Ocurrio un error al asociar la persona a este nucleo familiar',
        [
          {
            text: 'aceptar',
          },
        ],
      );
    }
  }
  async function existingCurrentFNBNUCVIV(FNCPERSON_ID: number) {
    let personRelationService = new PersonRelationService();
    return await personRelationService.countFNBNUCVIV_FNCPERSON(
      props.FNBNUCVIV.ID,
      FNCPERSON_ID,
    );
  }
  function onChangeIdentification() {
    const delayDebounceFn = setTimeout(async () => {
      let person: FNCPERSON = props.FNCPERSON;
      console.log(identification);
      //TODO validar solo numero de identificacion
      if (identification && identificationType) {
        let item = await personService.getPersonbyIdentification(
          identification,
          identificationType,
        );
        if (item) {
          //valida que no exista en el nucleo familiar actual
          if (!person.ID && (await existingCurrentFNBNUCVIV(item.ID))) {
            setIdentification('');
            Alert.alert(
              'Identificación existente',
              `La persona ${item.PRIMER_NOMBRE} ${item.SEGUNDO_NOMBRE} ${item.PRIMER_NOMBRE} ${item.SEGUNDO_APELLIDO} \ncon identificación ${item.IDENTIFICACION}\nya se encuentra en este nucleo familiar`,
              [
                {
                  text: 'aceptar',
                },
              ],
            );
          } else if (person.ID !== item.ID) {
            if (item.FNCPAREN_ID == 7) {
              Alert.alert(
                'Identificación existente',
                `La persona ${item.PRIMER_NOMBRE} ${item.SEGUNDO_NOMBRE} ${item.PRIMER_NOMBRE} ${item.SEGUNDO_APELLIDO} \ncon identificación ${item.IDENTIFICACION} ya esta asociada a un nucleo familiar \nDesea asociarla a este nucle familiar cómo "CABEZA DE FAMILIA"?`,
                [
                  {
                    text: 'Si, Asociar',
                    onPress: async () => {
                      await asociateExistingPerson(item);
                    },
                  },
                  {
                    text: 'No',
                    onPress: () => {
                      setIdentification('');
                    },
                  },
                ],
              );
            } else {
              setIdentification('');
              Alert.alert(
                'Identificación existente',
                `La persona ${item.PRIMER_NOMBRE} ${item.SEGUNDO_NOMBRE} ${item.PRIMER_NOMBRE} ${item.SEGUNDO_APELLIDO} \ncon identificación ${item.IDENTIFICACION} ya esta asociada a un nucleo familiar \npara asociarlo a este debe tener el parentezco "CABEZA DE FAMILIA"`,
                [
                  {
                    text: 'aceptar',
                  },
                ],
              );
            }
          }
        } else {
          let existDocument = await personService.getPersonbyIdentification(
            identification,
            null,
          );
          if (existDocument) {
            Alert.alert(
              'Identificación existente',
              `El numero de identificación ${identification} ya se encuentra registrado en el sistema con otro tipo de identificación, \n Valide la información`,
              [
                {
                  text: 'aceptar',
                },
              ],
            );
            setIdentification('');
          }
        }
      }
    }, 1000);
    return delayDebounceFn;
  }
  function validateRelationship() {
    //TODO Validar si la identificacion pertenece a mas de un nucleo no puede cambiar el parentezo
    //TODO validar si es la unica persona del nucleo debe ser cabeza de hogar
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Tipo de identificación"
              prompt="Seleccione una opción"
              onBlur={onBlur}
              error={errors.identificationType}
              onChange={(value) => {
                if (identificationType == '1' || identificationType == '2') {
                  if (value !== '1' && value !== '2') {
                    setIdentification('');
                    onChange(value);
                    setIdentificationType(value);
                  } else {
                    onChange(value);
                    setIdentificationType(value);
                  }
                } else {
                  if (value == '1' || value == '2') {
                    setIdentification('');
                    onChange(value);
                    setIdentificationType(value);
                  } else {
                    onChange(value);
                    setIdentificationType(value);
                  }
                }
              }}
              selectedValue={identificationType}
              items={identificationTypes}
            />
          )}
          name="identificationType"
        />
        <Controller
          control={control}
          render={({onChange, value}) =>
            identificationType == '1' || identificationType == '2' ? (
              <BNumberInput
                label="Identificación"
                error={errors.identification}
                onChange={(value) => {
                  onChange(value);
                  setIdentification(value);
                }}
                value={identification}
              />
            ) : (
              <BTextInput
                label="Identificación"
                error={
                  identificationType == '3'
                    ? errors.identification
                    : errors.withoutidentification
                }
                onChange={(value) => {
                  onChange(value);
                  setIdentification(value);
                }}
                value={identification}
              />
            )
          }
          name="identification"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BPicker
              label="Género"
              error={errors.gender}
              onChange={(value: any) => {
                onChange(value);
                setGender(value);
              }}
              onLoad={() => {}}
              selectedValue={gender}
              items={genders}
            />
          )}
          name="gender"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              label="Primer nombre"
              error={errors.firstname}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="firstname"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              label="Segundo nombre"
              error={errors.middlename}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="middlename"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              label="Primer apellido"
              error={errors.lastname}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="lastname"
        />
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              label="Segundo Apellido"
              error={errors.secondlastname}
              onChange={(value) => onChange(value)}
              value={value}
            />
          )}
          name="secondlastname"
        />
        <Controller //Parentezco en el grupo familiar
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label="Parentezco en el grupo familiar"
              prompt="Selecione una opcion"
              onBlur={onBlur}
              error={errors.parentezcoGrupoFamiliar}
              onChange={(value: any) => {
                if (value) {
                  onChange(value);
                  setParentezcoGrupoFamiliar(value);
                }
              }}
              selectedValue={parentezcoGrupoFamiliar}
              items={parentezcoGrupoFamiliarSelect}
              //value={value}
            />
          )}
          name="parentezcoGrupoFamiliar"
        />
        <Controller //GrupoEtnico
          control={control}
          render={({onChange, onBlur, value}) => (
            <BPicker
              label={'Grupo etnico'}
              onBlur={onBlur}
              error={errors.GrupoEtnico}
              onChange={(value: any) => {
                onChange(value);
                if (value) {
                  setGrupoEtnico(value);
                }
              }}
              onLoad={() => {
                getAnswers(
                  QuestionTypes.selectOne,
                  QuestionConditionPersonCodes.GrupoEtnico,
                  'GrupoEtnico',
                );
              }}
              //value={value}
              selectedValue={grupoEtnico}
              items={
                conditionpersonService.getItemsForQuestionSelect(
                  QuestionConditionPersonCodes.GrupoEtnico,
                  props.questions,
                ).children
              }
            />
          )}
          name="GrupoEtnico"
        />
        <View>
          <BButton
            color="secondary"
            value="Guardar Cambios"
            onPress={handleSubmit(onSubmit, (err) => {
              console.error(err);
            })}
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

const mapStateToProps = (state: any) => {
  return {
    FNCPERSON: state.person.FNCPERSON,
    FNBNUCVIV: state.housing.FNBNUCVIV,
  };
};
const mapDispatchToProps = {
  updateFNCPERSON,
  saveFNCPERSON,
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  saveSaveFNBNUCVIV_FNCPERSON,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_PersonalInformationForm);
