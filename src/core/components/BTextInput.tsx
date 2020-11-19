import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
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
  render() {
    return (
      <View style={styles.container1}>
        <TextInput
          style={styles.input}
          error={this.props.error}
          secureTextEntry={this.props.isPassword ? true : false}
          mode={this.props.mode ? this.props.mode : 'outline'}
          label={this.props.label}
          onChangeText={(text) => this.props.onChange(text)}
          value={this.props.value}
          disabled={this.props.disabled}
          multiline={this.props.multiline}
          numberOfLines={this.props.numberOfLines}
          contextMenuHidden={false}
          maxLength={50}
          underlineColorAndroid='transparent'
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
  container1:{
    justifyContent: 'center',

  },
  input: {
    borderRadius: 5,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
    height: 60,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor : "#FFFFFF"
  },
});
