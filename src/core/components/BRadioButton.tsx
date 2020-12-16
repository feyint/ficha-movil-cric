import React, {Component} from 'react';
import {HelperText, RadioButton, Text, withTheme} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import BError from './BError';
import {theme} from '../style/theme';
import {BLabel} from '.';

interface Props {
  items?: {label: string; value: any}[];
  onChange?: any;
  value: any;
  label?: string;
  error?: any;
  theme: any;
}
class BRadioButton extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    if (props.value && props.onChange && props.value.length > 0) {
      props.onChange(props.value);
    }
  }
  renderLabel() {
    return <BLabel>{this.props.label}</BLabel>;
  }
  render() {
    return (
      <View>
        {this.renderLabel()}
        <View style={styles.flexDirection}>
          <RadioButton.Group
            key={`${Math.round(Math.random() * 10000000)}`}
            value={'' + this.props.value}
            onValueChange={(selectedValue) => {
              this.props.onChange(selectedValue);
            }}>
            {this.props.items && this.props.items.length > 0
              ? this.props.items.map((item) => {
                  return (
                    <View>
                      <RadioButton.Item
                        key={`${Math.round(Math.random() * 10000000)}-${
                          item.value
                        }`}
                        style={styles.flexDirection}
                        label={item.label}
                        value={'' + item.value}
                      />
                    </View>
                  );
                })
              : null}
          </RadioButton.Group>
        </View>
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
  flexDirection: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
});

export default withTheme(BRadioButton);
