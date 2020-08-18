import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View} from 'react-native';

interface State {
  value: string;
}
interface Props {
  label?: string;
  value?: string;
  validators?: string | string[];
  errorText?: string;
  error?: boolean;
  onChange?: any;
  keyboardType?: any;
  secureTextEntry?: any;
}
export default class BTextInput extends Component<any, State> {
  state = {value: this.props.value ? this.props.value : ''};
  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          label={this.props.label}
          onFocus={() => this.focus}
          onBlur={() => this.blur}
          onChangeText={(text) => this.props.onChange(text)}
        />
        <HelperText type="error" visible={this.hasErrors()}>
          {this.props.errorText}
        </HelperText>
      </View>
    );
  }
  changetext(text: string) {
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
