import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View, Alert} from 'react-native';

interface State {
  value: string;
}
interface Props {
  label?: number;
  value?: number;
  validators?: number | number[];
  errorText?: number;
  error?: boolean;
  onChange?: any;
  keyboardType?: any;
  secureTextEntry?: any;
}

export default class BNumberInput extends Component<any, State> {
  state = {value: this.props.value ? this.props.value : ''};
  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          label={this.props.label}
          onFocus={() => this.focus}
          onBlur={() => this.blur}
          mode="outlined"
          //Aqui modifique el valor que se le envia al value a traves de props

          keyboardType="numeric"
          onChangeText={(text) => this.onChanged(text)}
          //onChangeText={(text) => this.props.onChange(text)}
          //value={this.props.onChange(this.state.myNumber)}
          value={this.state.myNumber}
          {...console.log(this.props.value)}
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
    this.setState({myNumber: newText});
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
  focus() {
    console.log('focus');
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  blur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }
}
