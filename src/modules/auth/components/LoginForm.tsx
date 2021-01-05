import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers';
import * as yup from 'yup';
import {BButton, BTextInput} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {authAction} from '../state/actions';
import {Snackbar} from 'react-native-paper';
import {useEffect} from 'react';

const schemaForm = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
const _LoginForm = (props: any) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors} = useForm({
    resolver: yupResolver(schemaForm),
  });

  const [visible, setVisible] = React.useState(false);
  const onSubmit = (data: any) => {
    const res = props.authAction(data);
    if (res) {
      navigation.navigate('MenuHome');
    } else {
      setVisible(!visible);
    }
  };
  useEffect(() => {
    navigation.navigate('MenuHome');
  }, []);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <View style={styles.container1}>
      <KeyboardAwareScrollView>
        <Controller
          control={control}
          render={({onChange, value}) => (
            <BTextInput
              label="Usuario"
              error={errors.username}
              onChange={(value: any) => onChange(value)}
              value={value}
            />
          )}
          name="username"
        />
        <View style={styles.container}>
          <Controller
            control={control}
            render={({onChange, value}) => (
              <BTextInput
                secureTextEntry
                isPassword
                label="Contraseña"
                error={errors.password}
                onChange={(value: any) => onChange(value)}
                value={value}
              />
            )}
            name="password"
          />
        </View>
        <View style={styles.container}>
          <BButton
            color="primary"
            value="Iniciar Sesión"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAwareScrollView>
      <Snackbar duration={3000} visible={visible} onDismiss={onDismissSnackBar}>
        Usuario o contraseña incorrecta
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  container1: {
    padding: 15,
    //width: '60%',
    //marginHorizontal: '20%',
    marginVertical: '20%',
    marginHorizontal: '4%',
    height: '20%',
    borderRadius: 20,
    //alignItems: 'center',
    backgroundColor: '#C6CDCD',
    //marginTop: 10,
  },
});
const mapDispatchToProps = {
  authAction,
};
export default connect(null, mapDispatchToProps)(_LoginForm);
