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
  ButtonAction,
} from '../../../../core/components';
import BNumberInput from '../../../../core/components/BNumberInput';
import {setFNCPERSON} from '../../../../state/person/actions';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';
import {
  getQuestionAnswer,
  getQuestionWithOptions,
  saveAnswerLocal,
} from '../../../../state/ConditionPerson/actions';
import {PersonParametersConst} from '../../../../core/utils/SystemParameters';
import {theme} from '../../../../core/style/theme';
import {
  useFNBNUCVIV,
  useFNBNUCVIV_FNCPERSON,
  useFNCCONPER,
  useFNCGENERO,
  useFNCPAREN,
  useFNCPERSON,
  useFNCPERSON_FNCCONPER,
  useFNCTIPIDE,
} from '../../../../hooks';
import {getSelectSchema} from '../../../../core/utils/utils';
import {FNCCONPER, FNCPERSON} from '../../../../types';
import moment from 'moment';
import {FieldValidator} from '../../../../providers';

const schemaForm = yup.object().shape({
  parentezcoGrupoFamiliar: FieldValidator.required(
    yup,
    'Parentezco en el grupo familiar',
  ),
  firstname: FieldValidator.required(yup, 'Primer nombre'),
  middlename: yup.string().optional(),
  lastname: FieldValidator.required(yup, 'Primer apellido'),
  secondlastname: yup.string().optional(),
  identification: yup.string().optional(),
  identificationType: FieldValidator.required(yup, 'Tipo de identificacion'),
  gender: FieldValidator.required(yup, 'Genero'),
  GrupoEtnico: FieldValidator.required(yup, 'Grupo etnico'),
  birthdate: FieldValidator.required(yup, 'Fecha de nacimiento'),
});
const _PersonalInformationForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors, setValue} = useForm({
    resolver: yupResolver(schemaForm),
  });
  const [editable, setEditable] = useState(false);
  const [person, setPerson] = useState<FNCPERSON>();
  const [identificationEx, setidentificationEx] = useState<any[]>([]);
  const [gender, setGender] = useState<any>();
  const [alreadyHeaderID, setalreadyHeaderID] = useState<number>(0);
  const [identification, setIdentification] = useState('');
  const [identificationType, setIdentificationType] = useState<any>();
  const [grupoEtnico, setGrupoEtnico] = useState<any>();
  const [parentezcoGrupoFamiliar, setParentezcoGrupoFamiliar] = useState<any>();
  const [birthDate, setbirthDate] = useState<Date>(new Date());
  const {listFNCTIPIDE, getAllFNCTIPIDE} = useFNCTIPIDE();
  const {listFNCGENERO, getAllFNCGENERO} = useFNCGENERO();
  const {listFNCPAREN, getAllFNCPAREN} = useFNCPAREN();
  const {alreadyexistParent} = useFNBNUCVIV();
  const {listFNCCONPER, getQuestionsOptions} = useFNCCONPER();
  const {validateExist, createFNBNUCVIV_FNCPERSON} = useFNBNUCVIV_FNCPERSON();
  const {
    itemFNCPERSON,
    createFNCPERSON,
    updateFNCPERSON,
    getByIdentification,
    existbyIdentification,
  } = useFNCPERSON();
  const {saveAnswer, getAnswerquestion} = useFNCPERSON_FNCCONPER();
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    let idtypeEx: any[] = [];
    listFNCTIPIDE.forEach((item) => {
      if (
        item &&
        PersonParametersConst.identificationType.indexOf(item.CODIGO) !== -1
      ) {
        idtypeEx.push(item);
      }
    });
    setidentificationEx(idtypeEx);
  }, [listFNCTIPIDE]);
  useEffect(() => {
    if (listFNCCONPER) {
      if (props.FNCPERSON.ID) {
        setPerson(props.FNCPERSON);
        getAnswers(QuestionConditionPersonCodes.GrupoEtnico, 'GrupoEtnico');
      }
    }
  }, [listFNCCONPER]);
  useEffect(() => {
    if (itemFNCPERSON) {
      props.setFNCPERSON(itemFNCPERSON);
      navigation.goBack();
    }
  }, [itemFNCPERSON]);
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
      setValue('birthdate', moment(person.FECHA_NACIMIENTO).toDate());
      if (person.FECHA_NACIMIENTO) {
        setbirthDate(moment(person.FECHA_NACIMIENTO).toDate());
      }
      setValue('parentezcoGrupoFamiliar', '' + props.FNCPERSON.FNCPAREN_ID);
      setParentezcoGrupoFamiliar('' + props.FNCPERSON.FNCPAREN_ID);
      setValue('identificationType', '' + props.FNCPERSON.FNCTIPIDE_ID);
      setIdentificationType('' + props.FNCPERSON.FNCTIPIDE_ID);
      setValue('gender', '' + props.FNCPERSON.FNCGENERO_ID);
      setGender('' + props.FNCPERSON.FNCGENERO_ID);
      // getAnswers(QuestionConditionPersonCodes.GrupoEtnico, 'GrupoEtnico');
    }
  }, [person]);
  const fetchQuestions = async () => {
    getAllFNCTIPIDE();
    getAllFNCGENERO();
    getAllFNCPAREN();
    getQuestionsOptions([QuestionConditionPersonCodes.GrupoEtnico]);
    let alreadyexistheader = await alreadyexistParent(props.FNBNUCVIV.ID);
    if (alreadyexistheader) {
      setalreadyHeaderID(alreadyexistheader);
    }
  };
  const onSubmit = async (data: any) => {
    if (person && person.ID != null) {
      let item: FNCPERSON = {
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
      };
      await updateFNCPERSON(item);
      await props.setFNCPERSON(item);
      SaveAnswers(QuestionConditionPersonCodes.GrupoEtnico, data.GrupoEtnico);
    } else {
      let item: FNCPERSON = {
        PRIMER_NOMBRE: data.firstname,
        SEGUNDO_NOMBRE: data.middlename ? data.middlename : '',
        PRIMER_APELLIDO: data.lastname,
        SEGUNDO_APELLIDO: data.secondlastname ? data.secondlastname : '',
        IDENTIFICACION: data.identification,
        FNCTIPIDE_ID: JSON.parse(data.identificationType),
        FNCGENERO_ID: JSON.parse(data.gender),
        FNCPAREN_ID: JSON.parse(data.parentezcoGrupoFamiliar),
        FECHA_NACIMIENTO: birthDate,
      };
      let inserted = await createFNCPERSON(item, props.FNBNUCVIV.ID);
      if (inserted) {
        await props.setFNCPERSON(inserted);
        await SaveAnswers(
          QuestionConditionPersonCodes.GrupoEtnico,
          data.GrupoEtnico,
          1,
          inserted.ID,
        );
      }
    }
  };
  async function asociateExistingPerson(item: FNCPERSON) {
    let asociated = await createFNBNUCVIV_FNCPERSON({
      FNBNUCVIV_ID: props.FNBNUCVIV.ID,
      FNCPERSON_ID: item.ID,
    });
    if (asociated) {
      props.setFNCPERSON(item);
      setPerson(item);
      // await refreshPerson(item);
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
  function onChangeIdentification() {
    const delayDebounceFn = setTimeout(async () => {
      //TODO validar solo numero de identificacion
      if (person && person.ID && person.IDENTIFICACION == identification) {
      } else if (identification && identificationType) {
        let item = await getByIdentification(
          identificationType,
          identification,
        );
        if (item) {
          //valida que no exista en el nucleo familiar actual
          let exist = await validateExist(props.FNBNUCVIV.ID, item.ID);
          if (exist) {
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
          } else if (!person && item.ID) {
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
                /* `La persona ${item.PRIMER_NOMBRE} ${item.SEGUNDO_NOMBRE} ${item.PRIMER_NOMBRE} ${item.SEGUNDO_APELLIDO} \ncon identificación ${item.IDENTIFICACION} ya esta asociada a un nucleo familiar \npara asociarlo a este debe tener el parentesco "CABEZA DE FAMILIA"`, */
                'Los datos registrados ya existen en el sistema',
                [
                  {
                    text: 'aceptar',
                  },
                ],
              );
            }
          }
        } else {
          let existDocument = await existbyIdentification(identification);
          if (existDocument) {
            Alert.alert('', 'Los datos registrados ya existen en el sistema', [
              {
                text: 'aceptar',
              },
            ]);
            setIdentification('');
          }
        }
      }
    }, 1000);
    return delayDebounceFn;
  }
  const validateIdentification = () => {
    if (
      (identificationType !== 4 || identificationType !== 7) &&
      identification != ''
    ) {
      Alert.alert(
        'Identificación Requerida',
        `El tipo de identificación ${identificationType} es necesario, \n Valide la información.. ident ${identification}`,
        [
          {
            text: 'aceptar',
          },
        ],
        {cancelable: false},
      );
      return true;
    } else {
      return false;
    }
  };
  function validateRelationship(value: any) {
    let isValid = true;
    if (
      person &&
      person.FNCPAREN_ID !== alreadyHeaderID &&
      value == alreadyHeaderID
    ) {
      isValid = false;
    } else if (!person && value == alreadyHeaderID) {
      isValid = false;
    }
    if (!isValid) {
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
  async function getAnswers(
    questionCode: string,
    prop: string,
    type: 1 | 2 = 1,
  ) {
    let question = listFNCCONPER.find((item: FNCCONPER) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      const {ID} = props.FNCPERSON;
      let ans = await getAnswerquestion(ID, question.FNCELEPER_ID, type);
      if (ans) {
        if (type == 1) {
          setValue(prop, '' + ans);
        } else {
          setValue(prop, ans);
        }
      }
    }
  }
  async function SaveAnswers(
    questionCode: string,
    answer: any,
    type: 1 | 2 = 1,
    personid = 0,
  ) {
    let question = listFNCCONPER.find((item: FNCCONPER) => {
      return item.QUESTIONCODE === questionCode;
    });
    if (question) {
      let ID = props.FNCPERSON.ID;
      if (personid > 0) {
        ID = personid;
      }
      saveAnswer(type, answer, ID, question.FNCELEPER_ID);
    }
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
              console.error(`tipo de identificacion value igual a ${value}`);
              setEditable(true);
              if (
                identificationEx &&
                identificationEx.find((i) => i.ID == identificationType)
              ) {
                if (!identificationEx.find((i) => i.ID == value)) {
                  setIdentification('');
                } else if (value == 4 || value == 7) {
                  // adulto sin ID o menor sin ID
                  setIdentification(
                    `${Math.floor(Math.random() * 100000) + 10000}I${Math.floor(Math.random() * 10000) + 1000}`,
                  );
                }
              } else {
                if (identificationEx.find((i) => i.ID == value)) {
                  setIdentification('');
                } else if (value == 4 || value == 7) {
                  setIdentification(
                    `${Math.floor(Math.random() * 100000) + 10000}I${Math.floor(Math.random() * 10000) + 1000}`,
                  );
                }
              }
              onChange(value);
              setIdentificationType(value);
            }}
            onLoad={() => {}}
            selectedValue={identificationType}
            items={getSelectSchema(listFNCTIPIDE).sort(function (a, b) {
              if (a.label == b.label) return 0;
              if (a.label == 'Seleccione') return -1;
              if (b.label == 'Seleccione') return 1;

              if (a.label < b.label) return -1;
              if (a.label > b.label) return 1;
              return 0;
            })}
          />
        )}
        name="identificationType"
      />
      <Controller
        control={control}
        render={({onChange, value}) =>
          identificationEx.find((i) => i.ID == identificationType) ? (
            <BNumberInput
              keyboardType="number"
              label="Número de identificación"
              error={errors.identification}
              onChange={(value) => {
                setEditable(true);
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
                setEditable(true);
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
              setEditable(true);
              onChange(value);
              setGender(value);
            }}
            onLoad={() => {}}
            selectedValue={gender}
            items={getSelectSchema(listFNCGENERO)}
          />
        )}
        name="gender"
      />
      <Controller
        control={control}
        render={({onChange, value}) => (
          <BDatePickerModal
            maximumDate={new Date()}
            label="*Fecha de nacimiento"
            error={errors.birthdate}
            onChange={(value: Date) => {
              setEditable(true);
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
            onChange={(value) => {
              //value = value.replace(/\s/g, '');
              setEditable(true);
              onChange(value);
            }}
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
            onChange={(value) => {
              setEditable(true);
              onChange(value);
            }}
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
            onChange={(value) => {
              setEditable(true);
              onChange(value);
            }}
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
            onChange={(value) => {
              setEditable(true);
              onChange(value);
            }}
            value={value}
          />
        )}
        name="secondlastname"
      />
      <Controller //Parentezco en el grupo familiar
        control={control}
        render={({onChange, onBlur, value}) => (
          <BPicker
            label="Parentesco en el grupo familiar"
            prompt="Selecione una opcion"
            onBlur={onBlur}
            error={errors.parentezcoGrupoFamiliar}
            onChange={(value: any) => {
              setEditable(true);
              if (value) {
                onChange(value);
                setParentezcoGrupoFamiliar(value);
                validateRelationship(value);
              }
            }}
            selectedValue={parentezcoGrupoFamiliar}
            items={getSelectSchema(listFNCPAREN)}
          />
        )}
        name="parentezcoGrupoFamiliar"
      />
      <Controller //GrupoEtnico
        control={control}
        render={({onChange, onBlur, value}) => (
          <BPicker
            label={'Grupo étnico'}
            onBlur={onBlur}
            error={errors.GrupoEtnico}
            onChange={(value: any) => {
              setEditable(true);
              onChange(value);
              if (value) {
                setGrupoEtnico(value);
              }
            }}
            onLoad={() => {}}
            selectedValue={value}
            items={getSelectSchema(listFNCCONPER)}
          />
        )}
        name="GrupoEtnico"
      />
      <ButtonAction
        onAccept={handleSubmit(onSubmit)}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingBottom: 50,
  },
});

const mapStateToProps = (state: any) => {
  return {
    FNCPERSON: state.person.FNCPERSON,
    FNBNUCVIV: state.housing.FNBNUCVIV,
  };
};
const mapDispatchToProps = {
  getQuestionWithOptions,
  saveAnswerLocal,
  getQuestionAnswer,
  setFNCPERSON,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(_PersonalInformationForm);
