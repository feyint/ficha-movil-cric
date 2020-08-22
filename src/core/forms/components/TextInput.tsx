import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {MergeRules} from '../rules';
import {BTextInput} from '../../components';
// TODO AJUSTAR ESTO POR AHORA NO ESTA IMPLEMENTADO
interface Props {
  form: object; // Formulario en que se pinta el control
  name: string; // Nombre del campo en el Formulario
  placeholder: string; // Texto de la etiqueta del campo en el Formulario
  rules: any; // Reglas de validación para el campo
  errorText?: string;
  error?: boolean;
  onChange?: any;
}
export default class TextInputBase extends Component<any, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rules: [],
    };
  }
  render() {
    return (
      <View>
        <Controller
          {...this.props}
          as={<BTextInput ref="textField" />}
          control={this.props.form.control}
          name={this.props.name}
          placeholder={this.props.placeholder}
          error={this.props.error}
          errorText={this.props.errorText}
          rules={this.state.rules}
          onChange={this.change}
        />
      </View>
    );
  }

  change(args: any) {
    if (this.props.onChange) {
      this.props.onChange(args);
    }
    console.log(args[0].nativeEvent.text);

    return args[0].nativeEvent.text;
  }

  focus() {
    if (this.props.onFocus()) {
      this.props.onFocus();
    }
  }
}
