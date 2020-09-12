import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View} from 'react-native';

interface State {
  value: string;
}
interface Props {
  mode?: 'flat' | 'outlined';
  label?: string;
  value?: string;
  validators?: string | string[];
  errorText?: string;
  error?: boolean;
  onChange?: any;
  onBlur?: any;
  keyboardType?: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}
export default class BTextInput extends Component<Props, State> {
  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          mode={this.props.mode ? this.props.mode : 'outlined'}
          label={this.props.label}
          onBlur={this.props.onBlur}
          onChangeText={(text) => this.props.onChange(text)}
          value={this.props.value}
          disabled={this.props.disabled}
          multiline={this.props.multiline}
          numberOfLines={this.props.numberOfLines}
        />
        {this.props.error ? (
          <HelperText type="error">
            {this.props.errorText ? this.props.errorText : 'El campo es requerido'}
          </HelperText>
        ) : null}
      </View>
    );
  }
}
