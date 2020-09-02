import React, {Component} from 'react';
import {HelperText} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {withTheme} from 'react-native-paper';
import BError from './BError';

interface Props {
  label?: string;
  prompt?: string;
  value?: string;
  selectedValue?: string;
  items?: {label: string; value: string; item?: any}[];
  errorText?: string;
  error?: boolean;
  onBlur?: any;
  onChange?: any;
  theme: any;
  enabled?: boolean;
}
interface State {
  selectedValue: string;
}

class BPicker extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    //initialize a piece of state that we will also be persisting
    this.state = {
      selectedValue: this.props.selectedValue ? this.props.selectedValue : '',
    };
    if (this.state.selectedValue) {
      this.props.onChange(this.state.selectedValue);
    }
  }
  componentDidMount() {
    this.props.onChange(this.state.selectedValue);
    console.log('componentDidMount');
    if (this.state.selectedValue) {
    }
  }
  renderItems() {
    let listItems: any = [];
    if (this.props.items) {
      this.props.items.forEach((item) => {
        listItems.push(<Picker.Item label={item.label} value={item.value} />);
      });
    }
    return listItems;
  }
  render() {
    return (
      <View>
        <View
          style={this.props.error ? styles.containerError : styles.container}>
          <Picker
            mode="dropdown"
            prompt={this.props.prompt}
            enabled={this.props.enabled}
            selectedValue={this.state.selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedValue: itemValue}, () =>
                this.props.onChange(itemValue),
              );
            }}
            style={this.props.enabled ? styles.picker : styles.pickerdisabled}
            onBlur={this.props.onBlur}>
            {this.renderItems()}
          </Picker>
        </View>
        <BError text="Campo Invalido" error={this.props.error} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  containerError: {
    color: 'red',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  picker: {
    color: 'black',
  },
  pickerdisabled: {
    color: 'gray',
  },
});

export default withTheme(BPicker);
