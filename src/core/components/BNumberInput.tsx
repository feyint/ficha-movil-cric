import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View} from 'react-native';


interface Props {
  label?: string;
  value?: string;
  error?: any;
  onChange?: any;
  keyboardType?: any;
  disabled?: boolean;
  secureTextEntry?: any;
  onBlur?: any;
}

export default class BNumberInput extends Component<Props, any> {
  render() {
    return (
      <View>
        <TextInput
          onBlur={() => this.props.onBlur()}
          error={this.props.error}
          label={this.props.label}
          mode="outlined"
          disabled={this.props.disabled}
          keyboardType="numeric"
          onChangeText={(text) => {
            this.props.onChange(text);
          }}
          value={this.props.value}
        />
        {this.props.error ? (
          <HelperText type="error">
            {this.props.error.type
              ? this.props.error.type
              : 'El campo es requerido'}
          </HelperText>
        ) : null}
      </View>
    );
  }
}
