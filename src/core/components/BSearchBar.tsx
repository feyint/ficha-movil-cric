import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import {FNBNUCVIV} from '../../state/house/types';
import {FNCPERSON} from '../../state/person/types';
interface State {
  persons: FNCPERSON[];
  filteredPersons: FNCPERSON[];
  //filteredPersonsID: FNCPERSON[];
  word: string;
}
interface Props {
  navigation: NavigationProp<any>;
  clearFNCPERSON: any;
  setFNCPERSON: any;
  clearFNBINFSAL: any;
  FNBNUCVIV: FNBNUCVIV;
}

export default function BSearchBar(this: any, props, state: any) {
  state = {
    persons: [],
    filteredPersons: [],
    word: '',
  };

  const searchUser = (textToSearch: string) => {
    this.setState({
      filteredPersons: this.state.persons.filter(
        (i: {
          PRIMER_NOMBRE: string;
          IDENTIFICACION: string;
          PRIMER_APELLIDO: string;
          SEGUNDO_NOMBRE: string;
          SEGUNDO_APELLIDO: string;
        }) =>
          i.PRIMER_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.IDENTIFICACION.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.PRIMER_APELLIDO.toLowerCase().includes(
            textToSearch.toLowerCase(),
          ) ||
          i.SEGUNDO_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.SEGUNDO_APELLIDO.toLowerCase().includes(textToSearch.toLowerCase()),
      ),
    });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const {placeholder, value} = props;

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
    searchUser(searchQuery);
  };
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
}
