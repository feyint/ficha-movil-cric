import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {Alert, Clipboard, StyleSheet, View} from 'react-native';
import BError from './BError';

interface State {
  value: string;
}
interface Props {
  mode?: 'flat' | 'outlined';
  label?: string;
  value?: string;
  error?: any;
  onChange?: any;
  keyboardType?: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  isPassword?: boolean;
  onBlur?: any;
  icon?: any;
  contextMenuHidden?: boolean;
  maxLength?: any;
}
export default class BTextInput extends Component<Props, State> {
  /* handleOnPaste = (content: any) => {
    Alert.alert('No es valido pegar contenido');
    //return true;
  }; */

  handleOnChangeText = async (content: any) => {
    console.log('entro al handle');
    if (content === '') return true;
    const copiedContent = await Clipboard.getString();

    if (copiedContent === '') return true;
    const isPasted = content.includes(copiedContent);
    if (isPasted) {
      Alert.alert('No es valido pegar contenido');
      return false;
    } else {
      return true;
    }
  };
  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          error={this.props.error}
          secureTextEntry={this.props.isPassword ? true : false}
          mode={this.props.mode ? this.props.mode : 'outlined'}
          label={this.props.label}
          onChangeText={async (text) => {
            this.handleOnChangeText(text);
            //(await this.handleOnChangeText(text)) === true ? null : (text = '');
            //this.handleOnPaste(text) ? (text = '') : null;
            text = text.replace(/\s/g, '');
            this.props.onChange(text);
          }}
          value={this.props.value}
          disabled={this.props.disabled}
          multiline={this.props.multiline}
          numberOfLines={this.props.numberOfLines}
          contextMenuHidden={false}
          maxLength={50}
        />
        {this.props.error ? (
          <HelperText type="error">
            {this.props.error
              ? this.props.error.message
              : 'El campo es requerido'}
          </HelperText>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    backgroundColor: '#ffff',
  },
});
