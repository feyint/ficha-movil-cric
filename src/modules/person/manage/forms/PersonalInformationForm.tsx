/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  BButton,
  BDatePickerModal,
  BPicker,
  BTextInput,
} from '../../../../core/components';
import BNumberInput from '../../../../core/components/BNumberInput';
import {
  ConditionPersonService,
  HousingService,
  PersonService,
} from '../../../../services';
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
import {PersonParametersConst} from '../../../../core/utils/SystemParameters';
import {theme} from '../../../../core/style/theme';

const schemaForm = yup.object().shape({
  parentezcoGrupoFamiliar: yup.string().required(),
  firstname: yup.string().required(),
  middlename: yup.string().optional(),
  lastname: yup.string().required(),
  secondlastname: yup.string().optional(),
  identification: yup.string().required(),
  identificationType: yup.string().required(),
  gender: yup.string().required(),
  GrupoEtnico: yup.number().required(),
  birthdate: yup.date().required('La fecha de nacimiento es requerida'),
});
// eslint-disable-next-line react-hooks/exhaustive-deps
const _PersonalInformationForm = (props: any) => {
  const navigation = useNavigation();
  const personService = new PersonService();
  const housingService = new HousingService();
  const conditionpersonService = new ConditionPersonService();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [person, setPerson] = useState<FNCPERSON>();
  const [genders, setGenders] = useState<{label: any; value: any}[]>([]);
  const [identificationTypes, setidentificationTypes] = useState<
    {label: any; value: any; item: any}[]
  >([]);
  const [identificationEx, setidentificationEx] = useState<any[]>([]);
  const [gender, setGender] = useState<any>();
  const [alreadyHeaderID, setalreadyHeaderID] = useState<number>(0);
  const [identification, setIdentification] = useState('');
  const [identificationType, setIdentificationType] = useState<any>();
  const [grupoEtnico, setGrupoEtnico] = useState<any>();
  const [parentezcoGrupoFamiliar, setParentezcoGrupoFamiliar] = useState<any>();
  const [birthDate, setbirthDate] = useState<Date>(new Date());
  const [
    parentezcoGrupoFamiliarSelect,
    setParentezcoGrupoFamiliarSelect,
  ] = useState<{label: any; value: any}[]>([]);
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (props.FNCPERSON.ID) {
      setValue('parentezcoGrupoFamiliar', props.FNCPERSON.FNCPAREN_ID);
      setParentezcoGrupoFamiliar(props.FNCPERSON.FNCPAREN_ID);
    }
  }, [parentezcoGrupoFamiliarSelect]);
  useEffect(() => {
    if (props.FNCPERSON.ID) {
      let idtypeEx: any[] = [];
      identificationTypes.forEach((item) => {
        if (
          item.item &&
          PersonParametersConst.identificationType.indexOf(item.item.CODIGO) !==
            -1
        ) {
          idtypeEx.push(item.item);
        }
      });
      setValue('identificationType', props.FNCPERSON.FNCTIPIDE_ID);
      setIdentificationType(props.FNCPERSON.FNCTIPIDE_ID);
      setidentificationEx(idtypeEx);
    }
  }, [identificationTypes]);
  useEffect(() => {
    if (props.FNCPERSON.ID) {
      setValue('gender', props.FNCPERSON.FNCGENERO_ID);
      setGender(props.FNCPERSON.FNCGENERO_ID);
    }
  }, [genders]);
  useEffect(() => {
    let delayDebounceFn = onChangeIdentification();
    return () => clearTimeout(delayDebounceFn);
  }, [identification, identificationType]);
  useEffect(() => {
    if (person) {
      setValue('firstname', person.PRIMER_NOMBRE);
      setValue('middlename', person.SEGUNDO_NOMBRE);
      setValue('lastname', person.PRIMER_APELLIDO);
      setValue('secondlastname', person.SEGUNDO_APELLIDO);
      setValue('identification', person.IDENTIFICACION);
      setIdentification(person.IDENTIFICACION);
      setValue('parentezcoGrupoFamiliar', person.FNCPAREN_ID);
      setParentezcoGrupoFamiliar(person.FNCPAREN_ID);
      setValue('birthdate', person.FECHA_NACIMIENTO);
      setbirthDate(person.FECHA_NACIMIENTO);
    }
  }, [person]);
  const fetchQuestions = async () => {
    let result = await personService.getSelectList('FNCGENERO');
    let resultFNCPAREN = await personService.getSelectList('FNCPAREN');
    let resultFNCTIPIDE = await personService.getSelectList('FNCTIPIDE');
    let alreadyexistheader = await housingService.getFNBNUCVIVPersonsParent(
      props.FNBNUCVIV.ID,
    );
    setalreadyHeaderID(alreadyexistheader);
    setGenders(result);
    setidentificationTypes(resultFNCTIPIDE);
    setParentezcoGrupoFamiliarSelect(resultFNCPAREN);
    if (props.FNCPERSON.ID) {
      setPerson(props.FNCPERSON);
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
    if (person && person.ID != null) {
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
          FECHA_NACIMIENTO: birthDate,
        });
        props.saveAnswerLocal(
          QuestionTypes.selectOne,
          QuestionConditionPersonCodes.GrupoEtnico,
          data.GrupoEtnico,
        );
      } catch (error) {
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
      item.FECHA_NACIMIENTO = birthDate;
      let inserted = await props.saveFNCPERSON(item);
      if (inserted && inserted.ID) {
        props.saveAnswerLocal(
          QuestionTypes.selectOne,
          QuestionConditionPersonCodes.GrupoEtnico,
          data.GrupoEtnico,
        );
      } else {
        Alert.alert(
          'Ocurrio un error',
          'Ocurrio un error al guardar persona por favor vuelva a intentar',
          [
            {
              text: 'aceptar',
            },
          ],
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
      //TODO validar solo numero de identificacion
      if (person && person.ID && person.IDENTIFICACION == identification) {
      } else if (identification && identificationType) {
        let item = await personService.getPersonbyIdentification(
          identification,
          identificationType,
        );
        if (item) {
          //valida que no exista en el nucleo familiar actual
          if (
            person &&
            !person.ID &&
            (await existingCurrentFNBNUCVIV(item.ID))
          ) {
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
          } else if (person && person.ID !== item.ID) {
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
  function validateRelationship(value: any) {
    if (
      person &&
      person.FNCPAREN_ID !== alreadyHeaderID &&
      value == alreadyHeaderID
    ) {
      Alert.alert(
        'Ya existe un cabeza de familia',
        'El nucleo familiar no puede tener mas de un cabeza de familia',
        [
          {
            text: 'aceptar',
          },
        ],
      );
      setParentezcoGrupoFamiliar('-1');
      setValue('parentezcoGrupoFamiliar', '');
    }
    //TODO Validar si la identificacion pertenece a mas de un nucleo no puede cambiar el parentezo
    //TODO validar si es la unica persona del nucleo debe ser cabeza de hogar
  }
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({onChange, value}) => (
          <BPicker
            label="Tipo de identificación"
            prompt="Seleccione una opción"
            error={errors.identificationType}
            onChange={(value) => {
              if (
                identificationEx &&
                identificationEx.find((i) => i.ID == identificationType)
              ) {
                if (!identificationEx.find((i) => i.ID == value)) {
                  setIdentification('');
                  onChange(value);
                  setIdentificationType(value);
                } else {
                  onChange(value);
                  setIdentificationType(value);
                }
              } else {
                if (identificationEx.find((i) => i.ID == value)) {
                  setIdentification('');
                  onChange(value);
                  setIdentificationType(value);
                } else {
                  onChange(value);
                  setIdentificationType(value);
                }
              }
            }}
            onLoad={() => {
              if (person && person.ID) {
                setValue('identificationType', '' + person.FNCTIPIDE_ID);
                setIdentificationType('' + props.FNCPERSON.FNCTIPIDE_ID);
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
          identificationEx.find((i) => i.ID == identificationType) ? (
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
              error={errors.identification}
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
          <BDatePickerModal
            maximumDate={new Date()}
            label="Fecha de nacimiento"
            error={errors.birthdate}
            onChange={(value: Date) => {
              onChange(value);
              if (value) {
                setbirthDate(value);
              }
            }}
            onLoad={() => {}}
            value={birthDate}
          />
        )}
        name="birthdate"
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
                validateRelationship(value);
              }
            }}
            // onLoad={async () => {
            //   let resultFNCPAREN = await personService.getSelectList('FNCPAREN');
            //   setParentezcoGrupoFamiliarSelect(resultFNCPAREN);
            // }}
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
      <View style={{display: 'flex', flexDirection: 'row', marginLeft: '20%'}}>
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
          value="Validar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
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
    paddingBottom: 50,
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
