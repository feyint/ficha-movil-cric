import React, {Component} from 'react';
import {withTheme} from 'react-native-paper';
import {Alert, StyleSheet, View} from 'react-native';
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
  alert() {
    Alert.alert(
      this.props.title ? this.props.title : '',
      this.props.message ? this.props.message : '¿Desea cancelar el proceso?',
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
    marginTop: 15,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  aceptButon: {
    width: '50%',
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
  },
  cancelButon: {
    width: '50%',
    backgroundColor: theme.colors.primary,
    color: 'red',
  },
});
export default withTheme(ButtonAction);
