import React, {Component} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {View, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {withTheme} from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {MultiSelectSchema} from '../utils/types';
import BLabel from './BLabel';
import {BError} from '.';

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
  items?: any[];
}

class BMultiSelect extends Component<Props, State> {
  multiSelect: MultiSelect | null | undefined;
  constructor(props: Props) {
    super(props);

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
    //No aplica
    let items: any = this.props.items?.children;
    for (let e = 0; e < selectedItems.length; e++) {
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if (
          element.id == selectedItems[e] &&
          (element.name.includes('No aplica') ||
            (element.CODIGO && element.CODIGO.includes('NA')))
        ) {
          selectedItems = [selectedItems[e]];
        }
      }
    }
    this.props.onChange(selectedItems);
    this.setState({selectedItems: selectedItems});
  }
  conConfirm(selectedItems: any) {
    this.setState({selectedItems: selectedItems});
    this.props.onChange(this.state.selectedItems);
  }
  renderLabel() {
    return <BLabel>{this.props.label}</BLabel>;
  }
  render() {
    const items: any = this.props.items ? {...this.props.items} : null;
    if (items) {
      items.children = items.children.sort((a: any, b: any) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    return (
      <View style={styles.spacer}>
        <Text>{this.renderLabel()}</Text>
        <View>
          <SectionedMultiSelect
            single={this.props.single ? this.props.single : false}
            expandDropDowns={true}
            items={items ? [items] : []}
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
              chipContainer: {
                backgroundColor: 'white',
              },
              chipText: {
                color: 'gray',
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
        <BError error={this.props.error} />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
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
