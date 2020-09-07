import React, {Component} from 'react';
import {RadioButton, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import BError from './BError';

interface State {
  selectedValue: string;
}
interface Props {
  items?: {label: string; value: string}[];
  onChange?: any;
  value?: string;
  label?: string;
  error?: boolean;
}
class BRadioButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedValue: this.props.value ? this.props.value : '',
    };
  }

  componentDidMount() {
    this.props.onChange(this.state.selectedValue);
    console.log('BRadioButton componentDidMount: ', this.state);
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
            value={this.state.selectedValue}
            onValueChange={(selectedValue) => {
              this.setState({selectedValue: selectedValue}, () =>
                this.props.onChange(selectedValue),
              );
            }}>
            {this.props.items?.map((item) => {
              return (
                <View>
                  <RadioButton.Item
                    style={styles.flexDirection}
                    label={item.label}
                    value={item.value}
                  />
                </View>
              );
            })}
          </RadioButton.Group>
        </View>
        <BError text="Campo Invalido" error={this.props.error} />
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
