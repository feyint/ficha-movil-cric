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

const schemaForm = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
const _LoginForm = (props) => {
  const navigation = useNavigation();
  const {handleSubmit, control, errors} = useForm({
    resolver: yupResolver(schemaForm),
  });
  React.useEffect(() => {
    const res = props.authAction({username: 'test', password: 's'});
    if (res) {
      navigation.navigate('MenuHome');
    } else {
      setVisible(!visible);
    }
  }, [])
  const [visible, setVisible] = React.useState(false);
  const onSubmit = (data: any) => {
    const res = props.authAction(data);
    if (res) {
      navigation.navigate('MenuHome');
    } else {
      setVisible(!visible);
    }
  };
  const onDismissSnackBar = () => setVisible(false);
  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BTextInput
                label="Usuario"
                onBlur={onBlur}
                error={errors.username}
                onChange={(value) => onChange(value)}
                value={value}
              />
            )}
            name="username"
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <BTextInput
                secureTextEntry={true}
                label="Contraseña"
                onBlur={onBlur}
                error={errors.password}
                onChange={(value) => onChange(value)}
                value={value}
              />
            )}
            name="password"
          />
          <View>
            <BButton
              color="primary"
              value="Iniciar Sesión"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Snackbar duration={3000} visible={visible} onDismiss={onDismissSnackBar}>
        Usuario o contraseña incorrecta
      </Snackbar>
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
  },
});
const mapDispatchToProps = {
  authAction,
};
export default connect(null, mapDispatchToProps)(_LoginForm);
