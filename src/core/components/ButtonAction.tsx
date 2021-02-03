import React, {Component} from 'react';
import {withTheme} from 'react-native-paper';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import {BButton} from '.';
import {theme} from '../style/theme';
interface Props {
  theme: any;
  onCancel: any;
  onAccept: any;
  message?: string;
  title?: string;
  cancelMsg?: string;
  acceptMsg?: string;
}
class ButtonAction extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.alert();
    return true;
  }
  alert() {
    Alert.alert(
      this.props.title ? this.props.title : 'Los datos no han sido guardados',
      this.props.message ? this.props.message : ' ¿Desea salir?',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {text: 'SI', onPress: () => this.props.onCancel()},
      ],
      {cancelable: false},
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <BButton
          style={styles.aceptButon}
          color="secondary"
          value={this.props.cancelMsg ? this.props.cancelMsg : 'Cancelar'}
          onPress={() => this.alert()}
        />
        <BButton
          style={styles.cancelButon}
          color="secondary"
          value={this.props.acceptMsg ? this.props.acceptMsg : 'Aceptar'}
          onPress={() => this.props.onAccept()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  container: {
    width: '100%',
    marginTop: 15,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  aceptButon: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
  },
  cancelButon: {
    backgroundColor: theme.colors.primary,
  },
});
export default withTheme(ButtonAction);
