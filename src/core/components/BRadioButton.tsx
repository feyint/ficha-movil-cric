import React, {Component} from 'react';
import {RadioButton, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import BError from './BError';

interface Props {
  items?: {label: string; value: any}[];
  onChange?: any;
  value: any;
  label?: string;
  error?: boolean;
}
class BRadioButton extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  renderLabel() {
    return (
      <View>
        <Text>
          {this.props.label ? this.props.label : 'Seleccione una opción'}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View>
        {this.renderLabel()}
        <View style={styles.flexDirection}>
          <RadioButton.Group
            value={'' + this.props.value}
            onValueChange={(selectedValue) => {
              this.props.onChange(selectedValue);
            }}>
            {this.props.items && this.props.items.length > 0
              ? this.props.items.map((item) => {
                  return (
                    <View>
                      <RadioButton.Item
                        key={'' + item.value}
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
        <BError text="El campo es requerido" error={this.props.error} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
  },
});

export default BRadioButton;
