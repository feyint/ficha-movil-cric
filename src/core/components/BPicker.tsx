import React, {Component} from 'react';
import {HelperText, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {withTheme} from 'react-native-paper';
import {BError, BLabel} from '.';
import {theme} from '../style/theme';

interface Props {
  label?: string;
  prompt?: string;
  selectedValue?: string;
  items?: {label: string; value: string; item?: any}[];
  errorText?: string;
  error?: any;
  onBlur?: any;
  onChange?: any;
  onLoad?: any;
  theme: any;
  enabled?: boolean;
  style?: any;
}

class BPicker extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad(true);
    }
  }
  renderItems() {
    let listItems: any = [];
    if (this.props && this.props.items && this.props.items.length > 0) {
      this.props.items.forEach((item) => {
        listItems.push(
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />,
        );
      });
    }
    return listItems;
  }
  renderLabel() {
    return (
      <BLabel>
        {this.props.label ? this.props.label : 'Seleccione una opción'}
      </BLabel>
    );
  }
  render() {
    return (
      this.props.items && (
        <View style={[styles.vieww, this.props.style]}>
          <Text>{this.renderLabel()}</Text>
          <View
            style={this.props.error ? styles.containerError : styles.container}>
            <Picker
              mode="dropdown"
              prompt={
                this.props.prompt ? this.props.prompt : 'Seleccione una opción'
              }
              enabled={this.props.enabled}
              selectedValue={this.props.selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                if (
                  itemValue === '-1' ||
                  itemValue === '' ||
                  itemValue === null
                ) {
                  this.props.onChange(null);
                } else {
                  this.props.onChange(itemValue);
                }
              }}
              style={
                this.props.enabled && !this.props.enabled
                  ? styles.pickerdisabled
                  : styles.picker
              }>
              {this.renderItems()}
            </Picker>
          </View>
          <BError error={this.props.error} />
        </View>
      )
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 8,
    marginBottom: 5,
    color: 'black',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 2,
  },
  vieww: {
    margin: 2,
  },
  containerError: {
    backgroundColor: 'white',
    color: 'red',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  picker: {
    color: 'black',
  },
  pickerdisabled: {
    color: 'gray',
  },
  label: {
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
});

export default withTheme(BPicker);
