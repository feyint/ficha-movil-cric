import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

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
          style={styles.container}
          error={this.props.error}
          label={this.props.label}
          mode="outlined"
          disabled={this.props.disabled}
          keyboardType="numeric"
          onChangeText={(text) => {
            this.props.onChange(text);
          }}
          onBlur={this.props.onBlur ? this.props.onBlur() : null}
          value={this.props.value}
          maxLength={50}
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
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
