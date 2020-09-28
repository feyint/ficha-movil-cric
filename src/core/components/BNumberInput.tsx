import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View} from 'react-native';


interface Props {
  label?: string;
  value?: string;
  errorText?: number;
  error?: boolean;
  onChange?: any;
  keyboardType?: any;
  secureTextEntry?: any;
}

export default class BNumberInput extends Component<Props, any> {
  render() {
    return (
      <View>
        <TextInput
          error={this.props.error}
          label={this.props.label}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => {
            this.props.onChange(text);
          }}
          value={this.props.value}
        />
        {this.props.error ? (
          <HelperText type="error">
            {this.props.errorText
              ? this.props.errorText
              : 'El campo es requerido'}
          </HelperText>
        ) : null}
      </View>
    );
  }
}
