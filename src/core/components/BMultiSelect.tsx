import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {withTheme} from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {MultiSelectSchema} from '../../modules/housing/state/types';

interface Props {
  label?: string;
  prompt?: string;
  value?: string;
  selectedItems?: any[];
  items?: MultiSelectSchema;
  errorText?: string;
  error?: boolean;
  onBlur?: any;
  onChange?: any;
  theme: any;
  enabled?: boolean;
}
interface State {
  selectedItems: any[];
}

class BMultiSelect extends Component<Props, State> {
  multiSelect: MultiSelect | null | undefined;
  constructor(props: Props) {
    super(props);
    //initialize a piece of state that we will also be persisting
    this.state = {
      selectedItems: this.props.selectedItems ? this.props.selectedItems : [],
    };
    if (this.state.selectedItems) {
      this.props.onChange(this.state.selectedItems);
    }
  }
  componentDidMount() {
    this.props.onChange(this.state.selectedItems);
    console.log('componentDidMount');
    if (this.state.selectedItems) {
    }
  }
  onSelectedItemsChange(selectedItems: any) {
    // do something with selectedItems
    this.props.onChange(selectedItems);
    this.setState({selectedItems: selectedItems});
    // console.log('Selected Items: ', this.state.selectedItems);
  }
  conConfirm(selectedItems: any) {
    // do something with selectedItems
    this.setState({selectedItems: selectedItems});
    this.props.onChange(this.state.selectedItems);
    // console.log('Selected Items: ', this.state.selectedItems);
  }
  render() {
    return (
      <View>
        <View>
          <SectionedMultiSelect
            expandDropDowns={true}
            items={[this.props.items]}
            uniqueKey="id"
            subKey="children"
            selectText={this.props.label}
            confirmText="Confirmar selección"
            selectedText="Seleccionados"
            searchPlaceholderText={this.props.prompt}
            noResultsComponent={this.renderNoResults()}
            styles={{
              selectToggle: this.props.error
                ? styles.containerError
                : styles.container,
              button: {
                backgroundColor: this.props.theme.colors.secondary,
              },
            }}
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={(selectedItems) =>
              this.onSelectedItemsChange(selectedItems)
            }
            selectedItems={this.state.selectedItems}
          />
        </View>
        {this.props.error ? (
          <HelperText type="error">
            {this.props.errorText ? this.props.errorText : 'Campo invalido'}
          </HelperText>
        ) : null}
      </View>
    );
  }
  renderNoResults() {
    return (
      <Text style={styles.noText}>No hay resultados para esa palabra.</Text>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  containerError: {
    padding: 10,
    color: 'red',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  noText: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    color: 'black',
  },
  pickerdisabled: {
    color: 'gray',
  },
});

export default withTheme(BMultiSelect);
