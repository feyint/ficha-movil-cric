import React, {Component, useState} from 'react';
import {BButton, BTextInput, BSearchBar, BSearchBarV2} from '../../../../core/components';
import {Alert, StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import PersonManageList from '../forms/PersonManageList';
import {connect} from 'react-redux';
import {
  clearFNBINFSAL,
  clearFNCPERSON,
  setFNCPERSON,
} from '../../../../state/person/actions';
import {FNBNUCVIV} from '../../../../state/house/types';
import {HousingService} from '../../../../services';
import {FNCPERSON} from '../../../../state/person/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListItem} from 'react-native-elements';
import { onChange, Value } from 'react-native-reanimated';
//import {Searchbar} from 'react-native-paper';
//let helperArray = require('./userList.json');
interface Props {
  navigation: NavigationProp<any>;
  clearFNCPERSON: any;
  setFNCPERSON: any;
  clearFNBINFSAL: any;
  FNBNUCVIV: FNBNUCVIV;
}
interface State {
  persons: FNCPERSON[];
  filteredPersons: FNCPERSON[];
  //filteredPersonsID: FNCPERSON[];
  word: string;
}
/* const Helper2 =()=>{
  const [searchQuery, setSearchQuery] = React.useState('');
} */
class PersonManageScreen extends Component<Props, State> {
  private _unsubscribe: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      persons: [],
      filteredPersons: [],
      word: '',
    };
  }
  componentDidMount() {
    try {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.fetchPersons();
      });
    } catch (error) {
      console.error('ocurrio un error');
    }
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async fetchPersons() {
    try {
      let syncCatalogService = new HousingService();
      let result = await syncCatalogService.getFNBNUCVIVPersons(
        this.props.FNBNUCVIV.ID,
      );
      if (result) {
        this.setState({
          persons: result,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  //const [searchQuery, setSearchQuery] = React.useState('');
  _goBack() {
    this.props.navigation.goBack();
  }
  searchUser(textToSearch: any) {
    this.setState({
      filteredPersons: this.state.persons.filter(
        (i) =>
          i.PRIMER_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.IDENTIFICACION.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.PRIMER_APELLIDO.toLowerCase().includes(
            textToSearch.toLowerCase(),
          ) ||
          i.SEGUNDO_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.SEGUNDO_APELLIDO.toLowerCase().includes(textToSearch.toLowerCase()),
      ),
    });
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Identificacion nucleo familiar" />
        </Appbar.Header>
        <Text>
          Personas relacionadas con el nucleo familiar{' '}
          {this.props.FNBNUCVIV.CODIGO}
        </Text>
        <BButton
          color="primary"
          value="Nueva persona"
          mode="contained"
          onPress={() => this.createNewPerson()}
        />
        <KeyboardAwareScrollView>
          {/* <BTextInput
            onBlur={true}
            label={'Buscar'}
            onChange={(text: any) => {
              console.log(text);
              this.searchUser(text);
              //this.searchIdentification(text);
            }}
          /> */}
          {/* <BSearchBar /> */}
          <BSearchBarV2
            placeholder="Ingrese identificacion o nombre de persona a buscar"
            onChange={(text: any) => {
              console.log(text);
              this.searchUser(text);
              //this.searchIdentification(text);
            }}
          />
          <View style={styles.container}>
            {this.state.filteredPersons && this.state.filteredPersons.length > 0
              ? this.state.filteredPersons.map((person: FNCPERSON, i: any) => (
                  <ListItem
                    onPress={() => {
                      this.goViewPersonScreen(person);
                    }}
                    key={i}
                    bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{`${person.PRIMER_NOMBRE}  ${person.SEGUNDO_NOMBRE}  ${person.PRIMER_APELLIDO}  ${person.SEGUNDO_APELLIDO}`}</ListItem.Title>
                      <ListItem.Subtitle>
                        {person.IDENTIFICACION}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))
              : this.state.persons.map((person: FNCPERSON, i: any) => (
                  <ListItem
                    onPress={() => {
                      this.goViewPersonScreen(person);
                    }}
                    key={i}
                    bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>
                        {`${person.PRIMER_NOMBRE}  ${person.SEGUNDO_NOMBRE}  ${person.PRIMER_APELLIDO}  ${person.SEGUNDO_APELLIDO}`}
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        {person.IDENTIFICACION}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))}
          </View>
          <View style={styles.spacer} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
  goViewPersonScreen(data: FNCPERSON) {
    this.props.setFNCPERSON(data);
    this.props.navigation.navigate('ViewPersonScreen');
  }
  createNewPerson() {
    this.props.clearFNCPERSON();
    this.props.clearFNBINFSAL();
    this.props.navigation.navigate('ViewPersonScreen');
  }
}

const mapDispatchToProps = {
  clearFNCPERSON,
  setFNCPERSON,
  clearFNBINFSAL,
};
const mapStateToProps = (housing: any) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
  };
};

const styles = StyleSheet.create({
  spacer: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonManageScreen);
