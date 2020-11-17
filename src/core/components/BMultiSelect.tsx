import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {withTheme} from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {MultiSelectSchema} from '../utils/types';

interface Props {
  label?: string;
  prompt?: string;
  value?: string;
  selectedItems?: any[];
  items?: MultiSelectSchema;
  errorText?: string;
  error?: any;
  onBlur?: any;
  onChange?: any;
  onLoad?: any;
  theme: any;
  enabled?: boolean;
  single?: boolean;
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
    // if (this.state.selectedItems) {
    //   this.props.onChange(this.state.selectedItems);
    // }
  }
  UNSAFE_componentWillMount() {
    if (this.props.onLoad) {
      this.props.onLoad(true);
    }
  }
  onSelectedItemsChange(selectedItems: any) {
    this.props.onChange(selectedItems);
    this.setState({selectedItems: selectedItems});
  }
  conConfirm(selectedItems: any) {
    this.setState({selectedItems: selectedItems});
    this.props.onChange(this.state.selectedItems);
  }
  render() {
    return (
      <View style={styles.spacer}>
        <View>
          <SectionedMultiSelect
            single={this.props.single ? this.props.single : false}
            expandDropDowns={true}
            items={this.props.items ? [this.props.items] : []}
            uniqueKey="id"
            subKey="children"
            selectText={this.props.label}
            confirmText="Confirmar selección"
            selectedText="Seleccionados"
            searchPlaceholderText={
              this.props.prompt ? this.props.prompt : 'Seleccione una opción'
            }
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
            selectedItems={this.props.selectedItems}
          />
        </View>
        {this.props.error ? (
          <HelperText type="error">
            {this.props.errorText
              ? this.props.errorText
              : 'El campo es requerido'}
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
  public setSelectedItem(selectedItems: any[]) {}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  spacer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  containerError: {
    backgroundColor: 'white',
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
