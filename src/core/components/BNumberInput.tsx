import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import BError from './BError';

interface Props {
  label?: string;
  maxLength?: number;
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
          selectTextOnFocus={false}
          style={styles.container}
          error={this.props.error}
          label={this.props.label}
          disabled={this.props.disabled}
          keyboardType="numeric"
          onChangeText={(text) => {
            text = text.replace(/\s/g, '');
            text = text.replace(/[^\d.]/g, '');
            this.props.onChange(text);
          }}
          onBlur={this.props.onBlur ? this.props.onBlur() : null}
          value={this.props.value}
          maxLength={this.props.maxLength ? this.props.maxLength : 50}
        />
        <BError error={this.props.error} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
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
  },
});
