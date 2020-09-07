import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View} from 'react-native';

interface State {
  value: string;
}
interface Props {
  label?: string;
  value?: string;
  errorText?: number;
  error?: boolean;
  onChange?: any;
  keyboardType?: any;
  secureTextEntry?: any;
}

export default class BNumberInput extends Component<Props, State> {
  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          label={this.props.label}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(text) => this.onChanged(text)}
          value={this.props.value}
        />
        <HelperText type="error" visible={this.hasErrors()}>
          {this.props.errorText}
        </HelperText>
      </View>
    );
  }

  onChanged(text: any) {
    let newText = '';
    let numbers = '0123456789';
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        //Alert.alert('Porfavor ingrese solo caracteres numericos');
      }
    }
    this.props.onChange(text);
  }

  changetext(text: string) {
    //No me acepta numericos
    this.setState({value: text});
    this.props.onChange(this.state.value);
  }
  hasErrors() {
    return this.props.error === true;
  }
}
